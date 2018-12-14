import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonalPageRoutingModule} from './personal-page-routing.module';
import {PersonalPageComponent} from './personal-page/personal-page.component';
import {DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {InputSelectModule} from '../../../../../components/input-select/input-select.module';
import {NgxButtonModule} from '../../../../../components/ngx-button/ngx-button.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PersonalPageRoutingModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxValidatorModule,
    InputSelectModule,
    NgxButtonModule
  ],
  declarations: [PersonalPageComponent]
})
export class PersonalPageModule {
}
