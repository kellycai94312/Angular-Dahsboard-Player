import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NamedObjectItemComponent} from './named-object-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NamedObjectItemComponent],
  exports: [NamedObjectItemComponent],
  entryComponents: [NamedObjectItemComponent]
})
export class NamedObjectItemModule {
}
