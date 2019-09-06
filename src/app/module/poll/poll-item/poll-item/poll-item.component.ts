import {Component, forwardRef, Inject} from '@angular/core';
import {BaseLibraryItem} from '../../../library/base-library-item/model/base-library-item';
import {DialogResult} from '../../../../data/local/dialog-result';
import {Poll} from '../../../../data/remote/model/poll/poll';
import {PollWindowService} from '../../../../services/windows/poll-window/poll-window.service';

@Component({
  selector: 'app-poll-item',
  templateUrl: './poll-item.component.html',
  styleUrls: ['./poll-item.component.scss']
})
export class PollItemComponent extends BaseLibraryItem<Poll> {

  constructor(
    // TODO: PollWindowService can't inject without forwardRef()
    @Inject(forwardRef(() => PollWindowService))
    private _pollWindowService: PollWindowService) {
    super();
  }

  public getInfo = async (item: Poll): Promise<void> => {
    await this._pollWindowService.openPollDetailWindow(this.data);
  };

  public openEditItem = async (item: Poll): Promise<DialogResult<Poll>> => {
    return await this._pollWindowService.openEditPollWindow(this.data);
  };

}
