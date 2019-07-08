import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditApplicationComponent} from './edit-application/edit-application.component';
import {ApplicationWindowService} from '../../../services/windows/application-window/application-window.service';
import {MatButtonModule, MatCheckboxModule, MatChipsModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {MediaLibraryModule} from '../../library/media-library/media-library.module';

@NgModule({
  declarations: [EditApplicationComponent],
  entryComponents: [EditApplicationComponent],
  providers: [ApplicationWindowService],
  exports: [EditApplicationComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxInputModule,
    MediaLibraryModule
  ]
})
export class EditApplicationModule {
}
