import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTreeComponent} from './ngx-tree/ngx-tree.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressBarModule, MatTreeModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [NgxTreeComponent],
  exports: [NgxTreeComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressBarModule,
    FlexLayoutModule
  ]
})
export class NgxTreeModule {
}
