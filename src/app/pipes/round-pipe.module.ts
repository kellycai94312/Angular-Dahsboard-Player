import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundPipe } from './round.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RoundPipe
  ],
  exports: [
    RoundPipe
  ]
})
export class RoundPipeModule {
  static forRoot() {
    return {
      ngModule: RoundPipeModule,
      providers: []
    };
  }
}
