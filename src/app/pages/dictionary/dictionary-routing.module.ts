import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {BreadcrumbItem} from '../../components/ngx-breadcrumb/bean/breadcrumb-item';
import {TestsDictionaryComponent} from './tests-dictionary/tests-dictionary.component';
import {ActivityComponent} from './component/activity/activity.component';
import {ExercisesDictionaryComponent} from './exercises-dictionary/exercises-dictionary.component';

const routes: Routes = [
  {
    path: '', component: DictionariesComponent,
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
