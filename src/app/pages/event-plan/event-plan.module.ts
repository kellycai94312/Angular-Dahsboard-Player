import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPlansComponent} from './event-plans/event-plans.component';
import {EventPlanComponent} from './event-plan/event-plan.component';
import {EventPlanRoutingModule} from './event-plan-routing.module';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';
import {NgxTextBoxModule} from '../../components/ngx-text-box/ngx-text-box.module';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {TranslateModule} from '@ngx-translate/core';
import {DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextAreaModule} from 'devextreme-angular';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {EditEventPlanComponent} from './edit-event-plan/edit-event-plan.component';
import {NamedObjectModule} from '../../components/named-object/named-object.module';
import {NgxSelectionModule} from '../../components/ngx-selection/ngx-selection.module';

@NgModule({
  imports: [
    CommonModule,
    EventPlanRoutingModule,
    NgxGridModule,
    NgxModalModule,
    NgxTextBoxModule,
    InputSelectModule,
    TranslateModule.forChild(),
    DxSelectBoxModule,
    NgxButtonModule,
    DxTextAreaModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    NamedObjectModule,
    NgxSelectionModule,
    DxCheckBoxModule
  ],
  declarations: [EventPlansComponent, EventPlanComponent, EditEventPlanComponent],
  entryComponents: [EditEventPlanComponent]
})
export class EventPlanModule {
}
