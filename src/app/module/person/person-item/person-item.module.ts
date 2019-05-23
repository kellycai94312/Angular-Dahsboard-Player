import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonItemComponent} from './person-item/person-item.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NgxImageModule,
    NgxButtonModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [PersonItemComponent],
  entryComponents: [PersonItemComponent],
  exports: [PersonItemComponent]
})
export class PersonItemModule {
}
