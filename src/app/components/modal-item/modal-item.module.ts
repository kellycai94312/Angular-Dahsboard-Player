import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalItemComponent } from './modal-item.component';
import { AdDirective } from './ad.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ModalItemComponent],
  declarations: [ModalItemComponent, AdDirective],
  entryComponents: [ModalItemComponent]
})
export class ModalItemModule { }
