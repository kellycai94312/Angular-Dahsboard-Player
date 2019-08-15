import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VerticalCardComponent} from './vertical-card/vertical-card.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [VerticalCardComponent],
  exports: [VerticalCardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    NgxImageModule
  ]
})
export class VerticalCardModule {
}
