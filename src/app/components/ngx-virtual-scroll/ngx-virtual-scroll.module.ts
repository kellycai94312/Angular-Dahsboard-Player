import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxVirtualScrollComponent} from './ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxScrollModule} from './ngx-scroll/ngx-scroll.module';
import {NgxScrollDirective} from './ngx-scroll/ngx-scroll.directive';
import {NgxBusyModule} from '../../directives/ngx-busy/ngx-busy.module';

@NgModule({
  imports: [
    CommonModule,
    NgxScrollModule,
    NgxBusyModule
  ],
  declarations: [NgxVirtualScrollComponent],
  exports: [NgxVirtualScrollComponent, NgxScrollDirective]
})
export class NgxVirtualScrollModule {
}
