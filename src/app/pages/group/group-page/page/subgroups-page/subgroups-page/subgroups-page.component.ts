import {Component} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';
import {GroupService} from '../../../service/group.service';
import {SubgroupModalService} from '../service/subgroup-modal.service';
import {AppHelper} from '../../../../../../utils/app-helper';

@Component({
  selector: 'app-subgroups-page',
  templateUrl: './subgroups-page.component.html',
  styleUrls: ['./subgroups-page.component.scss']
})
export class SubgroupsPageComponent {

  public readonly tabs: Tab[];

  constructor(private _groupService: GroupService,
              private _appHelper: AppHelper,
              private _subgroupModalService: SubgroupModalService) {
    this.tabs = [
      {nameKey: 'subgroupsStructure', routerLink: 'structure'},
      {
        nameKey: 'templates', routerLink: 'template', splitButtonsItems: [
          {
            nameKey: 'add',
            callback: async data => {
              const group = await this._appHelper.toPromise(this._groupService.group$);
              await this._subgroupModalService.showEditSubgroupTemplate(group, data.data);
            }
          }
        ]
      }
    ];
  }

}
