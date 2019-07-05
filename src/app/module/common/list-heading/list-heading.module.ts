import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListHeadingComponent} from './list-heading/list-heading.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [ListHeadingComponent],
  exports: [ListHeadingComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ]
})
export class ListHeadingModule {
}
