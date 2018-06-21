import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxVirtualScrollComponent} from './ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxScrollModule} from './ngx-scroll/ngx-scroll.module';
import {NgxScrollDirective} from './ngx-scroll/ngx-scroll.directive';

@NgModule({
  imports: [
    CommonModule,
    NgxScrollModule
  ],
  declarations: [NgxVirtualScrollComponent],
  exports: [NgxVirtualScrollComponent, NgxScrollDirective]
})
export class NgxVirtualScrollModule {
}
