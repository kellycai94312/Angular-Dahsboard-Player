import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SportTypeItemComponent} from './sport-type-item/sport-type-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';

@NgModule({
  declarations: [SportTypeItemComponent],
  exports: [SportTypeItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class SportTypeItemModule {
}
