import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonRepresentativeListComponent} from './person-representative-list/person-representative-list.component';
import {MatButtonModule, MatDividerModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';

@NgModule({
  declarations: [PersonRepresentativeListComponent],
  exports: [PersonRepresentativeListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    NgxGridModule
  ]
})
export class PersonRepresentativeListModule {
}
