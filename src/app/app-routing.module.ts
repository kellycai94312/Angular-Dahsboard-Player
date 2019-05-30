import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {AuthDenyGuard} from './guard/auth-deny.guard';
import {BreadcrumbItem} from './components/ngx-breadcrumb/bean/breadcrumb-item';
import {DeactivateGuard} from './guard/deactivate/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: './pages/sign-in/sign-in.module#SignInModule',
    canActivate: [AuthDenyGuard]
  },
  {
    path: 'sign-up',
    loadChildren: './pages/sign-up/sign-up.module#SignUpModule'
  },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'event',
    loadChildren: './pages/events/events.module#EventsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'event-plan',
    loadChildren: './pages/event-plan/event-plan.module#EventPlanModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: './pages/notification/notification.module#NotificationModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'person',
    loadChildren: './pages/person/base-person-page.module#BasePersonPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'group',
    loadChildren: './pages/group/base-group-page.module#BaseGroupPageModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'connection',
  //   loadChildren: './pages/connection/connection.module#ConnectionModule',
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'conversation',
    loadChildren: './pages/conversation/base-conversation-page.module#BaseConversationPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    loadChildren: './pages/report/report.module#ReportModule',
    canActivate: [AuthGuard, DeactivateGuard]
  },
  {
    path: 'dictionary',
    loadChildren: './pages/dictionary/dictionary.module#DictionaryModule',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {nameKey: 'dictionaries'} as BreadcrumbItem
    }
  },
  {
    path: 'password',
    loadChildren: './pages/password-page/password-page.module#PasswordPageModule',
    canActivate: [AuthDenyGuard]
  },
  {
    path: 'statistics',
    loadChildren: './pages/statistics/statistics.module#StatisticsModule',
    canActivate: [AuthGuard, DeactivateGuard],
    data: {
      breadcrumb: {nameKey: 'statistics'} as BreadcrumbItem
    }
  },
  {
    path: 'not-found',
    loadChildren: './pages/not-found-page/not-found-page.module#NotFoundPageModule'
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
