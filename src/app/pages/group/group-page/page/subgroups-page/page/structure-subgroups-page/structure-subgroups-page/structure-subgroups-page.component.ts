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

@Component({
  selector: 'app-structure-subgroups-page',
  templateUrl: './structure-subgroups-page.component.html',
  styleUrls: ['./structure-subgroups-page.component.scss']
})
export class StructureSubgroupsPageComponent {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(SubgroupsTreesComponent)
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public treeDataSource: SubgroupGroupTreeDataSource;
  public selectedNode: DynamicFlatNode;
  public group: Group;
  public canEdit = true;

  private _notDestroyed = true;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _subgroupModalService: SubgroupModalService,
              private _groupService: GroupService) {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(val => {
        this.group = val;
        this.treeDataSource = new SubgroupGroupTreeDataSource(val, this._participantRestApiService);
      });
  }

  public onGetNodeContextMenuItem = async (node: DynamicFlatNode): Promise<ContextMenuItem[]> => {
    if (!node.level) {
      const nodeData = node.data as SubgroupTemplateGroup;

      return [{
        translation: 'remove', action: async item => {
          await this._appHelper.tryAction('removed', 'error', async () => {
            await this._participantRestApiService.removeSubgroupTemplateGroup({subgroupTemplateGroupId: nodeData.id});
            // TODO: Remove item from UI
          });
        }
      }];
    } else {
      const nodeData = node.data as SubgroupGroup;
      return [{
        translation: 'edit', action: async item => {
          await this._subgroupModalService.showEditSubgroupGroup(nodeData);
        }
      }];
    }
  };

  public async onSelectedNodeChange(node: DynamicFlatNode) {
    await this.ngxGridComponent.reset();
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
    // TODO: Using instanceof
    let subgroupGroup: SubgroupGroup = this.selectedNode.data;
    let subgroupTemplateGroup = this.selectedNode.data.subgroupTemplateGroup;
    if (!subgroupTemplateGroup) {
      subgroupGroup = null;
      subgroupTemplateGroup = this.selectedNode.data;
    }
    await this.showEditPersonModal(obj.data, {group: this.group, subgroupGroup, subgroupTemplateGroup});
  };

  public onAdd = async (obj: ObjectWrapper) => {
    await this.showEditPersonModal(new Person(), {group: this.group});
  };

  private async showEditPersonModal(person: Person, personModalConfig: PersonModalConfig) {
    await this._templateModalService.showEditPersonModal(person, personModalConfig, {componentFactoryResolver: this._componentFactoryResolver});
  }

}
