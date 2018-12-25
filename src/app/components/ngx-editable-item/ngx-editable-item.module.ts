import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEditableItemComponent} from './ngx-editable-item/ngx-editable-item.component';
import {NgxComponentFactoryModule} from '../ngx-component-factory/ngx-component-factory.module';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    NgxComponentFactoryModule,
    NgxButtonModule
  ],
  declarations: [NgxEditableItemComponent],
  exports: [NgxEditableItemComponent],
  entryComponents: [NgxEditableItemComponent]
})
export class NgxEditableItemModule {
}
