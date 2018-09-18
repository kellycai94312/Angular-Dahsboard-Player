import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalConfirmDangerComponent} from './modal-confirm-danger.component';
import {TranslateModule} from '@ngx-translate/core';

/*
@deprecated Use NgxModalComponent
 */
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [ModalConfirmDangerComponent],
  exports: [ModalConfirmDangerComponent],
  entryComponents: [ModalConfirmDangerComponent]
})
export class ModalConfirmModule {
}
