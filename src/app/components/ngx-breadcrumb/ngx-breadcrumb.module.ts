import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxBreadcrumbComponent} from './ngx-breadcrumb/ngx-breadcrumb.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([])
  ],
  declarations: [NgxBreadcrumbComponent],
  exports: [NgxBreadcrumbComponent]
})
export class NgxBreadcrumbModule {
}
