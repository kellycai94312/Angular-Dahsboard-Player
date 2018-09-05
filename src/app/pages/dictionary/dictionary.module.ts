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
import {StagePersonRanksComponent} from './component/stage-person-ranks/stage-person-ranks.component';
import {PersonModule} from '../../components/person/person.module';
import {EditStageStandardComponent} from './component/edit-stage-standard/edit-stage-standard.component';
import {OperatorValueModule} from '../../components/operator-value/operator-value.module';

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
    DxValidatorModule,
    PersonModule,
    OperatorValueModule
  ],
  declarations: [
    DictionariesComponent,
    StageStandardDictionaryComponent,
    StageDictionaryComponent,
    EditStageComponent,
    StageTypeDictionaryComponent,
    EditStageTypeComponent,
    SportTypeDictionaryComponent,
    StagePersonsComponent,
    StagePersonRanksComponent,
    EditStageStandardComponent
  ],
  entryComponents: [
    EditStageComponent,
    EditStageTypeComponent,
    StagePersonsComponent,
    StagePersonRanksComponent,
    EditStageStandardComponent
  ]
})
export class DictionaryModule {
}
