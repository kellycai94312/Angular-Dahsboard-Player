import {Component} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';
import {GroupService} from '../../../service/group.service';
import {SubgroupModalService} from '../service/subgroup-modal.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {SubgroupService} from '../service/subgroup.service';

@Component({
  selector: 'app-subgroups-page',
  templateUrl: './subgroups-page.component.html',
  styleUrls: ['./subgroups-page.component.scss']
})
export class SubgroupsPageComponent {

  public readonly tabs: Tab[];

  constructor(private _groupService: GroupService,
              private _appHelper: AppHelper,
              private _subgroupService: SubgroupService,
              private _subgroupModalService: SubgroupModalService) {
    this.tabs = [
      {nameKey: 'subgroupsStructure', routerLink: 'structure'},
      {
        nameKey: 'templates', routerLink: 'template', splitButtonsItems: [
          {
            nameKey: 'add',
            callback: async data => {
              const group = await this._appHelper.toPromise(this._groupService.group$);
              const dialogResult = await this._subgroupModalService.showEditSubgroupTemplate(group, data.data);
              if (dialogResult.result) {
                this._subgroupService.updateSubgroupTemplate(dialogResult.data);
              }
            }
          }
        ]
      }
    ];
  }

}
