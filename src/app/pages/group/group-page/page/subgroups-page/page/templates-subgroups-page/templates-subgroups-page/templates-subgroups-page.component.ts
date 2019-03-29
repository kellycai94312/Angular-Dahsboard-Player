import {Component, ViewChild} from '@angular/core';
import {DynamicFlatNode} from '../../../../../../../../module/group/subgroups-trees/model/dynamic-flat-node';
import {ContextMenuItem} from '../../../../../../../../module/group/subgroups-trees/model/context-menu-item';
import {SubgroupModalService} from '../../../service/subgroup-modal.service';
import {AppHelper} from '../../../../../../../../utils/app-helper';
import {GroupService} from '../../../../../service/group.service';
import {SubgroupTemplate} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateVersion} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-version';
import {Subgroup} from '../../../../../../../../data/remote/model/group/subgroup/subgroup/subgroup';
import {SubgroupTemplateTreeDataSource} from '../../../../../../../../module/group/subgroups-trees/model/subgroup-template-tree-data-source';
import {ParticipantRestApiService} from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {skipWhile, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../../../../../data/local/property-constant';
import {SubgroupsTreesComponent} from '../../../../../../../../module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';
import {SubgroupService} from '../../../service/subgroup.service';
import {Group} from '../../../../../../../../data/remote/model/group/base/group';
import {SubgroupTemplateGroup} from '../../../../../../../../data/remote/model/group/subgroup/template/subgroup-template-group';

@Component({
  selector: 'app-templates-subgroups-page',
  templateUrl: './templates-subgroups-page.component.html',
  styleUrls: ['./templates-subgroups-page.component.scss']
})
export class TemplatesSubgroupsPageComponent {

  @ViewChild(SubgroupsTreesComponent)
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  public treeDataSource: SubgroupTemplateTreeDataSource;
  public group: Group;
  private _notDestroyed = true;
  private _canEdit = false;

  constructor(private _subgroupModalService: SubgroupModalService,
              private _appHelper: AppHelper,
              private _groupService: GroupService,
              private _subgroupService: SubgroupService,
              private _participantRestApiService: ParticipantRestApiService) {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        this.group = val;
        this.treeDataSource = new SubgroupTemplateTreeDataSource(val, this._participantRestApiService);
        this._canEdit = await this._groupService.canShowTemplatesSubgroups();
      });
    this._subgroupService.subgroupTemplateChanged()
      .pipe(
        takeWhile(() => this._notDestroyed),
        skipWhile(() => !this.subgroupsTreesComponent)
      )
      .subscribe(val => {
        const treeData = this.subgroupsTreesComponent.dataSource.data;
        const subgroupTemplateNodeIndex = treeData.findIndex(x => x.level == 0 && (x.data as SubgroupTemplate).id == val.id);

        if (!val.deleted) {
          if (subgroupTemplateNodeIndex > -1) {
            const subgroupTemplateNode = treeData[subgroupTemplateNodeIndex];
            subgroupTemplateNode.data = val;
            subgroupTemplateNode.name = val.name;
          } else {
            treeData.push(new DynamicFlatNode(val, val.name, 0, true));
          }
        } else {
          if (subgroupTemplateNodeIndex > -1) {
            treeData.splice(subgroupTemplateNodeIndex, 1);
          }
        }

        this.subgroupsTreesComponent.dataSource.dataChange.next(treeData);
      });
  }

  public onGetNodeContextMenuItem = async (node: DynamicFlatNode): Promise<ContextMenuItem[]> => {
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
              await this._participantRestApiService.createSubgroupTemplateGroup(subgroupTemplateGroup, {}, {subgroupTemplateId: node.data.subgroupTemplateId});
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
        const templateNode = this.subgroupsTreesComponent.dataSource.data.find(x => x.level == 0 && (x.data as SubgroupTemplateVersion).id == node.data.subgroupTemplateId);
        await this.subgroupsTreesComponent.dataSource.updateNode(templateNode);
      };
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
    const dialogResult = await this._subgroupModalService.showEditSubgroup(subgroupTemplate, subgroup);
    if (dialogResult.result) {
      const versionNodesLevel = 1;
      const treeData = this.subgroupsTreesComponent.dataSource.data;
      const subgroupTemplateVersion = dialogResult.data.subgroupTemplateVersion;
      let fromIndex = 0;
      if (dialogResult.data.subgroupTemplateVersion) {
        fromIndex = treeData.findIndex(x => x.data.id == subgroupTemplateVersion.id && x.level == versionNodesLevel);
        if (fromIndex == -1 && treeData.filter(x => x.level == versionNodesLevel).length) {
          fromIndex = treeData.push(new DynamicFlatNode(subgroupTemplateVersion, `Version ${subgroupTemplateVersion.versionNumber}. Approved '${subgroupTemplateVersion.approved}'`, versionNodesLevel, true));
        }
      }

      const isLevelSubgroups = (node: DynamicFlatNode): boolean => node.level && node.level != versionNodesLevel;

      const subgroupRes = dialogResult.data.subgroup;
      const subgroupNodeIndex = treeData.findIndex(x => isLevelSubgroups(x) && x.data.id == subgroupRes.id);

      const parentSubgroupVersion = dialogResult.data.subgroup.subgroupVersion.parentSubgroupVersion;
      let parentSubgroupNode: DynamicFlatNode;
      if (parentSubgroupVersion) {
        parentSubgroupNode = treeData.find(
          x =>
            isLevelSubgroups(x) &&
            (x.data as Subgroup).subgroupVersion &&
            (x.data as Subgroup).subgroupVersion.id == parentSubgroupVersion.id
        );
      }

      if (subgroupNodeIndex > -1) {
        treeData.splice(subgroupNodeIndex, 1);
      }

      let newNode: DynamicFlatNode;
      if (parentSubgroupNode) {
        newNode = new DynamicFlatNode(subgroupRes, subgroupRes.subgroupVersion.name, parentSubgroupNode.level + 1, true);
      } else {
        newNode = new DynamicFlatNode(subgroupRes, subgroupRes.subgroupVersion.name, 2, true);
      }

      let fromNodeIndex = -1;
      for (let i = fromIndex; i < treeData.length - 1; i++) {
        const currentItem = treeData[i];
        const nextItem = treeData[i + 1];
        if (currentItem.level == newNode.level && nextItem.level != newNode.level) {
          fromNodeIndex = i;
          break;
        }
      }

      if (fromNodeIndex > -1) {
        treeData.splice(fromNodeIndex, 0, newNode);
      }
      this.subgroupsTreesComponent.dataSource.dataChange.next(treeData);
    }
  }

}
