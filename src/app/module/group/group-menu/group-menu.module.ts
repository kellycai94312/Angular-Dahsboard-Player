import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupMenuComponent} from './group-menu/group-menu.component';
import {FuseNavigationModule} from '../../../../@fuse/components';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [GroupMenuComponent],
  exports: [GroupMenuComponent],
  imports: [
    CommonModule,
    FuseNavigationModule,
    FlexLayoutModule
  ]
})
export class GroupMenuModule {
}
