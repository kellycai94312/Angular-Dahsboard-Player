import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxSplitButtonComponent} from './ngx-split-button/ngx-split-button.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BusyButtonModule} from '../busy-button/busy-button.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgbModule.forRoot(),
    BusyButtonModule
  ],
  declarations: [NgxSplitButtonComponent],
  exports: [NgxSplitButtonComponent]
})
export class NgxSplitButtonModule {
}
