import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'urlParser'
})
export class UrlParserPipe implements PipeTransform {

  public readonly urlPattern: string;
  public readonly urlRegExp: RegExp;

  constructor(private _domSanitizer: DomSanitizer) {
    this.urlPattern = '(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})';
    this.urlRegExp = new RegExp(this.urlPattern, 'mig');
  }

  async transform(value: string, args?: any): Promise<any> {
    let result = value;
    let regExpExecArray: RegExpExecArray;
    do {
      regExpExecArray = this.urlRegExp.exec(value);
      if (regExpExecArray) {
        const val = regExpExecArray[0];
        result = result.replace(val, this.getHtmlLinkTag(val));
      }
    } while (regExpExecArray);
    return this._domSanitizer.bypassSecurityTrustHtml(result);
  }

  private getHtmlLinkTag(url: string, content: string = url): string {
    return `<a target="_blank" href="${url}">${content}</a>`;
  }

}
