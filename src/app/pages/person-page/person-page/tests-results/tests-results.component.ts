import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { PersonService } from '../person.service';
import { ExerciseResult } from '../../../../data/remote/bean/exercise-result';
import { ExerciseExecMeasureValue } from '../../../../data/remote/model/training/exercise-exec-measure-value';
import { AppHelper } from '../../../../utils/app-helper';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { DxTextBoxComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { GroupQuery } from '../../../../data/remote/rest-api/query/group-query';
import { ImageType } from '../../../../data/remote/model/image-type';
import { GroupViewModel } from '../../../../data/local/view-model/group-view-model';
import { MeasureTemplateQuery } from '../../../../data/remote/rest-api/query/measure-template-query';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';

@Component({
  selector: 'app-tests-results',
  templateUrl: './tests-results.component.html',
  styleUrls: ['./tests-results.component.scss']
})
export class TestsResultsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  readonly isEditAllow: boolean;

  groupResults: ExerciseResult[];
  personMeasureValues: ExerciseExecMeasureValue[];

  public readonly pageSize: number;
  private readonly _measureQuery: MeasureTemplateQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService) {
    this.pageSize = PropertyConstant.pageSize;
    this.isEditAllow = _personService.shared.isEditAllow;

    this._measureQuery = new MeasureTemplateQuery();
    this._measureQuery.from = 0;
    this._measureQuery.count = PropertyConstant.pageSize;
    this._measureQuery.personId = this._personService.shared.person.id;
  }

  async ngOnInit() {
    this.personMeasureValues = (await this._participantRestApiService.getExerciseValue({personId: this._personService.shared.person.id})).list;
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(value => {
        this._measureQuery.name = value;
        this.updateListAsync();
      });
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async showMoreValues(result: ExerciseResult) {
    if (result) {
      const groupId = result.group.id;
      let list = result.exerciseValues.list;
      const container = await this._participantRestApiService.getExerciseValue({
        personId: this._personService.shared.person.id,
        groupId: groupId,
        from: list.length
      });
      AppHelper.pushItemsInList(list.length, list, container);
    } else {
      const container = await this._participantRestApiService.getExerciseValue({
        personId: this._personService.shared.person.id,
        from: this.personMeasureValues.length
      });
      AppHelper.pushItemsInList(this.personMeasureValues.length, this.personMeasureValues, container);
    }
  }

  private async updateListAsync(from: number = 0) {
    this._measureQuery.from = from;
    const pageContainer = await this._participantRestApiService.getGroupMeasureTemplate(this._measureQuery);
    this.groupResults = AppHelper.pushItemsInList(from, this.groupResults, pageContainer);
  }

}
