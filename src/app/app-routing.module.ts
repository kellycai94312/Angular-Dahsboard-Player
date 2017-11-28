import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutService } from './layout/layout.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: './pages/login-page/login-page.module#LoginPageModule' },
  { path: 'registration', loadChildren: './pages/registration-page/registration-page.module#RegistrationPageModule' },
  { path: 'person', loadChildren: './pages/person-page/person-page.module#PersonPageModule' },

  { path: 'not-found', loadChildren: './pages/not-found-page/not-found-page.module#NotFoundPageModule' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

for (const route of routes) {
  route.canActivate = [LayoutService];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
