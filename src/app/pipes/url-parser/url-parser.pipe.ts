import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {TranslateObjectService} from '../../shared/translate-object.service';
import {AppHelper} from '../../utils/app-helper';
import {PropertyConstant} from '../../data/local/property-constant';

@Pipe({
  name: 'urlParser'
})
export class UrlParserPipe implements PipeTransform {

  public readonly urlPattern: string;
  public readonly urlRegExp: RegExp;

  constructor(private _domSanitizer: DomSanitizer,
              private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _appHelper: AppHelper) {
    this.urlPattern = '(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})';
    this.urlRegExp = new RegExp(this.urlPattern, 'mig');
  }

  async transform(value: string, args?: any): Promise<any> {
    let result = value;
    let regExpExecArray: RegExpExecArray;
    do {
      regExpExecArray = this.urlRegExp.exec(value);
      if (regExpExecArray) {
        const lastValue = regExpExecArray[0];
        let newValue = '';
        if (new RegExp('(\\/)event(\\/)\\d+', 'mig').test(lastValue)) {
          newValue = await this.getEvent(lastValue);
        } else {
          newValue = this.getHtmlLinkTag(regExpExecArray[0]);
        }

        result = result.replace(lastValue, newValue);
      }
    } while (regExpExecArray);
    return this._domSanitizer.bypassSecurityTrustHtml(result);
  }

  private getHtmlLinkTag(url: string, content: string = url): string {
    return `<a target="_blank" href="${url}">${content}</a>`;
  }

  private async getEvent(url: string): Promise<string> {
    const res = new RegExp('\\d+', 'mig').exec(url);
    if (res) {
      const eventId = +res[0];
      const event = await this._participantRestApiService.getBaseTraining({id: eventId});
      const eventTypeLabelName = await this._translateObjectService.getTranslation('eventType');
      const eventTypeName = await this._translateObjectService.getTranslation(`trainingDiscriminator.${event.discriminator}`);

      const startDateLabelName = await this._translateObjectService.getTranslation('startDate');
      const finishDateLabelName = await this._translateObjectService.getTranslation('finishDate');
      const descriptionLabelName = await this._translateObjectService.getTranslation('description');

      let descriptionBlock = '';
      if (event.description) {
        descriptionBlock = `<br>${descriptionLabelName}: <pre>${event.description}</pre>`;
      }
      return this.getHtmlLinkTag(url, `<h3 class="m-0 p-0">${event.name}</h3><p class="m-0 p-0 text-truncate flex-nowrap">${eventTypeLabelName}: ${eventTypeName}<br>${startDateLabelName}: ${this._appHelper.dateByFormat(event.startTime, PropertyConstant.dateTimeFormat)} ${finishDateLabelName}: ${this._appHelper.dateByFormat(event.finishTime, PropertyConstant.dateTimeFormat)}${descriptionBlock}</p>`);
    }
    return url;
  }

}
