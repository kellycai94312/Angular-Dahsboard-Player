import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactPageRoutingModule} from './contact-page-routing.module';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {DxCheckBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {NgxButtonModule} from '../../../../../components/ngx-button/ngx-button.module';
import {PersonActivationModule} from '../../../../../module/person/person-activation/person-activation.module';
import {NgxModalModule} from '../../../../../components/ngx-modal/ngx-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ContactPageRoutingModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxValidatorModule,
    DxCheckBoxModule,
    NgxButtonModule,
    NgxModalModule,
    PersonActivationModule
  ],
  declarations: [ContactPageComponent]
})
export class ContactPageModule {
}
