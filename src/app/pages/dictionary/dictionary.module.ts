import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DictionaryRoutingModule} from './dictionary-routing.module';
import {StageStandardDictionaryComponent} from './stage-standard-dictionary/stage-standard-dictionary.component';
import {TranslateModule} from '@ngx-translate/core';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {StageDictionaryComponent} from './stage-dictionary/stage-dictionary.component';
import {EditStageComponent} from './component/edit-stage/edit-stage.component';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';
import {StageTypeDictionaryComponent} from './stage-type-dictionary/stage-type-dictionary.component';
import {EditStageTypeComponent} from './component/edit-stage-type/edit-stage-type.component';
import {SportTypeDictionaryComponent} from './sport-type-dictionary/sport-type-dictionary.component';
import {StagePersonsComponent} from './component/stage-persons/stage-persons.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DictionaryRoutingModule,
    InputSelectModule,
    DxSelectBoxModule,
    BusyButtonModule,
    NgxGridModule,
    NgxModalModule,
    DxTextBoxModule,
    DxValidatorModule
  ],
  declarations: [
    DictionariesComponent,
    StageStandardDictionaryComponent,
    StageDictionaryComponent,
    EditStageComponent,
    StageTypeDictionaryComponent,
    EditStageTypeComponent,
    SportTypeDictionaryComponent,
    StagePersonsComponent
  ],
  entryComponents: [
    EditStageComponent,
    EditStageTypeComponent,
    StagePersonsComponent
  ]
})
export class DictionaryModule {
}
