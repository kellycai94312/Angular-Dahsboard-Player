import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteListComponent } from './infinite-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  declarations: [InfiniteListComponent],
  exports: [InfiniteListComponent]
})
export class InfiniteListModule {
}
