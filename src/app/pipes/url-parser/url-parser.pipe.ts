import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'urlParser'
})
export class UrlParserPipe implements PipeTransform {

  public readonly urlPattern: string;
  public readonly urlRegExp: RegExp;

  constructor(private _domSanitizer: DomSanitizer) {
    this.urlPattern = '(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})';
    this.urlRegExp = new RegExp(this.urlPattern);
  }

  transform(value: string, args?: any): any {
    let result = '';
    const count = value.length;
    for (let i = 0; i < count; i++) {
      const item = value[i];
      if (item === ' ' || item === '\n') {
        result += this.convertSymbolToHtmlTag(item);
      } else {
        const startIndex = i;
        let endIndex = count;
        for (let j = startIndex; j < count; j++) {
          const subitem = value[j];
          if (subitem === ' ' || subitem === '\n') {
            endIndex = j;
            i = endIndex - 1;
            break;
          }
        }

        const text = value.substring(startIndex, endIndex);
        if (this.urlRegExp.test(text)) {
          result += this.getHtmlLinkTag(text);
        } else {
          result += text;
        }

        if (endIndex == value.length) {
          break;
        }
      }
    }

    return this._domSanitizer.bypassSecurityTrustHtml(result);
  }

  private convertSymbolToHtmlTag(symbol: string): string {
    if (symbol === ' ') {
      return ' ';
    } else if (symbol === '\n') {
      return '<br>';
    }
    return symbol;
  }

  private getHtmlLinkTag(url: string): string {
    return `<a href="${url}">${url}</a>`;
  }

}
