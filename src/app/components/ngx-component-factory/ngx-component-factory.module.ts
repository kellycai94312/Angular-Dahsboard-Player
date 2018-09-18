import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxComponentFactoryComponent} from './ngx-component-factory/ngx-component-factory.component';
import {RefModule} from '../../directives/ref/ref.module';

@NgModule({
  imports: [
    CommonModule,
    RefModule
  ],
  declarations: [NgxComponentFactoryComponent],
  exports: [NgxComponentFactoryComponent],
  entryComponents: [NgxComponentFactoryComponent]
})
export class NgxComponentFactoryModule {
}
