import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxGridModule } from 'app/components/ngx-grid/ngx-grid.module';
import { GroupPersonRequestModule } from 'app/module/group/group-person-request/group-person-request.module';

import { LegalEntityGroupClaimRoutingModule } from './legal-entity-group-claim-routing.module';
import { LegalEntityGroupClaimComponent } from './legal-entity-group-claim/legal-entity-group-claim.component';

@NgModule({
  declarations: [LegalEntityGroupClaimComponent],
  imports: [
    CommonModule,
    LegalEntityGroupClaimRoutingModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxGridModule,
    GroupPersonRequestModule
  ]
})
export class LegalEntityGroupClaimModule {
}
