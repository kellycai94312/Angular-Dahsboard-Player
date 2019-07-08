import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditParameterComponent} from './edit-parameter/edit-parameter.component';
import {MatButtonModule, MatCheckboxModule, MatChipsModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {UnitItemModule} from '../../unit/unit-item/unit-item.module';
import {NgxModalModule} from '../../../components/ngx-modal/ngx-modal.module';
import {MediaLibraryModule} from '../../library/media-library/media-library.module';

@NgModule({
  declarations: [EditParameterComponent],
  entryComponents: [EditParameterComponent],
  exports: [EditParameterComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule,
    UnitItemModule,
    NgxModalModule,
    MediaLibraryModule
  ]
})
export class EditParameterModule {
}
