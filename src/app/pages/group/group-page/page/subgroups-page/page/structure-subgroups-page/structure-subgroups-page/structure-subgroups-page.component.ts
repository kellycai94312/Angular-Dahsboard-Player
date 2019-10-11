import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import { flatMap, map, takeWhile } from 'rxjs/operators';
import { SelectionType } from '../../../../../../../../components/ngx-grid/bean/selection-type';
import { NgxGridComponent } from '../../../../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import { NgxModalService } from '../../../../../../../../components/ngx-modal/service/ngx-modal.service';
import { SplitButtonItem } from '../../../../../../../../components/ngx-split-button/bean/split-button-item';
import { ObjectWrapper } from '../../../../../../../../data/local/object-wrapper';
import { PropertyConstant } from '../../../../../../../../data/local/property-constant';
import { PageContainer } from '../../../../../../../../data/remote/bean/page-container';
import { EventType } from '../../../../../../../../data/remote/model/event/base/event-type';
import { Group } from '../../../../../../../../data/remote/model/group/base/group';
import { SubgroupPerson } from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-person';
import { SubgroupPersonInterface } from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-person-interface';
import { SubgroupPersonTypeEnum } from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-person-type-enum';
import { SubgroupTemplatePersonType } from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-template-person-type';
import { SubgroupGroup } from '../../../../../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import { SubgroupTemplate } from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import { SubgroupTemplateGroupVersion } from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group-version';
import { PersonTransitionType } from '../../../../../../../../data/remote/model/group/transition/person-transition-type';
import { Person } from '../../../../../../../../data/remote/model/person';
import { GroupApiService } from '../../../../../../../../data/remote/rest-api/api/group/group-api.service';
import { SubgroupGroupApiService } from '../../../../../../../../data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';
import { ParticipantRestApiService } from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import { SubgroupPersonQuery } from '../../../../../../../../data/remote/rest-api/query/subgroup-person-query';
import { EventData } from '../../../../../../../../module/event/edit-base-event/model/event-data';
import { SubgroupReportComponent } from '../../../../../../../../module/group/subgroup-report/subgroup-report/subgroup-report.component';
import { ContextMenuItem } from '../../../../../../../../module/group/subgroups-trees/model/context-menu-item';
import { SubgroupsTreesComponent } from '../../../../../../../../module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';
import { FlatNode } from '../../../../../../../../module/ngx/ngx-tree/model/flat-node';
import { PersonModalConfig, TemplateModalService } from '../../../../../../../../service/template-modal.service';
import { EventUtilService } from '../../../../../../../../services/event-util/event-util.service';
import { TranslateObjectService } from '../../../../../../../../shared/translate-object.service';
import { AppHelper } from '../../../../../../../../utils/app-helper';
import { GroupService } from '../../../../../service/group.service';
import { SubgroupModalService } from '../../../service/subgroup-modal.service';
import { RootSubgroupGroup } from '../model/root-subgroup-group';

@Component({
  selector: 'app-structure-subgroups-page',
  templateUrl: './structure-subgroups-page.component.html',
  styleUrls: ['./structure-subgroups-page.component.scss'],
  providers: [EventUtilService]
})
export class StructureSubgroupsPageComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly selectionTypeClass = SelectionType;

  @ViewChild(SubgroupsTreesComponent, {static: false})
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  @ViewChild(NgxGridComponent, {static: false})
  public ngxGridComponent: NgxGridComponent;

  public selectedNode: FlatNode;
  public group: Group;
  public canEdit: boolean;
  public canEditPerson: boolean;
  public selectedItems: ObjectWrapper[] = [];
  public splitButtonItems: SplitButtonItem[] = [];
  public subgroupPersonInterface: SubgroupPersonInterface;
  public leadPersonType: SubgroupTemplatePersonType;
  public secondaryPersonType: SubgroupTemplatePersonType;
  public leadSubgroupPerson: SubgroupPerson;
  public secondarySubgroupPerson: SubgroupPerson;
  private _notDestroyed = true;
  private _rootSubgroupName: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _groupApiService: GroupApiService,
              private _subgroupGroupApiService: SubgroupGroupApiService,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _subgroupModalService: SubgroupModalService,
              private _eventUtilService: EventUtilService,
              private _translateObjectService: TranslateObjectService,
              private _ngxModalService: NgxModalService,
              private _groupService: GroupService) {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        this.group = val;
        if (val) {
          this.canEditPerson = val.dataOperator;
        }
        this.canEdit = await this._groupService.canShowTemplatesSubgroups();
      });
  }

  async ngOnInit(): Promise<void> {
    this._rootSubgroupName = await this._translateObjectService.getTranslation('rootSubgroup');

    const node = this.subgroupsTreesComponent.dataSource.data[0];
    await this.onSelectedNodeChange(node);
    this.subgroupsTreesComponent.dataSource.treeControl.expand(node);
  }

  public onGetNodeContextMenuItem = async (node: FlatNode): Promise<ContextMenuItem[]> => {
    if (!this.canEdit) {
      return [];
    }

    const createEventContextMenuItem: ContextMenuItem = {
      translation: 'createEvent', action: async item => {
        const eventData = new EventData();
        eventData.group = this.group;
        // eventData.participants = (await this.fetchItems({count: PropertyConstant.pageSizeMax})).list.map((x: ObjectWrapper) => x.data);
        eventData.heads = [];
        if (this.leadSubgroupPerson) {
          eventData.heads.push(this.leadSubgroupPerson.person);
        }
        if (this.secondarySubgroupPerson) {
          eventData.heads.push(this.secondarySubgroupPerson.person);
        }
        await this._templateModalService.showEditBaseEvent(this._eventUtilService.getDefaultEvent(new Date(), EventType.EVENT), eventData);
      }
    };

    const getReportContextMenuItem = (subgroupTemplate: SubgroupTemplate): ContextMenuItem => {
      return {
        translation: 'report', action: async item => {
          const modal = this._ngxModalService.open();
          modal.componentInstance.titleKey = 'report';

          await modal.componentInstance.initializeBody(SubgroupReportComponent, async component => {
            component.group = this.group;
            component.subgroupTemplate = subgroupTemplate;
          });
        }
      };
    };

    if (node.data instanceof RootSubgroupGroup) {
      const contextMenuItems: ContextMenuItem[] = [
        {
          translation: 'edit', action: async item => {
            await this._subgroupModalService.showEditSubgroupGroup(node.data.defaultSubgroupGroup);
            await this.resetItems();
          }
        },
        createEventContextMenuItem,
        getReportContextMenuItem(node.data.subgroupTemplateGroupVersion.template)
      ];

      if (!node.data.subgroupTemplateGroupVersion.applied) {
        contextMenuItems.push({
          translation: 'apply', action: async item => {
            await this._appHelper.tryAction('templateHasApproved', 'error', async () => {
              const subgroupTemplateGroup = await this._participantRestApiService.approveSubgroupTemplateGroup({subgroupTemplateGroupId: node.data.subgroupTemplateGroupVersion.subgroupTemplateGroupId});
              const subgroupTemplateGroupVersionNode = this.subgroupsTreesComponent.dataSource.getNodeByData(subgroupTemplateGroup.subgroupTemplateGroupVersion, (source, target) => source instanceof RootSubgroupGroup && source.subgroupTemplateGroupVersion.id == target.id);
              this.subgroupsTreesComponent.dataSource.refreshNodesOnLevel(subgroupTemplateGroupVersionNode);
            });
          }
        });
      }
      contextMenuItems.push({
        translation: 'remove', action: async item => {
          await this._appHelper.tryAction('removed', 'error', async () => {
            const subgroupTemplateGroupVersion = await this._participantRestApiService.removeSubgroupTemplateGroupByTemplateOwner({
              subgroupTemplateId: node.data.subgroupTemplateGroup.subgroupTemplateGroupVersion.template.id,
              subgroupTemplateGroupId: node.data.subgroupTemplateGroup.id
            });

            this.subgroupsTreesComponent.dataSource.removeNodeByData(subgroupTemplateGroupVersion, (source, target) => source instanceof RootSubgroupGroup && source.subgroupTemplateGroup.id == target.id);
          });
        }
      });
      return contextMenuItems;
    } else if (node.data instanceof SubgroupGroup) {
      return [{
        translation: 'edit', action: async item => {
          await this._subgroupModalService.showEditSubgroupGroup(node.data);
          await this.resetItems();
        }
      },
        createEventContextMenuItem,
        getReportContextMenuItem(node.data.subgroupTemplateGroupVersion.template)
      ];
    }
    return [];
  };

  public async onSelectedNodeChange(node: FlatNode) {
    this.selectedNode = node;
    await this.resetItems();
  }

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
          nameKey: 'groupTransitionTypeEnum.ENROLL_IN_SUBGROUP',
          callback: async () => {
            await this._templateModalService.showGroupPersonTransitionModal(PersonTransitionType.ENROLL_IN_SUBGROUP, config.group, persons, config);
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

  public getChildren = (node: FlatNode | any): Observable<FlatNode[]> => {
    if (node) {
      const nextLevel = (node.level || 0) + 1;
      if (node.data instanceof Group) {
        return this._groupApiService.getSubgroupTemplateGroups(this.group, {count: PropertyConstant.pageSizeMax})
          .pipe(
            map(val => val.list),
            flatMap(async subgroupTemplateGroups => {
              const nodes: FlatNode[] = [];
              for (const subgroupTemplateGroup of subgroupTemplateGroups) {
                const subgroupTemplateGroupVersions = await this._participantRestApiService.getSubgroupTemplateGroupVersions({subgroupTemplateGroupId: subgroupTemplateGroup.id});
                for (const subgroupTemplateGroupVersion of subgroupTemplateGroupVersions) {
                  const subgroupGroups = await this._participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {}, {subgroupTemplateGroupVersionId: subgroupTemplateGroupVersion.id});
                  for (const subgroupGroup of subgroupGroups) {
                    const rootSubgroup = new RootSubgroupGroup(subgroupTemplateGroup, subgroupTemplateGroupVersion, subgroupGroup);
                    nodes.push(new FlatNode(rootSubgroup, nextLevel, true));
                  }
                }
              }
              return nodes;
            })
          );
      } else if (node.data instanceof RootSubgroupGroup) {
        return from(this._participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {subgroupGroupId: node.data.defaultSubgroupGroup.id}, {subgroupTemplateGroupVersionId: node.data.defaultSubgroupGroup.subgroupTemplateGroupVersion.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      } else if (node.data instanceof SubgroupGroup) {
        return from(this._participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {subgroupGroupId: node.data.id}, {subgroupTemplateGroupVersionId: node.data.subgroupTemplateGroupVersion.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      }
    } else {
      return of([new FlatNode(this.group, 0, true)]);
    }
  };

  public getNodeName = (node: FlatNode): string => {
    if (node.data instanceof Group) {
      return node.data.name;
    } else if (node.data instanceof RootSubgroupGroup) {
      let name = node.data.subgroupTemplateGroupVersion.template.name;
      name += '\r\n';
      if (node.data.subgroupTemplateGroupVersion.applied) {
        name += `(Подтвержденная версия ${node.data.subgroupTemplateGroupVersion.templateVersion.versionNumber})`;
      } else {
        name += `(Неподтвержденная версия ${node.data.subgroupTemplateGroupVersion.templateVersion.versionNumber})`;
      }
      return name;
    } else if (node.data instanceof SubgroupGroup) {
      return node.data.subgroupVersion.name;
    }
  };

  private async resetItems() {
    delete this.leadPersonType;
    delete this.secondaryPersonType;
    delete this.leadSubgroupPerson;
    delete this.secondarySubgroupPerson;

    if (this.selectedNode) {
      this.subgroupPersonInterface = this.selectedNode.data;

      const config = this.getPersonModalConfig();
      if (config.subgroupGroup) {
        const subgroupTemplatePersonTypes = await this._participantRestApiService.getSubgroupTemplatePersonTypes({subgroupTemplateId: config.subgroupGroup.subgroupTemplateGroupVersion.template.id});
        this.leadPersonType = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.LEAD);
        this.secondaryPersonType = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.SECONDARY);

        const leadSubgroupPersonPageContainer = await this.getSubgroupPersons({
          subgroupPersonTypeEnum: SubgroupPersonTypeEnum.LEAD,
          count: 1,
          unassigned: false
        }, config.subgroupGroup);
        if (leadSubgroupPersonPageContainer.list) {
          this.leadSubgroupPerson = leadSubgroupPersonPageContainer.list[0];
        }

        const secondarySubgroupPersonPageContainer = await this.getSubgroupPersons({
          subgroupPersonTypeEnum: SubgroupPersonTypeEnum.SECONDARY,
          count: 1,
          unassigned: false
        }, config.subgroupGroup);
        if (secondarySubgroupPersonPageContainer.list) {
          this.secondarySubgroupPerson = secondarySubgroupPersonPageContainer.list[0];
        }
      }
    } else {
      delete this.subgroupPersonInterface;
    }

    this.onSelectedItemsChange([]);
    if (this.ngxGridComponent) {
      await this.ngxGridComponent.reset();
    }
  }

  public getPersonModalConfig(): PersonModalConfig {
    if (!this.selectedNode) {
      return {group: this.group};
    }

    let subgroupGroup: SubgroupGroup;
    let subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

    if (this.selectedNode.data instanceof RootSubgroupGroup) {
      subgroupGroup = this.selectedNode.data.defaultSubgroupGroup;
      subgroupTemplateGroupVersion = this.selectedNode.data.subgroupTemplateGroupVersion;
    } else if (this.selectedNode.data instanceof SubgroupGroup) {
      subgroupGroup = this.selectedNode.data;
      subgroupTemplateGroupVersion = this.selectedNode.data.subgroupTemplateGroupVersion;
    }
    return {
      group: this.group,
      subgroupGroup,
      subgroupTemplateGroupVersion,
      subgroupPerson: this.selectedItems.map(x => x.original)
    };
  }

  private async getSubgroupPersons(query: SubgroupPersonQuery, subgroupGroup: SubgroupGroup): Promise<PageContainer<SubgroupPerson>> {
    return await this._subgroupGroupApiService.getSubgroupPersons(subgroupGroup, query).toPromise();
  }

}
