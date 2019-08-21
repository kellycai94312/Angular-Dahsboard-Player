import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuPersonDetailComponent} from './menu-person-detail/menu-person-detail.component';
import {MatListModule, MatRippleModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [MenuPersonDetailComponent],
  exports: [MenuPersonDetailComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatRippleModule,
    TranslateModule.forChild()
  ]
})
export class MenuPersonDetailModule {
}
