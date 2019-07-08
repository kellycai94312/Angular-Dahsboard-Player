import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseCardComponent} from './base-card/base-card.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatRippleModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [BaseCardComponent],
  exports: [BaseCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class BaseCardModule {
}
