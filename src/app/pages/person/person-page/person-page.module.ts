import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonPageComponent} from './person-page/person-page.component';
import {PersonPageRoutingModule} from './person-page-routing.module';
import {PersonService} from './service/person.service';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {NgxTabModule} from '../../../components/ngx-tab/ngx-tab.module';
import {GroupModule} from '../../../components/group/group.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSplitButtonModule} from '../../../components/ngx-split-button/ngx-split-button.module';
import {NgxButtonGroupModule} from '../../../components/ngx-button-group/ngx-button-group.module';
import {GroupItemModule} from '../../../module/group/group-item/group-item.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';

@NgModule({
  imports: [
    CommonModule,
    PersonPageRoutingModule,
    TranslateModule.forChild(),
    NgxButtonModule,
    NgxTabModule,
    NgxSplitButtonModule,
    NgxButtonGroupModule,
    NgxImageModule,
    GroupModule,
    GroupItemModule
  ],
  declarations: [PersonPageComponent],
  providers: [PersonService]
})
export class PersonPageModule {
}
