import {NgModule} from '@angular/core';
import {NgxBusyDirective} from './ngx-busy/ngx-busy.directive';
import {NgxBusyIndicatorComponent} from './ngx-busy-indicator/ngx-busy-indicator.component';
import {MatProgressBarModule} from '@angular/material';

@NgModule({
  declarations: [NgxBusyDirective, NgxBusyIndicatorComponent],
  exports: [NgxBusyDirective, NgxBusyIndicatorComponent],
  entryComponents: [NgxBusyIndicatorComponent],
  imports: [MatProgressBarModule]
})
export class NgxBusyModule {
}
