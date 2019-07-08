import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParameterItemComponent} from './parameter-item/parameter-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';

@NgModule({
  declarations: [ParameterItemComponent],
  entryComponents: [ParameterItemComponent],
  exports: [ParameterItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class ParameterItemModule {
}
