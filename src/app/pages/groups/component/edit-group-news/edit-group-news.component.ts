import {Component, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {GroupService} from '../../group.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {BaseGroupNews} from '../../../../data/remote/model/group/news/base-group-news';

@Component({
  selector: 'app-edit-group-news',
  templateUrl: './edit-group-news.component.html',
  styleUrls: ['./edit-group-news.component.scss']
})
export class EditGroupNewsComponent extends BaseEditComponent<BaseGroupNews> implements OnInit {

  private _group: Group;

  constructor(private _groupService: GroupService,
              private _templateModalService: TemplateModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    // TODO: Get group object from GroupNew instead GroupService
    this._group = this._groupService.groupSubject.getValue();
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removeGroupNews({groupId: this._group.id, groupNewsId: this.data.id});
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createGroupNews(this.data, {}, {groupId: this._group.id});
      } else {
        this.data = await this.participantRestApiService.updateGroupNews(this.data, {}, {groupId: this._group.id, groupNewsId: this.data.id});
      }
    });
  }

  public onAddEvent = async () => {
    await this._templateModalService.showEditEventModal();
  };

}
