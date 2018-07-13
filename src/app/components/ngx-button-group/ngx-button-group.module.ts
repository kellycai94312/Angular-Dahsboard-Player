import {NgModule} from '@angular/core';
import {NgxButtonGroupComponent} from './ngx-button-group/ngx-button-group.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [NgxButtonGroupComponent],
  exports: [NgxButtonGroupComponent]
})
export class NgxButtonGroupModule {
}
