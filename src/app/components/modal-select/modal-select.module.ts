import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectComponent } from './modal-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { InputSearchModule } from '../input-search/input-search.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    InputSearchModule
  ],
  exports: [ModalSelectComponent],
  declarations: [ModalSelectComponent]
})
export class ModalSelectModule {
}
