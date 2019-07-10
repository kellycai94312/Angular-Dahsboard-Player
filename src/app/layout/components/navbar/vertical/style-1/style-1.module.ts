import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@angular/material';

import {FuseNavigationModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';

import {NavbarVerticalStyle1Component} from 'app/layout/components/navbar/vertical/style-1/style-1.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavbarVerticalStyle1Component
  ],
  imports: [
    MatButtonModule,
    MatIconModule,

    FuseSharedModule,
    FuseNavigationModule,

    TranslateModule.forChild(),
    RouterModule.forChild([])
  ],
  exports: [
    NavbarVerticalStyle1Component
  ]
})
export class NavbarVerticalStyle1Module {
}
