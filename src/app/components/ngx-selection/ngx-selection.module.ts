import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxSelectionComponent} from './ngx-selection/ngx-selection.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxVirtualScrollModule} from '../ngx-virtual-scroll/ngx-virtual-scroll.module';
import {NgxComponentFactoryModule} from '../ngx-component-factory/ngx-component-factory.module';
import {NgxInputModule} from '../ngx-input/ngx-input.module';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxVirtualScrollModule,
    NgxComponentFactoryModule,
    NgxButtonModule
  ],
  declarations: [NgxSelectionComponent],
  exports: [NgxSelectionComponent],
  entryComponents: [NgxSelectionComponent]
})
export class NgxSelectionModule {
}
