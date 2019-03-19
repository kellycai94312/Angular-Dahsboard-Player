import {Component, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-structure-subgroups-page',
  templateUrl: './structure-subgroups-page.component.html',
  styleUrls: ['./structure-subgroups-page.component.scss']
})
export class StructureSubgroupsPageComponent {

  @ViewChild(SubgroupsTreesComponent)
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  public treeDataSource: SubgroupGroupTreeDataSource;
  public group: Group;
  private _notDestroyed = true;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
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
    }
    return [];
  };

}
