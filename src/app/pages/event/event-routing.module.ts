import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsPageComponent} from './events-page/events-page.component';
import {EventPageComponent} from './event-page/event-page.component';
import {GameStepBasePageComponent} from './event-page/game/steps/game-step-base-page/game-step-base-page.component';
import {GameStepPersonsPageComponent} from './event-page/game/steps/game-step-persons-page/game-step-persons-page.component';
import {GameStepsManagerPageComponent} from './event-page/game/steps/game-steps-manager-page/game-steps-manager-page.component';
import {GameStepExecutionPageComponent} from './event-page/game/steps/game-step-execution-page/game-step-execution-page.component';

const routes: Routes = [
  {path: '', component: EventsPageComponent},
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
