import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonItemComponent} from './person-item/person-item.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    NgxImageModule,
    TranslateModule.forChild()
  ],
  declarations: [PersonItemComponent],
  entryComponents: [PersonItemComponent],
  exports: [PersonItemComponent]
})
export class PersonItemModule {
}
