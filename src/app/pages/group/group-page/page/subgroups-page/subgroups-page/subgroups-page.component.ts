import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupService} from '../../../service/group.service';
import {SubgroupModalService} from '../service/subgroup-modal.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {SubgroupService} from '../service/subgroup.service';
import {NgxTab} from '../../../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-subgroups-page',
  templateUrl: './subgroups-page.component.html',
  styleUrls: ['./subgroups-page.component.scss']
})
export class SubgroupsPageComponent implements OnInit, OnDestroy {

  public readonly tabs: NgxTab[];
  private readonly _templatesTab: NgxTab;
  private _notDestroyed = true;

  constructor(private _groupService: GroupService,
              private _appHelper: AppHelper,
              private _subgroupService: SubgroupService,
              private _subgroupModalService: SubgroupModalService) {
    this._templatesTab = {translation: 'templates', link: 'template'};
    this.tabs = [
      {translation: 'subgroupsStructure', link: 'structure'},
      this._templatesTab
    ];
  }

  ngOnInit(): void {
    this._groupService.groupPerson$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        if (await this._groupService.canShowTemplatesSubgroups()) {
          this._templatesTab.actions = [
            {
              iconName: 'add',
              action: async data => {
                const group = await this._appHelper.toPromise(this._groupService.group$);
                const dialogResult = await this._subgroupModalService.showEditSubgroupTemplate(group, data.data);
                if (dialogResult.result) {
                  this._subgroupService.updateSubgroupTemplate(dialogResult.data);
                }
              }
            }
          ];
        } else {
          this._templatesTab.actions = [];
        }
      });
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
