import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationItemComponent} from './application-item/application-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';

@NgModule({
  declarations: [ApplicationItemComponent],
  entryComponents: [ApplicationItemComponent],
  exports: [ApplicationItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class ApplicationItemModule {
}
