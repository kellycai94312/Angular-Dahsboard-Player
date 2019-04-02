import {Component, OnInit, ViewChild} from '@angular/core';
import {ContextMenuItem} from '../../../../../../../../module/group/subgroups-trees/model/context-menu-item';
import {SubgroupModalService} from '../../../service/subgroup-modal.service';
import {AppHelper} from '../../../../../../../../utils/app-helper';
import {GroupService} from '../../../../../service/group.service';
import {SubgroupTemplate} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateVersion} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-version';
import {Subgroup} from '../../../../../../../../data/remote/model/group/subgroup/subgroup/subgroup';
import {ParticipantRestApiService} from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {map, skipWhile, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../../../../../data/local/property-constant';
import {SubgroupsTreesComponent} from '../../../../../../../../module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';
import {SubgroupService} from '../../../service/subgroup.service';
import {Group} from '../../../../../../../../data/remote/model/group/base/group';
import {SubgroupTemplateGroup} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {from, Observable} from 'rxjs';
import {FlatNode} from '../../../../../../../../module/ngx/ngx-tree/model/flat-node';
import {TranslateObjectService} from '../../../../../../../../shared/translate-object.service';

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
        skipWhile(() => !this.subgroupsTreesComponent)
      )
      .subscribe((val: SubgroupTemplate) => {
        if (!val.deleted) {
          this.subgroupsTreesComponent.dataSource.addOrUpdateNodeIfCan(val, (source, target) => source instanceof SubgroupTemplate && source.id == target.id);
        } else {
          this.subgroupsTreesComponent.dataSource.removeNodeByData(val, (source, target) => source instanceof SubgroupTemplate && source.id == target.id);
        }
      });
  }

  async ngOnInit(): Promise<void> {
    this._rootSubgroupName = await this._translateObjectService.getTranslation('rootSubgroup');
  }

  public getChildren = (node: FlatNode | any): Observable<FlatNode[]> => {
    if (node) {
      const nextLevel = (node.level || 0) + 1;
      if (node.data instanceof SubgroupTemplate) {
        return from(this._participantRestApiService.getSubgroupTemplateVersions({subgroupTemplateId: node.data.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      } else if (node.data instanceof SubgroupTemplateVersion) {
        return from(this._participantRestApiService.getSubgroupTemplateVersionChildrenSubgroups({}, {}, {subgroupTemplateVersionId: node.data.id}))
          .pipe(map(val => val.map(x => {
            if (x.subgroupVersion.defaultSubgroup) {
              x.subgroupVersion.name = this._rootSubgroupName;
            }
            return new FlatNode(x, nextLevel, true);
          })));
      } else if (node.data instanceof Subgroup) {
        return from(this._participantRestApiService.getSubgroupTemplateVersionChildrenSubgroups({}, {subgroupId: node.data.id}, {subgroupTemplateVersionId: node.data.templateVersion.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      }
    } else {
      return from(this._participantRestApiService.getSubgroupTemplates({},
        {count: PropertyConstant.pageSizeMax}, {groupId: this.group.id}))
        .pipe(map(value => {
          return value.list.map(x => new FlatNode(x, 0, true));
        }));
    }
  };

  public getNodeName = (node: FlatNode): string => {
    if (node.data instanceof SubgroupTemplate) {
      return node.data.name;
    } else if (node.data instanceof SubgroupTemplateVersion) {
      return node.data.approved ? `Подтвержденная версия ${node.data.versionNumber}` : `Неподтвержденная версия ${node.data.versionNumber}`;
    } else if (node.data instanceof Subgroup) {
      return node.data.subgroupVersion.name;
    }
  };

  public onGetNodeContextMenuItem = async (node: FlatNode): Promise<ContextMenuItem[]> => {
    if (!this._canEdit) {
      return [];
    }

    if (node.data instanceof SubgroupTemplate) {
      return [
        {
          translation: 'apply', action: async item => {
            await this._appHelper.tryAction('templateHasApplied', 'error', async () => {
              const subgroupTemplateGroup = new SubgroupTemplateGroup();
              subgroupTemplateGroup.group = this.group;
              await this._participantRestApiService.createSubgroupTemplateGroup(subgroupTemplateGroup, {}, {subgroupTemplateId: node.data.id});
            });
          }
        },
        {
          translation: 'add', action: async item => {
            await this.editSubgroup(node.data);
          }
        },
        {
          translation: 'edit', action: async item => {
            const group = await this._appHelper.toPromise(this._groupService.group$);
            const dialogResult = await this._subgroupModalService.showEditSubgroupTemplate(group, node.data);
            if (dialogResult.result) {
              this._subgroupService.updateSubgroupTemplate(dialogResult.data);
            }
          }
        }
      ];
    } else if (node.data instanceof SubgroupTemplateVersion) {
      const updateTemplate = async (): Promise<void> => {
        const parentNode = this.subgroupsTreesComponent.dataSource.getParentNode(node);
        if (parentNode) {
          this.subgroupsTreesComponent.dataSource.treeControl.collapse(parentNode);
          this.subgroupsTreesComponent.dataSource.treeControl.expand(parentNode);
        }
      };

      if (!node.data.approved) {
        return [
          {
            translation: 'approve', action: async item => {
              const date = new Date();
              date.setHours(24 * 21);

              await this._appHelper.tryAction('templateHasApproved', 'error', async () => {
                await this._participantRestApiService.approveSubgroupTemplate(
                  {date: this._appHelper.dateByFormat(date, PropertyConstant.dateTimeServerFormat)},
                  {}, {subgroupTemplateId: node.data.subgroupTemplateId});
                await updateTemplate();
              });
            }
          },
          {
            translation: 'reject', action: async item => {
              await this._appHelper.tryAction('templateHasRejected', 'error', async () => {
                await this._participantRestApiService.disapproveSubgroupTemplate({subgroupTemplateId: node.data.subgroupTemplateId});
                await updateTemplate();
              });
            }
          }
        ];
      }
    } else if (node.data instanceof Subgroup) {
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
        (source, target) => source instanceof Subgroup && source.subgroupVersion.id == target.id);
    }
  }

}
