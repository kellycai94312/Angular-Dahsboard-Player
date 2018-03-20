import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportTypeItemComponent } from './sport-type-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SportTypeItemComponent],
  declarations: [SportTypeItemComponent],
  entryComponents: [SportTypeItemComponent]
})
export class SportTypeItemModule {
}
