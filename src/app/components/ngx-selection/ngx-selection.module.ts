import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxSelectionComponent} from './ngx-selection/ngx-selection.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxTextBoxModule} from '../ngx-text-box/ngx-text-box.module';
import {NgxVirtualScrollModule} from '../ngx-virtual-scroll/ngx-virtual-scroll.module';
import {NgxComponentFactoryModule} from '../ngx-component-factory/ngx-component-factory.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxTextBoxModule,
    NgxVirtualScrollModule,
    NgxComponentFactoryModule
  ],
  declarations: [NgxSelectionComponent],
  exports: [NgxSelectionComponent],
  entryComponents: [NgxSelectionComponent]
})
export class NgxSelectionModule {
}
