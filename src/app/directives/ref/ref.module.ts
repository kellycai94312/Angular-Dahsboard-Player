import {NgModule} from '@angular/core';
import {RefDirective} from './ref.directive';

@NgModule({
  declarations: [RefDirective],
  exports: [RefDirective]
})
export class RefModule {
}
