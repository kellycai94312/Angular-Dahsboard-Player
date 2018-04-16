import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from './tab.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { ButtonsModule } from "../buttons/buttons.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
    FormsModule,
    ButtonsModule
  ],
  declarations: [TabComponent],
  exports: [TabComponent]
})
export class TabModule {
}
