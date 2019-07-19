import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoCardComponent} from './logo-card/logo-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [LogoCardComponent],
  exports: [LogoCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class LogoCardModule {
}
