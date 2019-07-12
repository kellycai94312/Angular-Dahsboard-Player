import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DictionaryRoutingModule} from './dictionary-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';
import {SportTypeDictionaryComponent} from './sport-type-dictionary/sport-type-dictionary.component';
import {OperatorValueModule} from '../../components/operator-value/operator-value.module';
import {NamedObjectModule} from '../../components/named-object/named-object.module';
import {NamedObjectItemModule} from '../../components/named-object-item/named-object-item.module';
import {ExercisesDictionaryComponent} from './exercises-dictionary/exercises-dictionary.component';
import {TestsDictionaryComponent} from './tests-dictionary/tests-dictionary.component';
import {ActivitiesComponent} from './component/activities/activities.component';
import {ActivityComponent} from './component/activity/activity.component';
import {ActivityItemComponent} from './component/activity-item/activity-item.component';
import {ImageModule} from '../../components/image/image.module';
import {NgxTextBoxModule} from '../../components/ngx-text-box/ngx-text-box.module';
import {EditActivityComponent} from './component/edit-activity/edit-activity.component';
import {NgxSplitButtonModule} from '../../components/ngx-split-button/ngx-split-button.module';
import {NgxSelectionModule} from '../../components/ngx-selection/ngx-selection.module';
import {NgxEditableItemModule} from '../../components/ngx-editable-item/ngx-editable-item.module';
import {EditTagComponent} from './component/edit-tag/edit-tag.component';
import {DictionaryTypeModule} from '../../components/dictionary-type/dictionary-type.module';
import {NgxImageModule} from '../../components/ngx-image/ngx-image.module';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {NgxCarouselModule} from '../../components/ngx-carousel/ngx-carousel.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {MatCardModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ItemLineModule} from '../../module/common/item-line/item-line.module';
import {ItemListModule} from '../../module/common/item-list/item-list.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DictionaryRoutingModule,
    InputSelectModule,
    DxSelectBoxModule,
    NgxButtonModule,
    NgxGridModule,
    NgxModalModule,
    DxTextBoxModule,
    DxValidatorModule,
    OperatorValueModule,
    NamedObjectModule,
    NamedObjectItemModule,
    ImageModule,
    NgxTextBoxModule,
    NgxSplitButtonModule,
    NgxSelectionModule,
    NgxEditableItemModule,
    DictionaryTypeModule,
    NgxImageModule,
    SafeHtmlModule,
    NgxCarouselModule,
    DxTextAreaModule,
    NgxVirtualScrollModule,
    MatCardModule,
    MatRippleModule,
    FlexLayoutModule,
    ItemListModule,
    ItemLineModule
  ],
  declarations: [
    DictionariesComponent,
    SportTypeDictionaryComponent,
    ExercisesDictionaryComponent,
    TestsDictionaryComponent,
    ActivitiesComponent,
    ActivityComponent,
    ActivityItemComponent,
    EditActivityComponent,
    EditTagComponent
  ],
  entryComponents: [
    EditActivityComponent,
    EditTagComponent
  ]
})
export class DictionaryModule {
}
