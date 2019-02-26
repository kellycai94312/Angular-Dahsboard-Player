import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxButtonComponent} from './ngx-button/ngx-button.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatIconModule
  ],
  declarations: [NgxButtonComponent],
  exports: [NgxButtonComponent]
})
export class NgxButtonModule {
}
