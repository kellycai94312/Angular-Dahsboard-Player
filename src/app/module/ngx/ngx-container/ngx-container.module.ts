import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxContainerComponent} from './ngx-container/ngx-container.component';
import {MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [NgxContainerComponent],
  exports: [NgxContainerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class NgxContainerModule {
}
