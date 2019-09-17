import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageModule } from '../../../components/ngx-image/ngx-image.module';
import { GroupHeadComponent } from './group-head/group-head.component';

@NgModule({
  declarations: [GroupHeadComponent],
  exports: [GroupHeadComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxImageModule
  ]
})
export class GroupHeadModule {
}
