import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonComponent} from './person.component';
import {RouterModule} from '@angular/router';
import {ImageModule} from '../image/image.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ImageModule
  ],
  declarations: [PersonComponent],
  exports: [PersonComponent]
})
export class PersonModule {
}
