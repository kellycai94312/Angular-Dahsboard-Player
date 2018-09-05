import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsPageComponent} from './page/statistics-page/statistics-page.component';
import {SportTypeStatisticsPageComponent} from './page/sport-type-statistics-page/sport-type-statistics-page.component';

const routes: Routes = [
  {path: '', component: StatisticsPageComponent},
  {path: 'sport-type', component: SportTypeStatisticsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
