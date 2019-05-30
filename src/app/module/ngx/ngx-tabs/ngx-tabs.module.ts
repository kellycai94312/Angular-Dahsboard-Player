import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTabsComponent} from './ngx-tabs/ngx-tabs.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [NgxTabsComponent],
  exports: [NgxTabsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    RouterModule.forChild([])
  ]
})
export class NgxTabsModule {
}
