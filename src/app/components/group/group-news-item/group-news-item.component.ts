import {Component, Input, OnInit} from '@angular/core';
import {GroupNewsDiscriminator} from '../../../data/remote/model/group/news/group-news-discriminator';
import {BaseGroupNews} from '../../../data/remote/model/group/news/base-group-news';
import {GroupNews} from '../../../data/remote/model/group/news/group-news';
import {HtmlService} from '../../../service/html/html.service';
import {EventGroupNews} from '../../../data/remote/model/group/news/event-group-news';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {TemplateModalService} from '../../../service/template-modal.service';
import {IconEnum} from '../../ngx-button/model/icon-enum';

@Component({
  selector: 'app-group-news-item',
  templateUrl: './group-news-item.component.html',
  styleUrls: ['./group-news-item.component.scss']
})
export class GroupNewsItemComponent implements OnInit {

  public readonly iconEnumClass = IconEnum;
  public readonly groupNewsDiscriminatorClass = GroupNewsDiscriminator;

  @Input()
  public data: BaseGroupNews;

  @Input()
  public canEdit: boolean;

  public content: string;

  constructor(private _htmlService: HtmlService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService) {
  }

  async ngOnInit() {
    await this.refreshContent();
  }

  public onEdit = async (obj: GroupNews) => {
    await this.showModal(obj);
  };

  public onRemove = async (obj: BaseGroupNews) => {
    await this._appHelper.tryRemove(async () => {
      this._appHelper.updateObject(this.data, await this._participantRestApiService.removeGroupNews({groupId: obj.group.id, groupNewsId: obj.id}));
    });
  };

  private async showModal(obj: GroupNews) {
    const dialogResult = await this._templateModalService.showEditGroupNewsModal(obj, obj.group);
    if (dialogResult.result) {
      this._appHelper.updateObject(this.data, dialogResult.data);
      await this.refreshContent();
    }
  }

  private async refreshContent() {
    switch (this.data.discriminator) {
      case GroupNewsDiscriminator.EVENT_GROUP_NEWS:
        this.content = await this._htmlService.getEventPreview((this.data as EventGroupNews).training);
        break;
      case GroupNewsDiscriminator.GROUP_NEWS:
        this.content = (this.data as GroupNews).content;
        break;
    }
  }

}
