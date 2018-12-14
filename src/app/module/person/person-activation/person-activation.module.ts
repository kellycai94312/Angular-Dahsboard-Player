import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonActivationComponent} from './person-activation/person-activation.component';
import {NgxInputModule} from '../../../components/ngx-input/ngx-input.module';

@NgModule({
  imports: [
    CommonModule,
    NgxInputModule
  ],
  declarations: [PersonActivationComponent],
  entryComponents: [PersonActivationComponent],
  exports: [PersonActivationComponent]
})
export class PersonActivationModule {
}
