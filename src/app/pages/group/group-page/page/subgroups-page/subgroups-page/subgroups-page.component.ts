import {Component, OnDestroy} from '@angular/core';
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
export class SubgroupsPageComponent implements OnDestroy {

  public readonly tabs: Tab[];
  private readonly _templatesTab: Tab;
  private _notDestroyed = true;

  constructor(private _groupService: GroupService,
              private _appHelper: AppHelper,
              private _subgroupService: SubgroupService,
              private _subgroupModalService: SubgroupModalService) {
    this._templatesTab = {nameKey: 'templates', routerLink: 'template'};
    this.tabs = [
      {nameKey: 'subgroupsStructure', routerLink: 'structure'},
      this._templatesTab
    ];

    this._groupService.groupPerson$.subscribe(async val => {
      if (await this._groupService.canShowTemplatesSubgroups()) {
        this._templatesTab.splitButtonsItems = [
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
        ];
      } else {
        this._templatesTab.splitButtonsItems = [];
      }
    });
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
