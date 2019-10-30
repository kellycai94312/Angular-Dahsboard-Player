import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';
import { NgxDateModule } from 'app/module/ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from 'app/module/ngx/ngx-input';
import { NgxSelectModule } from 'app/module/ngx/ngx-select/ngx-select.module';
import { EditGroupPersonClaimStateComponent } from './edit-group-person-claim-state/edit-group-person-claim-state.component';

@NgModule({
  declarations: [EditGroupPersonClaimStateComponent],
  entryComponents: [EditGroupPersonClaimStateComponent],
  exports: [EditGroupPersonClaimStateComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxDateModule,
    NgxSelectModule
  ]
})
export class EditGroupPersonClaimStateModule {
}
