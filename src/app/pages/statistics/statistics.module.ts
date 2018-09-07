import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsPageComponent} from './page/statistics-page/statistics-page.component';
import {StatisticsRoutingModule} from './statistics-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SportTypeStatisticsPageComponent} from './page/sport-type-statistics-page/sport-type-statistics-page.component';
import {StagePersonsComponent} from './component/stage-persons/stage-persons.component';
import {StagePersonRanksComponent} from './component/stage-person-ranks/stage-person-ranks.component';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {PersonModule} from '../../components/person/person.module';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    StatisticsRoutingModule,
    NgxGridModule,
    PersonModule,
    NgxModalModule
  ],
  declarations: [StatisticsPageComponent, SportTypeStatisticsPageComponent, StagePersonsComponent, StagePersonRanksComponent],
  entryComponents: [StagePersonsComponent, StagePersonRanksComponent]
})
export class StatisticsModule {
}
