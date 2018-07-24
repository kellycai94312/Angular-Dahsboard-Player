import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsPageComponent} from './reports-page/reports-page.component';
import {ReportRoutingModule} from './report-routing.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {TranslateModule} from '@ngx-translate/core';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';
import {NgxModalComponent} from '../../components/ngx-modal/ngx-modal/ngx-modal.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {NamedObjectComponent} from '../../components/named-object/named-object/named-object.component';
import {NamedObjectModule} from '../../components/named-object/named-object.module';
import {ReportPageComponent} from './report-page/report-page.component';
import {EventBlocksComponent} from './report-page/event-blocks/event-blocks.component';
import {EventReportGeneralComponent} from './report-page/event-report-general/event-report-general.component';
import {PersonsEventBlockComponent} from './report-page/event-blocks/persons-event-block/persons-event-block.component';
import {GeneralEventBlockComponent} from './report-page/event-blocks/general-event-block/general-event-block.component';
import {ExercisesEventBlockComponent} from './report-page/event-blocks/exercises-event-block/exercises-event-block.component';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxVirtualScrollModule,
    TranslateModule.forChild(),
    BusyButtonModule,
    NgxModalModule,
    ModalSelectPageModule,
    NamedObjectModule
  ],
  declarations: [
    ReportsPageComponent,
    ReportPageComponent,
    EventBlocksComponent,
    EventReportGeneralComponent,
    PersonsEventBlockComponent,
    GeneralEventBlockComponent,
    ExercisesEventBlockComponent
  ],
  entryComponents: [NgxModalComponent, NamedObjectComponent]
})
export class ReportModule {
}
