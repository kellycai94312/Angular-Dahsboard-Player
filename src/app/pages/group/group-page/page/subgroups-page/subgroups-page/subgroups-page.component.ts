import {Component, ComponentFactoryResolver} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';
import {GroupService} from '../../../service/group.service';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {EditSubgroupTemplateComponent} from '../../../../../../module/group/edit-subgroup-template/edit-subgroup-template/edit-subgroup-template.component';

@Component({
  selector: 'app-subgroups-page',
  templateUrl: './subgroups-page.component.html',
  styleUrls: ['./subgroups-page.component.scss']
})
export class SubgroupsPageComponent {

  public readonly tabs: Tab[];

  constructor(private _groupService: GroupService,
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver) {
    this.tabs = [
      {nameKey: 'structureSubgroups', routerLink: 'structure'},
      {
        nameKey: 'templates', routerLink: 'template', splitButtonsItems: [
          {
            nameKey: 'add',
            callback: async data => {
              const modal = this._ngxModalService.open();
              modal.componentInstance.titleKey = 'template';
              await modal.componentInstance.initializeBody(EditSubgroupTemplateComponent, async component => {
                // TODO: Set data
                await component.initialize({});

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
