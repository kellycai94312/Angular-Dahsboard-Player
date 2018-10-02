import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxButtonComponent} from './ngx-button/ngx-button.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxButtonComponent],
  exports: [NgxButtonComponent]
})
export class NgxButtonModule {
}
