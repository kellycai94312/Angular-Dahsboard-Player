import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesComponent} from './files/files.component';
import {NgxGridModule} from '../ngx-grid/ngx-grid.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    NgxGridModule,
    TranslateModule.forChild()
  ],
  declarations: [FilesComponent],
  exports: [FilesComponent],
  entryComponents: [FilesComponent]
})
export class FileModule {
}
