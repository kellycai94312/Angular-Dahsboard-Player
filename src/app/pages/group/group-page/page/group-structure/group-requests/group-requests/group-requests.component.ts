import {Component, ComponentFactoryResolver} from '@angular/core';
import {Tab} from '../../../../../../../data/local/tab';
import {TemplateModalService} from '../../../../../../../service/template-modal.service';
import {GroupConnectionRequest} from '../../../../../../../data/remote/model/group/connection/group-connection-request';
import {GroupService} from '../../../../service/group.service';

@Component({
  selector: 'app-group-requests',
  templateUrl: './group-requests.component.html',
  styleUrls: ['./group-requests.component.scss']
})
export class GroupRequestsComponent {

  public readonly tabs: Tab[];

  constructor(private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _groupService: GroupService) {
    this.tabs = [
      {
        nameKey: 'outcoming',
        routerLink: 'outcoming',
        splitButtonsItems: [
          {
            nameKey: 'add',
            callback: async data => {
              const dialogResult = await this._templateModalService.showEditGroupConnectionRequest(new GroupConnectionRequest(), {componentFactoryResolver: this._componentFactoryResolver});
              if (dialogResult.result) {
                this._groupService.updateData(dialogResult.data);
              }
            }
          }
        ]
      },
      {
        nameKey: 'incoming',
        routerLink: 'incoming'
      }
    ];
  }

}
