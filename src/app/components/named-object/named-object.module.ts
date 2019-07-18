import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NamedObjectComponent} from './named-object/named-object.component';
import {PreviewNamedObjectComponent} from './preview-named-object/preview-named-object.component';
import {NgxInputModule} from '../../module/ngx/ngx-input/ngx-input.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxInputModule
  ],
  declarations: [NamedObjectComponent, PreviewNamedObjectComponent],
  exports: [NamedObjectComponent, PreviewNamedObjectComponent],
  entryComponents: [NamedObjectComponent, PreviewNamedObjectComponent]
})
export class NamedObjectModule {
}
