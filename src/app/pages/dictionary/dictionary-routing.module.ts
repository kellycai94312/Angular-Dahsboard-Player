import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {StageStandardDictionaryComponent} from './stage-standard-dictionary/stage-standard-dictionary.component';
import {StageDictionaryComponent} from './stage-dictionary/stage-dictionary.component';
import {StageTypeDictionaryComponent} from './stage-type-dictionary/stage-type-dictionary.component';
import {SportTypeDictionaryComponent} from './sport-type-dictionary/sport-type-dictionary.component';
import {BreadcrumbItem} from '../../components/ngx-breadcrumb/bean/breadcrumb-item';
import {OrganizationsDictionaryComponent} from './organizations-dictionary/organizations-dictionary.component';
import {OrganizationDictionaryComponent} from './organization-dictionary/organization-dictionary.component';
import {TestsDictionaryComponent} from './tests-dictionary/tests-dictionary.component';
import {ActivityComponent} from './component/activity/activity.component';
import {ExercisesDictionaryComponent} from './exercises-dictionary/exercises-dictionary.component';

const routes: Routes = [
  {
    path: '', component: DictionariesComponent,
  },
  {
    path: 'stage-standard', component: StageStandardDictionaryComponent,
    data: {
      breadcrumb: {nameKey: 'controlTransferStandards'} as BreadcrumbItem
    }
  },
  {
    path: 'stage', component: StageDictionaryComponent,
    data: {
      breadcrumb: {nameKey: 'sportsTrainingStage'} as BreadcrumbItem
    }
  },
  {
    path: 'stage-type', component: StageTypeDictionaryComponent,
    data: {
      breadcrumb: {nameKey: 'stageType'} as BreadcrumbItem
    }
  },
  {
    path: 'sport-type', component: SportTypeDictionaryComponent,
    data: {
      breadcrumb: {nameKey: 'sportType'} as BreadcrumbItem
    }
  },
  {
    path: 'organization',
    data: {
      breadcrumb: {nameKey: 'organizations'} as BreadcrumbItem
    },
    children: [
      {path: '', component: OrganizationsDictionaryComponent},
      {
        path: ':id', component: OrganizationDictionaryComponent,
        data: {
          breadcrumb: {} as BreadcrumbItem
        }
      },
    ]
  },
  {
    path: 'exercise',
    data: {
      breadcrumb: {nameKey: 'exercises'} as BreadcrumbItem
    },
    children: [
      {path: '', component: ExercisesDictionaryComponent},
      {
        path: ':id', component: ActivityComponent,
        data: {
          breadcrumb: {} as BreadcrumbItem
        }
      }
    ]
  },
  {
    path: 'test',
    data: {
      breadcrumb: {nameKey: 'tests'} as BreadcrumbItem
    },
    children: [
      {path: '', component: TestsDictionaryComponent},
      {
        path: ':id', component: ActivityComponent,
        data: {
          breadcrumb: {} as BreadcrumbItem
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule {
}
