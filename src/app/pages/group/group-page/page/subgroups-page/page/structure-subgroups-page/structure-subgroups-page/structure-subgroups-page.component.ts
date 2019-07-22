import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {flatMap, map, takeWhile} from 'rxjs/operators';
import {GroupService} from '../../../../../service/group.service';
import {Group} from '../../../../../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {ContextMenuItem} from '../../../../../../../../module/group/subgroups-trees/model/context-menu-item';
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
import {SubgroupPersonInterface} from '../../../../../../../../data/remote/model/group/subgroup/person/subgroup-person-interface';
import {FlatNode} from '../../../../../../../../module/ngx/ngx-tree/model/flat-node';
import {from, Observable, of} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {TranslateObjectService} from '../../../../../../../../shared/translate-object.service';
import {RootSubgroupGroup} from '../model/root-subgroup-group';
import {EventUtilService} from '../../../../../../../../services/event-util/event-util.service';
import {EventType} from '../../../../../../../../data/remote/model/event/base/event-type';
import {EventData} from '../../../../../../../../module/event/edit-base-event/model/event-data';

@Component({
  selector: 'app-structure-subgroups-page',
  templateUrl: './structure-subgroups-page.component.html',
  styleUrls: ['./structure-subgroups-page.component.scss'],
  providers: [EventUtilService]
})
export class StructureSubgroupsPageComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly selectionTypeClass = SelectionType;

  @ViewChild(SubgroupsTreesComponent)
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public selectedNode: FlatNode;
  public group: Group;
  public canEdit = true;
  public selectedItems: ObjectWrapper[] = [];
  public splitButtonItems: SplitButtonItem[] = [];
  public subgroupPersonInterface: SubgroupPersonInterface;
  public leadPersonType: SubgroupTemplatePersonType;
  public secondaryPersonType: SubgroupTemplatePersonType;
  public leadSubgroupPerson: SubgroupPerson;
  public secondarySubgroupPerson: SubgroupPerson;
  public visiblePersons: boolean;

  private _notDestroyed = true;
  private _canEdit = false;
  private _rootSubgroupName: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
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
        this._canEdit = await this._groupService.canShowTemplatesSubgroups();
      });
  }

  async ngOnInit(): Promise<void> {
    this._rootSubgroupName = await this._translateObjectService.getTranslation('rootSubgroup');

    this.getChildren(null).subscribe(async (value) => {
      await this.onSelectedNodeChange(value[0]);
    });
  }

  public onGetNodeContextMenuItem = async (node: FlatNode): Promise<ContextMenuItem[]> => {
    if (!this.canEdit) {
      return [];
    }

    const createEventContextMenuItem: ContextMenuItem = {
      translation: 'createEvent', action: async item => {
        const eventData = new EventData();
        eventData.group = this.group;
        eventData.participants = (await this.fetchItems({count: PropertyConstant.pageSizeMax})).list.map((x: ObjectWrapper) => x.data);
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

    if (node.data instanceof RootSubgroupGroup) {
      const contextMenuItems: ContextMenuItem[] = [
        {
          translation: 'edit', action: async item => {
            await this._subgroupModalService.showEditSubgroupGroup(node.data.defaultSubgroupGroup);
            await this.resetItems();
          }
        }, createEventContextMenuItem
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
      }, createEventContextMenuItem];
    }
    return [];
  };

  public async onSelectedNodeChange(node: FlatNode) {
    this.selectedNode = node;
    await this.resetItems();
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<ObjectWrapper>> => {
    if (this.selectedNode) {
      const config = this.getPersonModalConfig();
      if (config.subgroupGroup) {
        this.visiblePersons = true;

        const subgroupPersonQuery = query as SubgroupPersonQuery;
        subgroupPersonQuery.subgroupPersonTypeEnum = SubgroupPersonTypeEnum.PARTICIPANT;
        const pageContainer = await this._participantRestApiService.getSubgroupPersons({}, subgroupPersonQuery, {subgroupGroupId: config.subgroupGroup.id});

        return await this._appHelper.pageContainerConverter(pageContainer, obj => {
          return new ObjectWrapper(obj, obj.person);
        });
      } else if (this.selectedNode.data instanceof Group) {
        this.visiblePersons = true;

        const groupPersonQuery = query as GroupPersonQuery;
        groupPersonQuery.id = this.group.id;
        const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(groupPersonQuery);

        return await this._appHelper.pageContainerConverter(pageContainer, obj => {
          return new ObjectWrapper(obj, obj.person);
        });
      }
    }
    this.visiblePersons = false;
    return;
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

  public getChildren = (node: FlatNode | any): Observable<FlatNode[]> => {
    if (node) {
      const nextLevel = (node.level || 0) + 1;
      if (node.data instanceof Group) {
        return from(this._participantRestApiService.getSubgroupTemplateGroupsByGroup({}, {count: PropertyConstant.pageSizeMax}, {groupId: this.group.id}))
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

  private async showEditPersonModal(person: Person, personModalConfig: PersonModalConfig) {
    // await this._templateModalService.showEditPersonModal(person, personModalConfig, {componentFactoryResolver: this._componentFactoryResolver});
    await this._templateModalService.openEditPersonWindow(person, this.group, {componentFactoryResolver: this._componentFactoryResolver});
    // TODO: Update only edited item
    await this.resetItems();
  }

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

        const leadSubgroupPersonPageContainer = await this.getSubgroupPersons({subgroupPersonTypeEnum: SubgroupPersonTypeEnum.LEAD, count: 1, unassigned: false}, config.subgroupGroup);
        if (leadSubgroupPersonPageContainer.list) {
          this.leadSubgroupPerson = leadSubgroupPersonPageContainer.list[0];
        }

        const secondarySubgroupPersonPageContainer = await this.getSubgroupPersons({subgroupPersonTypeEnum: SubgroupPersonTypeEnum.SECONDARY, count: 1, unassigned: false}, config.subgroupGroup);
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

  private getPersonModalConfig(): PersonModalConfig {
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
    return {group: this.group, subgroupGroup, subgroupTemplateGroupVersion};
  }

  private async getSubgroupPersons(query: SubgroupPersonQuery, subgroupGroup: SubgroupGroup): Promise<PageContainer<SubgroupPerson>> {
    return await this._participantRestApiService.getSubgroupPersons({}, query, {subgroupGroupId: subgroupGroup.id});
  }

}
