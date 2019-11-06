import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxGridModule } from 'app/components/ngx-grid/ngx-grid.module';

import { IndividualGroupClaimRoutingModule } from './individual-group-claim-routing.module';
import { IndividualGroupClaimComponent } from './individual-group-claim/individual-group-claim.component';

@NgModule({
  declarations: [IndividualGroupClaimComponent],
  imports: [
    CommonModule,
    IndividualGroupClaimRoutingModule,
    NgxGridModule
  ]
})
export class IndividualGroupClaimModule {
}
