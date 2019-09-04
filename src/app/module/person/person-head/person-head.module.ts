import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonHeadComponent} from './person-head/person-head.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PersonHeadComponent],
  exports: [PersonHeadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxImageModule
  ]
})
export class PersonHeadModule {
}
