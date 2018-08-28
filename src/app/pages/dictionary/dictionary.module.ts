import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DictionaryRoutingModule} from './dictionary-routing.module';
import {StageStandardDictionaryComponent} from './stage-standard-dictionary/stage-standard-dictionary.component';
import {TranslateModule} from '@ngx-translate/core';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {DxSelectBoxModule} from 'devextreme-angular';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {StageDictionaryComponent} from './stage-dictionary/stage-dictionary.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DictionaryRoutingModule,
    InputSelectModule,
    DxSelectBoxModule,
    BusyButtonModule,
    NgxGridModule
  ],
  declarations: [DictionariesComponent, StageStandardDictionaryComponent, StageDictionaryComponent]
})
export class DictionaryModule {
}
