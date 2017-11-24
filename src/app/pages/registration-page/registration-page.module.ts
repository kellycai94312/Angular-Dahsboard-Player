import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationPageRoutingModule } from './registration-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationPageRoutingModule
  ],
  declarations: [RegistrationPageComponent]
})
export class RegistrationPageModule { }