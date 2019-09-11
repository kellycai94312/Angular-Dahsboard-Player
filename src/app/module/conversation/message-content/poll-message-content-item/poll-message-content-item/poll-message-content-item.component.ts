import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseComponent} from '../../../../../data/local/component/base/base-component';
import {PollMessageContent} from '../../../../../data/remote/model/chat/message';
import {PollWindowService} from '../../../../../services/windows/poll-window/poll-window.service';

@Component({
  selector: 'app-poll-message-content-item',
  templateUrl: './poll-message-content-item.component.html',
  styleUrls: ['./poll-message-content-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollMessageContentItemComponent extends BaseComponent<PollMessageContent> {

  constructor(private _pollWindowService: PollWindowService) {
    super();
  }

  public async onExecutePoll(): Promise<void> {
    await this._pollWindowService.executePoll(this.data.appliedPoll);
  }

}
