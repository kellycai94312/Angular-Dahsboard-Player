import {Component, Input, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {Group} from '../../../data/remote/model/group/base/group';
import {TemplateModalService} from '../../../service/template-modal.service';
import {BaseGroupNews} from '../../../data/remote/model/group/news/base-group-news';

@Component({
  selector: 'app-edit-group-news',
  templateUrl: './edit-group-news.component.html',
  styleUrls: ['./edit-group-news.component.scss']
})
export class EditGroupNewsComponent extends BaseEditComponent<BaseGroupNews> implements OnInit {

  @Input()
  public group: Group;

  constructor(private _templateModalService: TemplateModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.removeGroupNews({groupId: this.group.id, groupNewsId: this.data.id}));
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.createGroupNews(this.data, {}, {groupId: this.group.id}));
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.updateGroupNews(this.data, {}, {groupId: this.group.id, groupNewsId: this.data.id}));
      }
    });
  }

}
