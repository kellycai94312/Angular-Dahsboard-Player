import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxSplitButtonComponent} from './ngx-split-button/ngx-split-button.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgbModule
  ],
  declarations: [NgxSplitButtonComponent],
  exports: [NgxSplitButtonComponent]
})
export class NgxSplitButtonModule {
}
