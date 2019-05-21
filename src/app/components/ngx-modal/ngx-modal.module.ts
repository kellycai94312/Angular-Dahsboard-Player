import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxModalComponent} from './ngx-modal/ngx-modal.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSplitButtonModule} from '../ngx-split-button/ngx-split-button.module';
import {NgxModalService} from './service/ngx-modal.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgbModule,
    NgxSplitButtonModule
  ],
  declarations: [NgxModalComponent],
  exports: [NgxModalComponent],
  entryComponents: [NgxModalComponent],
  providers: [NgxModalService]
})
export class NgxModalModule {
}
