import {Component, OnInit, ViewChild} from '@angular/core';
import {ContextMenuItem} from '../../../../../../../../module/group/subgroups-trees/model/context-menu-item';
import {SubgroupModalService} from '../../../service/subgroup-modal.service';
import {AppHelper} from '../../../../../../../../utils/app-helper';
import {GroupService} from '../../../../../service/group.service';
import {SubgroupTemplate} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {Subgroup} from '../../../../../../../../data/remote/model/group/subgroup/subgroup/subgroup';
import {ParticipantRestApiService} from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {distinctUntilChanged, flatMap, map, skipWhile, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../../../../../data/local/property-constant';
import {SubgroupsTreesComponent} from '../../../../../../../../module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';
import {SubgroupService} from '../../../service/subgroup.service';
import {Group} from '../../../../../../../../data/remote/model/group/base/group';
import {SubgroupTemplateGroup} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {from, Observable} from 'rxjs';
import {FlatNode} from '../../../../../../../../module/ngx/ngx-tree/model/flat-node';
import {TranslateObjectService} from '../../../../../../../../shared/translate-object.service';
import {RootSubgroup} from '../model/root-subgroup';
import {GroupApiService} from '../../../../../../../../data/remote/rest-api/api/group/group-api.service';

@Component({
  selector: 'app-templates-subgroups-page',
  templateUrl: './templates-subgroups-page.component.html',
  styleUrls: ['./templates-subgroups-page.component.scss']
})
export class TemplatesSubgroupsPageComponent implements OnInit {

  @ViewChild(SubgroupsTreesComponent)
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  public group: Group;
  private _notDestroyed = true;
  private _canEdit = false;
  private _rootSubgroupName: string;

  constructor(private _subgroupModalService: SubgroupModalService,
              private _appHelper: AppHelper,
              private _groupApiService: GroupApiService,
              private _groupService: GroupService,
              private _subgroupService: SubgroupService,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService) {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        this.group = val;
        this._canEdit = await this._groupService.canShowTemplatesSubgroups();
      });
    this._subgroupService.subgroupTemplateChanged()
      .pipe(
        takeWhile(() => this._notDestroyed),
        skipWhile(() => !this.subgroupsTreesComponent),
        distinctUntilChanged()
      )
      .subscribe((val: SubgroupTemplate) => {
        const dataSource = this.subgroupsTreesComponent.dataSource;
        const rootSubgroupCompare: <T extends RootSubgroup>(source: T, target: T) => boolean = (source, target) => {
          return source instanceof RootSubgroup && source.subgroupTemplate.id == target.subgroupTemplate.id;
        };

        const rootSubgroup = new RootSubgroup(val, void 0, void 0);
        if (val.deleted) {
          dataSource.removeNodeByData(rootSubgroup, rootSubgroupCompare);
        } else {
          const node = dataSource.getNodeByData(rootSubgroup, rootSubgroupCompare);
          if (node) {
            dataSource.addOrUpdateNodeIfCan(rootSubgroup, rootSubgroupCompare);
          } else {
            // TODO: Updating only edited item without refresh all items!
            dataSource.refreshNodesOnLevel(void 0);
          }
        }
      });
  }

  async ngOnInit(): Promise<void> {
    this._rootSubgroupName = await this._translateObjectService.getTranslation('rootSubgroup');
  }

  public getChildren = (node: FlatNode | any): Observable<FlatNode[]> => {
    if (node) {
      const nextLevel = (node.level || 0) + 1;
      if (node.data instanceof RootSubgroup) {
        return from(this._participantRestApiService.getSubgroupTemplateVersionChildrenSubgroups({}, {subgroupId: node.data.defaultSubgroup.id}, {subgroupTemplateVersionId: node.data.defaultSubgroup.templateVersion.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      } else if (node.data instanceof Subgroup) {
        return from(this._participantRestApiService.getSubgroupTemplateVersionChildrenSubgroups({}, {subgroupId: node.data.id}, {subgroupTemplateVersionId: node.data.templateVersion.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      }
    } else {
      return this._groupApiService.getSubgroupTemplates(this.group, {count: PropertyConstant.pageSizeMax})
        .pipe(
          map(val => val.list),
          flatMap(async subgroupTemplates => {
            const nodes: FlatNode[] = [];
            for (const subgroupTemplate of subgroupTemplates) {
              const subgroupTemplateVersions = await this._participantRestApiService.getSubgroupTemplateVersions({subgroupTemplateId: subgroupTemplate.id});
              for (const subgroupTemplateVersion of subgroupTemplateVersions) {
                const subgroups = await this._participantRestApiService.getSubgroupTemplateVersionChildrenSubgroups({}, {}, {subgroupTemplateVersionId: subgroupTemplateVersion.id});
                for (const subgroup of subgroups) {
                  const rootSubgroup = new RootSubgroup(subgroupTemplate, subgroupTemplateVersion, subgroup);
                  nodes.push(new FlatNode(rootSubgroup, 0, true));
                }
              }
            }
            return nodes;
          })
        );
    }
  };

  public getNodeName = (node: FlatNode): string => {
    if (node.data instanceof RootSubgroup) {
      let name = node.data.subgroupTemplate.name;
      name += '\r\n';
      if (node.data.subgroupTemplateVersion.approved) {
        name += `(Подтвержденная версия ${node.data.subgroupTemplateVersion.versionNumber})`;
      } else {
        name += `(Неподтвержденная версия ${node.data.subgroupTemplateVersion.versionNumber})`;
      }
      return name;
    } else if (node.data instanceof Subgroup) {
      return node.data.subgroupVersion.name;
    }
  };

  public onGetNodeContextMenuItem = async (node: FlatNode): Promise<ContextMenuItem[]> => {
    if (!this._canEdit) {
      return [];
    }

    if (node.data instanceof RootSubgroup) {
      const contextMenuItems: ContextMenuItem[] = [{
        translation: 'edit', action: async item => {
          const group = await this._appHelper.toPromise(this._groupService.group$);
          const dialogResult = await this._subgroupModalService.showEditSubgroupTemplate(group, node.data.subgroupTemplate);
          if (dialogResult.result) {
            this._subgroupService.updateSubgroupTemplate(dialogResult.data);
          }
        }
      }];

      if (!node.data.subgroupTemplateVersion.approved) {
        contextMenuItems.push(...[
          {
            translation: 'add', action: async item => {
              const subgroupTemplate = new SubgroupTemplate();
              subgroupTemplate.id = node.data.defaultSubgroup.templateVersion.subgroupTemplateId;
              await this.editSubgroup(subgroupTemplate);
            }
          },
          {
            translation: 'approve', action: async item => {
              const date = new Date();
              date.setHours(24 * 21);

              await this._appHelper.tryAction('templateHasApproved', 'error', async () => {
                await this._participantRestApiService.approveSubgroupTemplate(
                  {date: this._appHelper.dateByFormat(date, PropertyConstant.dateTimeServerFormat)},
                  {}, {subgroupTemplateId: node.data.subgroupTemplateVersion.subgroupTemplateId});
                this.subgroupsTreesComponent.dataSource.refreshNodesOnLevel(node);
              });
            }
          },
          {
            translation: 'reject', action: async item => {
              await this._appHelper.tryAction('templateHasRejected', 'error', async () => {
                await this._participantRestApiService.disapproveSubgroupTemplate({subgroupTemplateId: node.data.subgroupTemplateVersion.subgroupTemplateId});
                this.subgroupsTreesComponent.dataSource.refreshNodesOnLevel(node);
              });
            }
          }
        ]);
      } else {
        contextMenuItems.push(...[
          {
            translation: 'createTheTemplateVersion', action: async item => {
              await this._appHelper.tryAction('saved', 'error', async () => {
                const subgroupTemplateVersion = await this._participantRestApiService.createUnapprovedSubgroupTemplateVersion({}, {}, {subgroupTemplateId: node.data.subgroupTemplate.id});
                this.subgroupsTreesComponent.dataSource.refreshNodesOnLevel(null);
              });
            }
          },
          {
            translation: 'apply', action: async item => {
              await this._appHelper.tryAction('templateHasApplied', 'error', async () => {
                const subgroupTemplateGroup = new SubgroupTemplateGroup();
                subgroupTemplateGroup.group = this.group;
                await this._participantRestApiService.createSubgroupTemplateGroup(subgroupTemplateGroup, {}, {subgroupTemplateId: node.data.subgroupTemplate.id});
              });
            }
          }]);
      }
      return contextMenuItems;
    } else if (node.data instanceof Subgroup) {
      if (!node.data.templateVersion.approved) {
        const subgroupTemplate = new SubgroupTemplate();
        subgroupTemplate.id = node.data.templateVersion.subgroupTemplateId;
        return [
          {
            translation: 'add', action: async item => {
              await this.editSubgroup(subgroupTemplate);
            }
          },
          {
            translation: 'edit', action: async item => {
              await this.editSubgroup(subgroupTemplate, node.data);
            }
          }
        ];
      }
    }
  };

  private async editSubgroup(subgroupTemplate: SubgroupTemplate, subgroup?: Subgroup) {
    const previousSubgroup = this._appHelper.cloneObject(subgroup);
    const dialogResult = await this._subgroupModalService.showEditSubgroup(subgroupTemplate, subgroup);
    if (dialogResult.result) {
      if (!this._appHelper.isNewObject(previousSubgroup)) {
        this.subgroupsTreesComponent.dataSource.removeNodeByData(previousSubgroup, (source, target) => source instanceof Subgroup && source.id == target.id);
      }

      const currentSubgroup = dialogResult.data;
      this.subgroupsTreesComponent.dataSource.addOrUpdateNodeIfCan(
        currentSubgroup, (source, target) => source instanceof Subgroup && source.id == target.id, currentSubgroup.subgroupVersion.parentSubgroupVersion,
        (source, target) => source instanceof Subgroup && source.subgroupVersion.id == target.id || source instanceof RootSubgroup && source.defaultSubgroup.subgroupVersion.id == target.id);
    }
  }

}
