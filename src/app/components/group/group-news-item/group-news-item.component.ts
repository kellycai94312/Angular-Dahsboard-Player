import {Component, Input, OnInit} from '@angular/core';
import {GroupNews} from '../../../data/remote/model/group/news/group-news';
import {HtmlService} from '../../../service/html/html.service';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {TemplateModalService} from '../../../service/template-modal.service';
import {IconEnum} from '../../ngx-button/model/icon-enum';
import {PropertyConstant} from '../../../data/local/property-constant';
import {EventPoll} from '../../../data/remote/model/training/poll/event-poll';

@Component({
  selector: 'app-group-news-item',
  templateUrl: './group-news-item.component.html',
  styleUrls: ['./group-news-item.component.scss']
})
export class GroupNewsItemComponent implements OnInit {

  public readonly iconEnumClass = IconEnum;
  public readonly propertyConstantClass = PropertyConstant;

  @Input()
  public data: GroupNews;

  @Input()
  public canEdit: boolean;

  public eventPoll: EventPoll;

  constructor(private _htmlService: HtmlService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService) {
  }

  public async ngOnInit(): Promise<void> {
    await this.initialize();
  }

  public async initialize(): Promise<void> {
    this.eventPoll = null;
    if (this.data.training) {
      const eventPolls = await this._participantRestApiService.getEventPolls({}, {}, {eventId: this.data.training.id});
      if (eventPolls.length && eventPolls[0].approved) {
        this.eventPoll = eventPolls[0];
      }
    }
  }

  public onEdit = async (obj: GroupNews) => {
    await this.showModal(obj);
  };

  public onRemove = async (obj: GroupNews) => {
    await this._appHelper.tryRemove(async () => {
      this._appHelper.updateObject(this.data, await this._participantRestApiService.removeGroupNews({groupId: obj.group.id, groupNewsId: obj.id}));
    });
  };

  public async onShowEventPoll(): Promise<void> {
    await this._templateModalService.showEditEventPollModal(this.data.training);
  }

  private async showModal(obj: GroupNews) {
    const dialogResult = await this._templateModalService.showEditGroupNewsModal(obj, obj.group);
    if (dialogResult.result) {
      this._appHelper.updateObject(this.data, dialogResult.data);

      await this.initialize();
    }
  }

}
