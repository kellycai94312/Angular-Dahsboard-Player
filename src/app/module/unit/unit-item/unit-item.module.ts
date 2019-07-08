import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitItemComponent} from './unit-item/unit-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';

@NgModule({
  declarations: [UnitItemComponent],
  entryComponents: [UnitItemComponent],
  exports: [UnitItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class UnitItemModule {
}
