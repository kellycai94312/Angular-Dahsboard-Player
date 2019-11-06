import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxGridModule } from 'app/components/ngx-grid/ngx-grid.module';

import { LegalEntityGroupClaimRoutingModule } from './legal-entity-group-claim-routing.module';
import { LegalEntityGroupClaimComponent } from './legal-entity-group-claim/legal-entity-group-claim.component';

@NgModule({
  declarations: [LegalEntityGroupClaimComponent],
  imports: [
    CommonModule,
    LegalEntityGroupClaimRoutingModule,
    NgxGridModule
  ]
})
export class LegalEntityGroupClaimModule {
}
