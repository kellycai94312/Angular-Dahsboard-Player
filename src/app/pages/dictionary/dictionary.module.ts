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
import {PersonModule} from '../../components/person/person.module';
import {EditStageStandardComponent} from './component/edit-stage-standard/edit-stage-standard.component';
import {OperatorValueModule} from '../../components/operator-value/operator-value.module';
import {OrganizationsDictionaryComponent} from './organizations-dictionary/organizations-dictionary.component';
import {OrganizationDictionaryComponent} from './organization-dictionary/organization-dictionary.component';
import {EditOrganizationComponent} from './component/edit-organization/edit-organization.component';
import {GroupPageModule} from '../groups/group-page.module';
import {NamedObjectModule} from '../../components/named-object/named-object.module';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {NamedObjectItemModule} from '../../components/named-object-item/named-object-item.module';
import {PersonComponent} from '../../components/person/person.component';
import {ExercisesDictionaryComponent} from './exercises-dictionary/exercises-dictionary.component';
import {TestsDictionaryComponent} from './tests-dictionary/tests-dictionary.component';
import {ActivitiesComponent} from './component/activities/activities.component';
import {ActivityComponent} from './component/activity/activity.component';
import {ActivityItemComponent} from './component/activity-item/activity-item.component';
import {ImageModule} from '../../components/image/image.module';
import {NgxTextBoxModule} from '../../components/ngx-text-box/ngx-text-box.module';
import {EditActivityComponent} from './component/edit-activity/edit-activity.component';
import {NgxSplitButtonModule} from '../../components/ngx-split-button/ngx-split-button.module';
import {NgxSelectionModule} from '../../components/ngx-selection/ngx-selection.module';

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
    OperatorValueModule,
    GroupPageModule,
    NamedObjectModule,
    NamedObjectItemModule,
    ModalSelectPageModule,
    ImageModule,
    NgxTextBoxModule,
    NgxSplitButtonModule,
    NgxSelectionModule
  ],
  declarations: [
    DictionariesComponent,
    StageStandardDictionaryComponent,
    StageDictionaryComponent,
    EditStageComponent,
    StageTypeDictionaryComponent,
    EditStageTypeComponent,
    SportTypeDictionaryComponent,
    EditStageStandardComponent,
    OrganizationsDictionaryComponent,
    OrganizationDictionaryComponent,
    EditOrganizationComponent,
    ExercisesDictionaryComponent,
    TestsDictionaryComponent,
    ActivitiesComponent,
    ActivityComponent,
    ActivityItemComponent,
    EditActivityComponent
  ],
  entryComponents: [
    EditStageComponent,
    EditStageTypeComponent,
    EditStageStandardComponent,
    EditOrganizationComponent,
    PersonComponent,
    EditActivityComponent
  ]
})
export class DictionaryModule {
}
