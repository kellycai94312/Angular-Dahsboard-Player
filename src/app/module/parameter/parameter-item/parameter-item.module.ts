import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParameterItemComponent} from './parameter-item/parameter-item.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ParameterItemComponent],
  exports: [ParameterItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class ParameterItemModule {
}
