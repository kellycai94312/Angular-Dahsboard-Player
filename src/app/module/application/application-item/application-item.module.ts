import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationItemComponent} from './application-item/application-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';
import {ApplicationWindowService} from '../../../services/windows/application-window/application-window.service';

@NgModule({
  declarations: [ApplicationItemComponent],
  entryComponents: [ApplicationItemComponent],
  providers: [ApplicationWindowService],
  exports: [ApplicationItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class ApplicationItemModule {
}
