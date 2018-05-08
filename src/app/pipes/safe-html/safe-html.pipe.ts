import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) {
  }

  transform(content) {
    return this._domSanitizer.bypassSecurityTrustHtml(content);
  }

}
