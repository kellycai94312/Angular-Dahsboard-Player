import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxVirtualScrollComponent} from './ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxScrollModule} from './ngx-scroll/ngx-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    NgxScrollModule
  ],
  declarations: [NgxVirtualScrollComponent],
  exports: [NgxVirtualScrollComponent]
})
export class NgxVirtualScrollModule {
}
