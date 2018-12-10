import {NgModule} from '@angular/core';
import {GroupPageRoutingModule} from './group-page-routing.module';
import {GroupPageComponent} from './group-page/group-page.component';
import {ImageModule} from '../../../components/image/image.module';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {NgxTabModule} from '../../../components/ngx-tab/ngx-tab.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {GroupService} from './service/group.service';

@NgModule({
  imports: [
    CommonModule,
    GroupPageRoutingModule,
    TranslateModule.forChild(),
    ImageModule,
    NgxButtonModule,
    NgxTabModule
  ],
  declarations: [GroupPageComponent],
  providers: [GroupService]
})
export class GroupPageModule {
}
