import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectComponent } from './modal-select.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { InputSearchModule } from '../input-search/input-search.module';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { AdDirective } from '../ad.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    InputSearchModule
  ],
  exports: [ModalSelectComponent, ModalItemComponent],
  declarations: [ModalSelectComponent, ModalItemComponent, AdDirective],
  entryComponents: [ModalItemComponent],
  providers: [NgbActiveModal]
})
export class ModalSelectModule {
}
