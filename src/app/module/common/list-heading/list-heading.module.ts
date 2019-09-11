import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListHeadingComponent} from './list-heading/list-heading.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ListHeadingService} from './services/list-heading.service';

@NgModule({
  declarations: [ListHeadingComponent],
  providers: [ListHeadingService],
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
