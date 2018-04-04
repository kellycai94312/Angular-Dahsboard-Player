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

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    TranslateModule.forChild(),
    InfiniteListModule,
    FormsModule,
    TabModule
  ],
  declarations: [
    EventPageComponent,
    EventsPageComponent,
    GameStepBasePageComponent,
    GameStepPersonsPageComponent,
    GameStepExecutionPageComponent,
    GameStepsManagerPageComponent
  ]
})
export class EventModule {
}
