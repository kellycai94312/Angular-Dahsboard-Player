import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTreeComponent} from './ngx-tree/ngx-tree.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatTreeModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxBusyModule} from '../../../directives/ngx-busy/ngx-busy.module';

@NgModule({
  declarations: [NgxTreeComponent],
  exports: [NgxTreeComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FlexLayoutModule,
    NgxBusyModule
  ]
})
export class NgxTreeModule {
}
