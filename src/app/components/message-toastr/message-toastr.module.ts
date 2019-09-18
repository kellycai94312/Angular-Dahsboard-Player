import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UrlParserModule } from '../../pipes/url-parser/url-parser.module';
import { MessageToastrComponent } from './message-toastr.component';
import { MessageToastrService } from './message-toastr.service';

@NgModule({
  declarations: [MessageToastrComponent],
  entryComponents: [MessageToastrComponent],
  providers: [MessageToastrService],
  exports: [MessageToastrComponent],
  imports: [
    CommonModule,
    UrlParserModule,
    TranslateModule.forChild()
  ]
})
export class MessageToastrModule {
}
