import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactPageRoutingModule} from './contact-page-routing.module';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxButtonModule} from '../../../../../components/ngx-button/ngx-button.module';
import {PersonActivationModule} from '../../../../../module/person/person-activation/person-activation.module';
import {NgxModalModule} from '../../../../../components/ngx-modal/ngx-modal.module';
import {NgxInputModule} from '../../../../../module/ngx/ngx-input/ngx-input.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ContactPageRoutingModule,
    MatCheckboxModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxButtonModule,
    NgxModalModule,
    PersonActivationModule,
    FormsModule
  ],
  declarations: [ContactPageComponent]
})
export class ContactPageModule {
}
