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
import {GeneralStepEventPlanComponent} from './event-plan/step/general-step-event-plan/general-step-event-plan.component';
import {PersonsStepEventPlanComponent} from './event-plan/step/persons-step-event-plan/persons-step-event-plan.component';
import {NgxTabModule} from '../../components/ngx-tab/ngx-tab.module';
import {HtmlContentModule} from '../../components/html-content/html-content.module';
import {PersonsEventPlanComponent} from './persons-event-plan/persons-event-plan.component';
import {EventPlanPersonItemComponent} from './event-plan-person-item/event-plan-person-item.component';
import {NgxImageModule} from '../../components/ngx-image/ngx-image.module';

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
    DxCheckBoxModule,
    NgxTabModule,
    DxDateBoxModule,
    HtmlContentModule,
    NgxImageModule
  ],
  declarations: [EventPlansComponent, EventPlanComponent, EditEventPlanComponent, GeneralStepEventPlanComponent, PersonsStepEventPlanComponent, PersonsEventPlanComponent, EventPlanPersonItemComponent],
  entryComponents: [EditEventPlanComponent]
})
export class EventPlanModule {
}
