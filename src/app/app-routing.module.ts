import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', loadChildren: './pages/login-page/login-page.module#LoginPageModule' },
  { path: 'registration', loadChildren: './pages/registration-page/registration-page.module#RegistrationPageModule' },  

  { path: 'not-found', loadChildren: './pages/not-found-page/not-found-page.module#NotFoundPageModule' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
