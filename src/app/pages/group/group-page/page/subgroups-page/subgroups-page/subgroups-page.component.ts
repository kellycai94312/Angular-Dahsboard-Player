import {Component, ComponentFactoryResolver} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';
import {GroupService} from '../../../service/group.service';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {EditSubgroupTemplateComponent} from '../../../../../../module/group/edit-subgroup-template/edit-subgroup-template/edit-subgroup-template.component';
import {SubgroupTemplate} from '../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {AppHelper} from '../../../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-subgroups-page',
  templateUrl: './subgroups-page.component.html',
  styleUrls: ['./subgroups-page.component.scss']
})
export class SubgroupsPageComponent {

  public readonly tabs: Tab[];

  constructor(private _groupService: GroupService,
              private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _componentFactoryResolver: ComponentFactoryResolver) {
    this.tabs = [
      {nameKey: 'subgroupsStructure', routerLink: 'structure'},
      {
        nameKey: 'templates', routerLink: 'template', splitButtonsItems: [
          {
            nameKey: 'add',
            callback: async data => {
              const modal = this._ngxModalService.open();
              modal.componentInstance.titleKey = 'template';
              await modal.componentInstance.initializeBody(EditSubgroupTemplateComponent, async component => {
                const subgroupTemplate = new SubgroupTemplate();
                subgroupTemplate.group = await this._appHelper.toPromise(this._groupService.group$);
                await component.initialize(subgroupTemplate);

                modal.componentInstance.splitButtonItems = [
                  this._ngxModalService.saveSplitItemButton(async () => {
                    await this._ngxModalService.save(modal, component);
                  }),
                  this._ngxModalService.removeSplitItemButton(async () => {
                    await this._ngxModalService.remove(modal, component);
                  })
                ];
              }, {componentFactoryResolver: this._componentFactoryResolver});
            }
          }
        ]
      }
    ];
  }

}
