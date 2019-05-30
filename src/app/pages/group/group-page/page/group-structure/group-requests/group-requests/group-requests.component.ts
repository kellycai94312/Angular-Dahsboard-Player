import {Component, ComponentFactoryResolver} from '@angular/core';
import {TemplateModalService} from '../../../../../../../service/template-modal.service';
import {GroupConnectionRequest} from '../../../../../../../data/remote/model/group/connection/group-connection-request';
import {GroupService} from '../../../../service/group.service';
import {NgxTab} from '../../../../../../../module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-group-requests',
  templateUrl: './group-requests.component.html',
  styleUrls: ['./group-requests.component.scss']
})
export class GroupRequestsComponent {

  public readonly tabs: NgxTab[];

  constructor(private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _groupService: GroupService) {
    this.tabs = [
      {
        translation: 'outcoming',
        link: 'outcoming',
        actions: [
          {
            iconName: 'add',
            action: async () => {
              const dialogResult = await this._templateModalService.showEditGroupConnectionRequest(new GroupConnectionRequest(), {componentFactoryResolver: this._componentFactoryResolver});
              if (dialogResult.result) {
                this._groupService.updateData(dialogResult.data);
              }
            }
          }
        ]
      },
      {translation: 'incoming', link: 'incoming'}
    ];
  }

}
