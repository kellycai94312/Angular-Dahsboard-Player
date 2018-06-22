import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxVirtualScrollComponent} from './ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxScrollModule} from './ngx-scroll/ngx-scroll.module';
import {NgxScrollDirective} from './ngx-scroll/ngx-scroll.directive';
import {BusyIndicatorModule} from '../busy-indicator/busy-indicator.module';

@NgModule({
  imports: [
    CommonModule,
    NgxScrollModule,
    BusyIndicatorModule
  ],
  declarations: [NgxVirtualScrollComponent],
  exports: [NgxVirtualScrollComponent, NgxScrollDirective]
})
export class NgxVirtualScrollModule {
}
