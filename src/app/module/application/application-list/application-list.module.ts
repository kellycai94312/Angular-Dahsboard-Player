import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationListComponent} from './application-list/application-list.component';
import {ItemListModule} from '../../common/item-list/item-list.module';
import {ApplicationItemModule} from '../application-item/application-item.module';
import {EditApplicationModule} from '../edit-application/edit-application.module';
import {ApplicationApiService} from '../../../data/remote/rest-api/api/application/application-api.service';
import {ApplicationWindowService} from '../../../services/windows/application-window/application-window.service';

@NgModule({
  declarations: [ApplicationListComponent],
  entryComponents: [ApplicationListComponent],
  providers: [
    ApplicationApiService,
    ApplicationWindowService
  ],
  exports: [ApplicationListComponent],
  imports: [
    CommonModule,
    ItemListModule,
    ApplicationItemModule,
    EditApplicationModule
  ]
})
export class ApplicationListModule {
}
