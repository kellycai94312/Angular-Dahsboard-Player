import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {LayoutService} from './layout/shared/layout.service';
import {AuthDenyGuard} from './guard/auth-deny.guard';
import {BreadcrumbItem} from './components/ngx-breadcrumb/bean/breadcrumb-item';

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
    path: 'event',
    loadChildren: './pages/event/event.module#EventModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'event-plan',
    loadChildren: './pages/event-plan/event-plan.module#EventPlanModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'notification',
    loadChildren: './pages/notification/notification.module#NotificationModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'registration',
    loadChildren: './pages/registration-page/registration-page.module#RegistrationPageModule'
  },
  {
    path: 'person',
    loadChildren: './pages/person-page/person-page.module#PersonPageModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'group',
    loadChildren: './pages/groups/group-page.module#GroupPageModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'connection',
    loadChildren: './pages/connection/connection.module#ConnectionModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'conversation',
    loadChildren: './pages/conversation/conversation.module#ConversationModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'report',
    loadChildren: './pages/report/report.module#ReportModule',
    canActivate: [AuthGuard, LayoutService]
  },
  {
    path: 'dictionary',
    loadChildren: './pages/dictionary/dictionary.module#DictionaryModule',
    canActivate: [AuthGuard, LayoutService],
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
    canActivate: [AuthGuard, LayoutService],
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
