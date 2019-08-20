import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonHeadComponent} from './person-head/person-head.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
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
    TranslateModule.forChild(),
    NgxImageModule
  ]
})
export class PersonHeadModule {
}
