import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsPageComponent} from './events-page/events-page.component';
import {EventPageComponent} from './event-page/event-page.component';
import {GameStepBasePageComponent} from './event-page/game/steps/game-step-base-page/game-step-base-page.component';
import {GameStepPersonsPageComponent} from './event-page/game/steps/game-step-persons-page/game-step-persons-page.component';
import {GameStepsManagerPageComponent} from './event-page/game/steps/game-steps-manager-page/game-steps-manager-page.component';
import {GameStepExecutionPageComponent} from './event-page/game/steps/game-step-execution-page/game-step-execution-page.component';
import {EventsListComponent} from './events-page/events-list/events-list.component';
import {EventsCalendarComponent} from './events-page/events-calendar/events-calendar.component';
import {GeneralTestingStepComponent} from './event-page/testing/step/general-testing-step/general-testing-step.component';
import {TestingStepsManagerComponent} from './event-page/testing/step/testing-steps-manager/testing-steps-manager.component';
import {CanDeactivateGuard} from '../../guard/can-deactivate.guard';

const routes: Routes = [
  {
    path: '', component: EventsPageComponent,
    children: [
      {path: '', redirectTo: 'calendar', pathMatch: 'full'},
      {path: 'calendar', component: EventsCalendarComponent},
      {path: 'list', component: EventsListComponent}
    ]
  },
  {
    path: ':id', component: EventPageComponent,
    children: [
      {path: '', redirectTo: 'game/step', pathMatch: 'full'},
      {path: 'game', redirectTo: 'game/step', pathMatch: 'full'},
      {
        path: 'game/step', component: GameStepsManagerPageComponent,
        children: [
          {path: '', redirectTo: '1', pathMatch: 'full'},
          {path: '1', component: GameStepBasePageComponent},
          {path: '2', component: GameStepPersonsPageComponent},
          {path: '3', component: GameStepExecutionPageComponent}
        ]
      },
      {path: 'testing', redirectTo: 'testing/step', pathMatch: 'full'},
      {
        path: 'testing/step', component: TestingStepsManagerComponent,
        children: [
          {path: '', redirectTo: '1', pathMatch: 'full'},
          {path: '1', component: GeneralTestingStepComponent, canDeactivate: [CanDeactivateGuard]}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
