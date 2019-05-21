import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxComponentFactoryComponent} from './ngx-component-factory/ngx-component-factory.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxComponentFactoryComponent],
  exports: [NgxComponentFactoryComponent],
  entryComponents: [NgxComponentFactoryComponent]
})
export class NgxComponentFactoryModule {
}
