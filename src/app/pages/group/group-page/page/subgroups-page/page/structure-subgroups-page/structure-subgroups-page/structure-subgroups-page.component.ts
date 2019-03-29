import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {GroupService} from '../../../../../service/group.service';
import {Group} from '../../../../../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {DynamicFlatNode} from '../../../../../../../../module/group/subgroups-trees/model/dynamic-flat-node';
import {ContextMenuItem} from '../../../../../../../../module/group/subgroups-trees/model/context-menu-item';
import {SubgroupGroupTreeDataSource} from '../../../../../../../../module/group/subgroups-trees/model/subgroup-group-tree-data-source';
import {SubgroupTemplateGroup} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {AppHelper} from '../../../../../../../../utils/app-helper';
import {SubgroupsTreesComponent} from '../../../../../../../../module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';
import {PageContainer} from '../../../../../../../../data/remote/bean/page-container';
import {ObjectWrapper} from '../../../../../../../../data/local/object-wrapper';
import {SubgroupGroup} from '../../../../../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {GroupPersonQuery} from '../../../../../../../../data/remote/rest-api/query/group-person-query';
import {NgxGridComponent} from '../../../../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {PropertyConstant} from '../../../../../../../../data/local/property-constant';
import {PersonModalConfig, TemplateModalService} from '../../../../../../../../service/template-modal.service';
import {Person} from '../../../../../../../../data/remote/model/person';
import {PageQuery} from '../../../../../../../../data/remote/rest-api/page-query';
import {SubgroupPersonQuery} from '../../../../../../../../data/remote/rest-api/query/subgroup-person-query';
import {SubgroupPersonTypeEnum} from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-person-type-enum';
import {SubgroupModalService} from '../../../service/subgroup-modal.service';
import {SelectionType} from '../../../../../../../../components/ngx-grid/bean/selection-type';
import {SplitButtonItem} from '../../../../../../../../components/ngx-split-button/bean/split-button-item';
import {PersonTransitionType} from '../../../../../../../../data/remote/model/group/transition/person-transition-type';
import {NgxModalService} from '../../../../../../../../components/ngx-modal/service/ngx-modal.service';
import {SubgroupTemplatePersonType} from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-template-person-type';
import {SubgroupPerson} from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-person';
import {SubgroupTemplateGroupVersion} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group-version';

@Component({
  selector: 'app-structure-subgroups-page',
  templateUrl: './structure-subgroups-page.component.html',
  styleUrls: ['./structure-subgroups-page.component.scss']
})
export class StructureSubgroupsPageComponent {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly selectionTypeClass = SelectionType;

  @ViewChild(SubgroupsTreesComponent)
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public treeDataSource: SubgroupGroupTreeDataSource;
  public selectedNode: DynamicFlatNode;
  public group: Group;
  public canEdit = true;
  public selectedItems: ObjectWrapper[] = [];
  public splitButtonItems: SplitButtonItem[] = [];
  public subgroupTemplateGroup: SubgroupTemplateGroup;
  public leadPersonType: SubgroupTemplatePersonType;
  public secondaryPersonType: SubgroupTemplatePersonType;
  public leadSubgroupPerson: SubgroupPerson;
  public secondarySubgroupPerson: SubgroupPerson;

  private _notDestroyed = true;
  private _canEdit = false;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _subgroupModalService: SubgroupModalService,
              private _ngxModalService: NgxModalService,
              private _groupService: GroupService) {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        this.group = val;
        this.treeDataSource = new SubgroupGroupTreeDataSource(val, this._participantRestApiService);
        this._canEdit = await this._groupService.canShowTemplatesSubgroups();
      });
  }

  public onGetNodeContextMenuItem = async (node: DynamicFlatNode): Promise<ContextMenuItem[]> => {
    if (!this.canEdit) {
      return [];
    }

    if (node.data instanceof SubgroupTemplateGroup) {
      return [{
        translation: 'remove', action: async item => {
          await this._appHelper.tryAction('removed', 'error', async () => {
            await this._participantRestApiService.removeSubgroupTemplateGroupByTemplateOwner({
              subgroupTemplateId: node.data.subgroupTemplateGroupVersion.template.id,
              subgroupTemplateGroupId: node.data.id
            });
            this.treeDataSource = new SubgroupGroupTreeDataSource(this.group, this._participantRestApiService);
          });
        }
      }];
    } else if (node.data instanceof SubgroupTemplateGroupVersion) {
      const menuItems: ContextMenuItem[] = [];

      if (!node.data.applied) {
        menuItems.push({
          translation: 'apply', action: async item => {
            await this._appHelper.tryAction('templateHasApproved', 'error', async () => {
              await this._participantRestApiService.approveSubgroupTemplateGroup({subgroupTemplateGroupId: node.data.subgroupTemplateGroupId});
              this.treeDataSource = new SubgroupGroupTreeDataSource(this.group, this._participantRestApiService);
            });
          }
        });
      }
      return menuItems;
    } else if (node.data instanceof SubgroupGroup) {
      return [{
        translation: 'edit', action: async item => {
          await this._subgroupModalService.showEditSubgroupGroup(node.data);
          await this.resetItems();
        }
      }];
    } else {
      return [];
    }
  };

  public async onSelectedNodeChange(node: DynamicFlatNode) {
    await this.resetItems();
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<ObjectWrapper>> => {
    if (this.selectedNode && this.selectedNode.level > 0) {
      const subgroupPersonQuery = query as SubgroupPersonQuery;
      subgroupPersonQuery.subgroupPersonTypeEnum = SubgroupPersonTypeEnum.PARTICIPANT;
      const nodeData = this.selectedNode.data as SubgroupGroup;
      const pageContainer = await this._participantRestApiService.getSubgroupPersons({}, subgroupPersonQuery, {subgroupGroupId: nodeData.id});

      return await this._appHelper.pageContainerConverter(pageContainer, obj => {
        return new ObjectWrapper(obj, obj.person);
      });
    } else {
      const groupPersonQuery = query as GroupPersonQuery;
      groupPersonQuery.id = this.group.id;
      const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(groupPersonQuery);

      return await this._appHelper.pageContainerConverter(pageContainer, obj => {
        return new ObjectWrapper(obj, obj.person);
      });
    }
  };

  public onEdit = async (obj: ObjectWrapper) => {
    await this.showEditPersonModal(obj.data, this.getPersonModalConfig());
  };

  public onAdd = async (obj: ObjectWrapper) => {
    await this.showEditPersonModal(new Person(), {group: this.group});
  };

  public onSelectedItemsChange(selectedItems: ObjectWrapper[]) {
    this.selectedItems = selectedItems;
    if (this.selectedItems.length) {
      const config = this.getPersonModalConfig();
      const persons: Person[] = selectedItems.map(x => x.data);
      this.splitButtonItems = [
        {
          nameKey: 'transfer',
          callback: async () => {
            await this._templateModalService.showGroupPersonTransitionModal(PersonTransitionType.TRANSFER, config.group, persons, config);
          }
        },
        {
          nameKey: 'deduct',
          callback: async () => {
            await this._templateModalService.showGroupPersonTransitionModal(PersonTransitionType.EXPEL, config.group, persons);
          }
        },
        {
          nameKey: 'deductFromSubgroup',
          callback: async () => {
            await this._templateModalService.showGroupPersonTransitionModal(PersonTransitionType.EXPEL_FROM_SUBGROUP, config.group, persons, config);
          }
        }
      ];
    } else {
      this.splitButtonItems = [];
    }
  }

  private async showEditPersonModal(person: Person, personModalConfig: PersonModalConfig) {
    await this._templateModalService.showEditPersonModal(person, personModalConfig, {componentFactoryResolver: this._componentFactoryResolver});
    // TODO: Update only edited item
    await this.resetItems();
  }

  private async resetItems() {
    const config = this.getPersonModalConfig();
    this.subgroupTemplateGroup = config.subgroupTemplateGroup;

    if (this.selectedNode) {
      const subgroupTemplatePersonTypes = await this._participantRestApiService.getSubgroupTemplatePersonTypes({subgroupTemplateId: this.subgroupTemplateGroup.subgroupTemplateGroupVersion.template.id});
      this.leadPersonType = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.LEAD);
      this.secondaryPersonType = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.SECONDARY);
    }

    this.leadSubgroupPerson = null;
    this.secondarySubgroupPerson = null;
    const subgroupGroup = config.subgroupGroup;
    if (subgroupGroup) {
      const leadSubgroupPersonPageContainer = await this.getSubgroupPersons({subgroupPersonTypeEnum: SubgroupPersonTypeEnum.LEAD, count: 1, unassigned: false}, subgroupGroup);
      if (leadSubgroupPersonPageContainer.list) {
        this.leadSubgroupPerson = leadSubgroupPersonPageContainer.list[0];
      }

      const secondarySubgroupPersonPageContainer = await this.getSubgroupPersons({subgroupPersonTypeEnum: SubgroupPersonTypeEnum.SECONDARY, count: 1, unassigned: false}, subgroupGroup);
      if (secondarySubgroupPersonPageContainer.list) {
        this.secondarySubgroupPerson = secondarySubgroupPersonPageContainer.list[0];
      }
    }
    this.onSelectedItemsChange([]);
    if (this.ngxGridComponent) {
      await this.ngxGridComponent.reset();
    }
  }

  private getPersonModalConfig(): PersonModalConfig {
    // TODO: Using instanceof
    if (!this.selectedNode) {
      return {group: this.group};
    }

    let subgroupGroup: SubgroupGroup = this.selectedNode.data;
    let subgroupTemplateGroup: SubgroupTemplateGroup = this.selectedNode.data.subgroupTemplateGroup;
    if (!subgroupTemplateGroup) {
      subgroupGroup = null;
      subgroupTemplateGroup = this.selectedNode.data;
    }
    return {group: this.group, subgroupGroup, subgroupTemplateGroup};
  }

  private async getSubgroupPersons(query: SubgroupPersonQuery, subgroupGroup: SubgroupGroup): Promise<PageContainer<SubgroupPerson>> {
    return await this._participantRestApiService.getSubgroupPersons({}, query, {subgroupGroupId: subgroupGroup.id});
  }

}
