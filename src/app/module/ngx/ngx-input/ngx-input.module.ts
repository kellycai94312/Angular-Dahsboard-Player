import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxInputComponent} from './ngx-input/ngx-input.component';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [NgxInputComponent],
  exports: [NgxInputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class NgxInputModule {
}
