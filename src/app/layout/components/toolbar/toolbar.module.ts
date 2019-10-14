import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import {FuseSearchBarModule, FuseShortcutsModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import { NgxImageModule } from 'app/components/ngx-image';

import {ToolbarComponent} from 'app/layout/components/toolbar/toolbar.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatBadgeModule,
    MatDividerModule,

    FuseSharedModule,
    FuseSearchBarModule,
    FuseShortcutsModule,

    TranslateModule.forChild(),
    NgxImageModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
