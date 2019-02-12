import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HtmlService} from '../../service/html/html.service';
import {AppHelper} from '../../utils/app-helper';
import {TranslateObjectService} from '../../shared/translate-object.service';
import {LinkTarget} from '../../data/local/link-target';

@Pipe({
  name: 'urlParser'
})
export class UrlParserPipe implements PipeTransform {

  public readonly urlRegExp: RegExp;

  constructor(private _appHelper: AppHelper,
              private _htmlService: HtmlService,
              private _translateObjectService: TranslateObjectService,
              private _domSanitizer: DomSanitizer) {
    const urlPattern = '^(?:http(s)?:\\/\\/)[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';
    this.urlRegExp = new RegExp(urlPattern, 'mig');
  }

  async transform(value: string, args?: any): Promise<any> {
    let result = value;
    let regExpExecArray: RegExpExecArray;

    do {
      regExpExecArray = this.urlRegExp.exec(value);
      if (regExpExecArray) {
        const url = regExpExecArray[0];
        let content = this._htmlService.getUrlLinkTag(url, url, LinkTarget.BLANK);
        if (await this._htmlService.imageExists(url)) {
          if (args && args.previewImage) {
            result = `${this._htmlService.getImageIconTag()} ${await this._translateObjectService.getTranslation('image')}`;
            break;
          } else {
            content = `${this._htmlService.getImageTag(url, '400px')}<br>`;
          }
        }
        result = this._appHelper.replaceAt(result, regExpExecArray.index, url, content);
      }
    } while (regExpExecArray);

    return this._domSanitizer.bypassSecurityTrustHtml(result);
  }

}
