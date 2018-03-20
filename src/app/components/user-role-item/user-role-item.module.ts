import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleItemComponent } from './user-role-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [UserRoleItemComponent],
  declarations: [UserRoleItemComponent],
  entryComponents: [UserRoleItemComponent]
})
export class UserRoleItemModule {
}
