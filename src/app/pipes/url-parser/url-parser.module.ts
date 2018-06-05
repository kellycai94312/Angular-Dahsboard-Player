import {NgModule} from '@angular/core';
import {UrlParserPipe} from './url-parser.pipe';

@NgModule({
  declarations: [UrlParserPipe],
  exports: [UrlParserPipe]
})
export class UrlParserModule {
}
