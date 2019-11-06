import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTabsModule } from 'app/module/ngx/ngx-tabs/ngx-tabs.module';

import { GroupEmailRoutingModule } from './group-email-routing.module';
import { GroupEmailComponent } from './group-email/group-email.component';

@NgModule({
  declarations: [GroupEmailComponent],
  imports: [
    CommonModule,
    GroupEmailRoutingModule,
    NgxTabsModule
  ]
})
export class GroupEmailModule {
}
