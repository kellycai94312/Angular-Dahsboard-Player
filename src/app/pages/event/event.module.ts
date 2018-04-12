import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPageComponent} from './event-page/event-page.component';
import {EventsPageComponent} from './events-page/events-page.component';
import {EventRoutingModule} from './event-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteListModule} from '../../components/infinite-list/infinite-list.module';
import {FormsModule} from '@angular/forms';
import {GameStepBasePageComponent} from './event-page/game/steps/game-step-base-page/game-step-base-page.component';
import {GameStepPersonsPageComponent} from './event-page/game/steps/game-step-persons-page/game-step-persons-page.component';
import {GameStepExecutionPageComponent} from './event-page/game/steps/game-step-execution-page/game-step-execution-page.component';
import {GameStepsManagerPageComponent} from './event-page/game/steps/game-steps-manager-page/game-steps-manager-page.component';
import {TabModule} from '../../components/tab/tab.module';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxValidatorModule
} from 'devextreme-angular';
import {ModalSelectPageComponent} from '../../components/modal-select-page/modal-select-page.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {NamedObjectItemModule} from '../../components/named-object-item/named-object-item.module';
import {NamedObjectItemComponent} from '../../components/named-object-item/named-object-item.component';
import {TrainingPersonsSelectionModule} from '../../components/training-persons-selection/training-persons-selection.module';
import {TrainingPersonModule} from '../../components/training-person/training-person.module';
import { InputSelectModule } from "../../components/input-select/input-select.module";

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    TranslateModule.forChild(),
    InfiniteListModule,
    FormsModule,
    TabModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxNumberBoxModule,
    ModalSelectPageModule,
    NamedObjectItemModule,
    TrainingPersonModule,
    TrainingPersonsSelectionModule,
    InputSelectModule
  ],
  declarations: [
    EventPageComponent,
    EventsPageComponent,
    GameStepBasePageComponent,
    GameStepPersonsPageComponent,
    GameStepExecutionPageComponent,
    GameStepsManagerPageComponent
  ],
  entryComponents: [
    ModalSelectPageComponent,
    NamedObjectItemComponent
  ]
})
export class EventModule {
}
