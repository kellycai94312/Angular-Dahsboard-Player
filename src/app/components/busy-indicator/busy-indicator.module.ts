import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyIndicatorComponent } from './busy-indicator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BusyIndicatorComponent],
  exports: [BusyIndicatorComponent]
})
export class BusyIndicatorModule {
}
