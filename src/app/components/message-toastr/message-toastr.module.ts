import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageToastrComponent} from './message-toastr.component';
import {UrlParserModule} from '../../pipes/url-parser/url-parser.module';
import {ImageModule} from '../image/image.module';
import {TranslateModule} from '@ngx-translate/core';
import {MessageToastrService} from './message-toastr.service';

@NgModule({
  imports: [
    CommonModule,
    UrlParserModule,
    ImageModule,
    TranslateModule.forChild()
  ],
  declarations: [MessageToastrComponent],
  entryComponents: [MessageToastrComponent],
  exports: [MessageToastrComponent],
  providers: [MessageToastrService]
})
export class MessageToastrModule {
}
