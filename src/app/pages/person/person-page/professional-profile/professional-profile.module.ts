import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfessionalProfileRoutingModule} from './professional-profile-routing.module';
import {ProfessionalProfileComponent} from './professional-profile/professional-profile.component';

@NgModule({
  declarations: [ProfessionalProfileComponent],
  imports: [
    CommonModule,
    ProfessionalProfileRoutingModule
  ]
})
export class ProfessionalProfileModule {
}
