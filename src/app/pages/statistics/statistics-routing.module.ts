import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsPageComponent} from './page/statistics-page/statistics-page.component';
import {SportTypeStatisticsPageComponent} from './page/sport-type-statistics-page/sport-type-statistics-page.component';
import {BreadcrumbItem} from '../../components/ngx-breadcrumb/bean/breadcrumb-item';
import {StagePersonsComponent} from './component/stage-persons/stage-persons.component';
import {StagePersonRanksComponent} from './component/stage-person-ranks/stage-person-ranks.component';

const stagePersonsBreadcrumbItem = new BreadcrumbItem();

const routes: Routes = [
  {path: '', component: StatisticsPageComponent},
  {
    path: 'sport-type',
    data: {
      breadcrumb: {nameKey: 'sportType'} as BreadcrumbItem
    },
    children: [
      {
        path: '', component: SportTypeStatisticsPageComponent
      },
      {
        path: ':id/stage',
        data: {
          breadcrumb: stagePersonsBreadcrumbItem
        },
        children: [
          {
            path: '',
            component: StagePersonsComponent,
            data: {
              breadcrumb: stagePersonsBreadcrumbItem
            }
          },
          {
            path: ':id/person', component: StagePersonRanksComponent,
            data: {
              breadcrumb: {} as BreadcrumbItem
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
