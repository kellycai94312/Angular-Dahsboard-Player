import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from './tab.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonsModule} from '../buttons/buttons.module';
import {BusyWrapperModule} from '../busy-wrapper/busy-wrapper.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
    ButtonsModule,
    BusyWrapperModule
  ],
  declarations: [TabComponent],
  exports: [TabComponent]
})
export class TabModule {
}
