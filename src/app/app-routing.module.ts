import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LayoutService } from './layout/shared/layout.service';
import { AuthDenyGuard } from './guard/auth-deny.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: './pages/login-page/login-page.module#LoginPageModule',
    canActivate: [AuthDenyGuard]
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
    path: 'password',
    loadChildren: './pages/password-page/password-page.module#PasswordPageModule',
    canActivate: [AuthDenyGuard]
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
