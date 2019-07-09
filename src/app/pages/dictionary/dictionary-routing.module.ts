import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {StageStandardDictionaryComponent} from './stage-standard-dictionary/stage-standard-dictionary.component';
import {StageDictionaryComponent} from './stage-dictionary/stage-dictionary.component';
import {StageTypeDictionaryComponent} from './stage-type-dictionary/stage-type-dictionary.component';
import {BreadcrumbItem} from '../../components/ngx-breadcrumb/bean/breadcrumb-item';
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
    path: 'sport-type', loadChildren: './sport-types/sport-types.module#SportTypesModule',
    data: {
      breadcrumb: {nameKey: 'sportType'} as BreadcrumbItem
    }
  },
  {
    path: 'parameter', loadChildren: './parameters/parameters.module#ParametersModule',
    data: {
      breadcrumb: {nameKey: 'parameter'} as BreadcrumbItem
    }
  },
  {
    path: 'unit', loadChildren: './units/units.module#UnitsModule',
    data: {
      breadcrumb: {nameKey: 'unit'} as BreadcrumbItem
    }
  },
  {
    path: 'device', loadChildren: './devices/devices.module#DevicesModule',
    data: {
      breadcrumb: {nameKey: 'device'} as BreadcrumbItem
    }
  },
  {
    path: 'application', loadChildren: './applications/applications.module#ApplicationsModule',
    data: {
      breadcrumb: {nameKey: 'application'} as BreadcrumbItem
    }
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
