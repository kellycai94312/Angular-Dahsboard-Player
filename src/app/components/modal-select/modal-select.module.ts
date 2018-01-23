import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectComponent } from './modal-select.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { AdDirective } from '../ad.directive';
import { InputSearchComponent } from './input-search/input-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  exports: [ModalSelectComponent],
  declarations: [ModalSelectComponent, ModalItemComponent, InputSearchComponent, AdDirective],
  entryComponents: [ModalItemComponent],
  providers: [NgbActiveModal]
})
export class ModalSelectModule {
}
