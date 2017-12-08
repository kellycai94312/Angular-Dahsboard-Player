import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleComponent } from './locale.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [LocaleComponent],
  exports: [LocaleComponent],
})
export class LocaleModule {
}
