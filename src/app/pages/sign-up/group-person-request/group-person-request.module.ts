import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { GroupPersonRequestModule as GroupPersonRequest } from 'app/module/group/group-person-request/group-person-request.module';
import { GroupPersonRequestRoutingModule } from './group-person-request-routing.module';
import { GroupPersonRequestComponent } from './group-person-request/group-person-request.component';

@NgModule({
  declarations: [GroupPersonRequestComponent],
  imports: [
    CommonModule,
    GroupPersonRequestRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    GroupPersonRequest
  ]
})
export class GroupPersonRequestModule {
}
