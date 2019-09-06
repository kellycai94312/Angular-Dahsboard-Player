import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MessageContent} from '../../../../../data/remote/model/chat/message';

@Component({
  selector: 'app-message-content-item',
  templateUrl: './message-content-item.component.html',
  styleUrls: ['./message-content-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageContentItemComponent {

  @Input()
  public messageContent: MessageContent;

}
