import {Injectable} from '@angular/core';
import {Message, SystemMessageContent} from '../../data/remote/model/chat/message';
import {HtmlService} from '../../service/html/html.service';
import {TranslateService} from '@ngx-translate/core';
import {AppHelper} from '../../utils/app-helper';

@Injectable({
  providedIn: 'root'
})
export class ConversationUtilService {

  constructor(private _htmlService: HtmlService,
              private _appHelper: AppHelper,
              private _translateService: TranslateService) {
  }

  public getSystemMessageContent(message: Message, withoutHtml?: boolean): string | undefined {
    if (message.content instanceof SystemMessageContent) {
      const sender = withoutHtml ? this._appHelper.getPersonFullName(message.sender.person) : this._htmlService.getPersonLinkTag(message.sender.person);
      let person: string;
      if (message.content.object) {
        person = withoutHtml ? this._appHelper.getPersonFullName(message.content.object.person) : this._htmlService.getPersonLinkTag(message.content.object.person);
      }
      return this._translateService.instant(`systemMessageTypeEnum.${message.content.systemMessageType}`, {sender, person});
    }
    return void 0;
  }

}
