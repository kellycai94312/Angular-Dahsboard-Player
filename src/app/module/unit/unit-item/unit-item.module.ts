import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitItemComponent} from './unit-item/unit-item.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [UnitItemComponent],
  entryComponents: [UnitItemComponent],
  exports: [UnitItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class UnitItemModule {
}
