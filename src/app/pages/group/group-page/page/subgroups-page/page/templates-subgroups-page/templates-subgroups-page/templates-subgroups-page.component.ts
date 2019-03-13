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
import {takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../../../../../data/local/property-constant';
import {SubgroupsTreesComponent} from '../../../../../../../../module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';

@Component({
  selector: 'app-templates-subgroups-page',
  templateUrl: './templates-subgroups-page.component.html',
  styleUrls: ['./templates-subgroups-page.component.scss']
})
export class TemplatesSubgroupsPageComponent {

  @ViewChild(SubgroupsTreesComponent)
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  public treeDataSource: SubgroupTemplateTreeDataSource;
  private _notDestroyed = true;

  constructor(private _subgroupModalService: SubgroupModalService,
              private _appHelper: AppHelper,
              private _groupService: GroupService,
              private _participantRestApiService: ParticipantRestApiService) {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(val => {
        this.treeDataSource = new SubgroupTemplateTreeDataSource(val, this._participantRestApiService);
      });
  }

  public onGetNodeContextMenuItem = async (node: DynamicFlatNode): Promise<ContextMenuItem[]> => {
    if (!node.level) {
      const nodeData = node.data as SubgroupTemplate;
      return [
        {
          translation: 'add', action: async item => {
            await this.editSubgroup(nodeData);
          }
        },
        {
          translation: 'edit', action: async item => {
            const group = await this._appHelper.toPromise(this._groupService.group$);
            await this._subgroupModalService.showEditSubgroupTemplate(group, nodeData);
          }
        }
      ];
    } else if (node.level == 1) {
      const nodeData = node.data as SubgroupTemplateVersion;
      if (nodeData.approved) {
        return;
      }

      return [
        {
          translation: 'approve', action: async item => {
            const date = new Date();
            date.setHours(24 * 14);

            await this._appHelper.tryAction('templateHasApproved', 'error', async () => {
              await this._participantRestApiService.approveSubgroupTemplate(
                {date: this._appHelper.dateByFormat(date, PropertyConstant.dateTimeServerFormat)},
                {}, {subgroupTemplateId: nodeData.subgroupTemplateId});
            });
          }
        },
        {
          translation: 'reject', action: async item => {
            await this._appHelper.tryAction('templateHasReject', 'error', async () => {
              await this._participantRestApiService.disapproveSubgroupTemplate({subgroupTemplateId: nodeData.subgroupTemplateId});
            });
          }
        }
      ];
    } else {
      const nodeData = node.data as Subgroup;
      const subgroupTemplate = new SubgroupTemplate();
      subgroupTemplate.id = nodeData.templateVersion.subgroupTemplateId;

      return [
        {
          translation: 'add', action: async item => {
            await this.editSubgroup(subgroupTemplate);
          }
        },
        {
          translation: 'edit', action: async item => {
            await this.editSubgroup(subgroupTemplate, nodeData);
          }
        }
      ];
    }
  };

  private async editSubgroup(subgroupTemplate: SubgroupTemplate, subgroup?: Subgroup) {
    const dialogResult = await this._subgroupModalService.showEditSubgroup(subgroupTemplate, subgroup);
    // TODO: Fix updating data
    if (dialogResult.result) {
      const subgroupTemplateVersion = dialogResult.data.subgroupTemplateVersion;
      if (dialogResult.data.subgroupTemplateVersion) {
        const subgroupTemplateVersionNode = this.subgroupsTreesComponent.dataSource.data.find(x => x.data === subgroupTemplateVersion);
        console.log('data', this.subgroupsTreesComponent.dataSource.data);
        console.log('subgroupTemplateVersionNode', subgroupTemplateVersionNode);
        if (!subgroupTemplateVersionNode) {
          this.subgroupsTreesComponent.dataSource.data.push(new DynamicFlatNode(subgroupTemplateVersion, '' + subgroupTemplateVersion.versionNumber, 1, true));
        }
      }

      const parentSubgroupVersion = dialogResult.data.subgroup.subgroupVersion.parentSubgroupVersion;
      const subgroupRes = dialogResult.data.subgroup;
      if (parentSubgroupVersion) {
        const parentSubgroupNode = this.subgroupsTreesComponent.dataSource
          .data.find(x => (x.data as Subgroup).subgroupVersion && (x.data as Subgroup).subgroupVersion === parentSubgroupVersion);
        console.log('parentSubgroupNode', parentSubgroupNode);

        if (parentSubgroupNode) {
          this.subgroupsTreesComponent.dataSource.data.push(new DynamicFlatNode(subgroupRes, subgroupRes.subgroupVersion.name, parentSubgroupNode.level + 1, true));
        }
      } else {
        this.subgroupsTreesComponent.dataSource.data.push(new DynamicFlatNode(subgroupRes, subgroupRes.subgroupVersion.name, 2, true));
      }
      this.subgroupsTreesComponent.dataSource.dataChange.next(this.subgroupsTreesComponent.dataSource.data);
    }
  }

}
