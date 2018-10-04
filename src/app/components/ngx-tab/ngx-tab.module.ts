import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTabComponent} from './ngx-tab/ngx-tab.component';
import {NgxSplitButtonModule} from '../ngx-split-button/ngx-split-button.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgxSplitButtonModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
  ],
  declarations: [NgxTabComponent],
  exports: [NgxTabComponent]
})
export class NgxTabModule {
}
