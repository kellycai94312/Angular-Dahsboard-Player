import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupItemComponent} from './group-item/group-item.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    NgxImageModule,
    TranslateModule.forChild(),
    FlexLayoutModule
  ],
  declarations: [GroupItemComponent],
  entryComponents: [GroupItemComponent],
  exports: [GroupItemComponent]
})
export class GroupItemModule {
}
