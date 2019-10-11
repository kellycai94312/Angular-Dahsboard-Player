import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBusyModule } from 'app/directives/ngx-busy/ngx-busy.module';
import { NgxScrollDirective } from './ngx-scroll/ngx-scroll.directive';
import { NgxScrollModule } from './ngx-scroll/ngx-scroll.module';
import { NgxVirtualScrollComponent } from './ngx-virtual-scroll/ngx-virtual-scroll.component';

@NgModule({
  declarations: [NgxVirtualScrollComponent],
  exports: [
    NgxVirtualScrollComponent,
    NgxScrollDirective
  ],
  imports: [
    CommonModule,
    NgxScrollModule,
    NgxBusyModule
  ]
})
export class NgxVirtualScrollModule {
}
