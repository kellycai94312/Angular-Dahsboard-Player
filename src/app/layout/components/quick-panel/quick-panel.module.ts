import {NgModule} from '@angular/core';
import {MatDividerModule, MatListModule, MatSlideToggleModule} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';

import {QuickPanelComponent} from 'app/layout/components/quick-panel/quick-panel.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuickPanelComponent
  ],
  imports: [
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,

    FuseSharedModule,
    TranslateModule.forChild()
  ],
  exports: [
    QuickPanelComponent
  ]
})
export class QuickPanelModule {
}
