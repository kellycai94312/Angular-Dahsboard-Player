import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDateModule } from 'app/module/ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from 'app/module/ngx/ngx-input';
import { NgxSelectModule } from 'app/module/ngx/ngx-select/ngx-select.module';
import { GroupPersonRequestComponent } from './group-person-request/group-person-request.component';

@NgModule({
  declarations: [GroupPersonRequestComponent],
  entryComponents: [GroupPersonRequestComponent],
  exports: [GroupPersonRequestComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxDateModule,
    NgxSelectModule
  ]
})
export class GroupPersonRequestModule {
}
