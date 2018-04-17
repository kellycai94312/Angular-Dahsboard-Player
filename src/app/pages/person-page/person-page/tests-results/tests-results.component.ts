import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PersonService} from '../person.service';
import {ExerciseResult} from '../../../../data/remote/bean/exercise-result';
import {ExerciseExecMeasureValue} from '../../../../data/remote/model/training/exercise-exec-measure-value';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {DxTextBoxComponent} from 'devextreme-angular';
import {MeasureTemplateQuery} from '../../../../data/remote/rest-api/query/measure-template-query';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalSelectPageComponent} from '../../../../components/modal-select-page/modal-select-page.component';
import {TranslateService} from '@ngx-translate/core';
import {ExerciseMeasureItemComponent} from '../../../../components/exercise-measure-item/exercise-measure-item.component';
import {DictionaryType} from '../../../../data/remote/misc/dictionary-type';
import {HashSet} from '../../../../data/local/hash-set';
import {ExerciseMeasure} from '../../../../data/remote/model/exercise/exercise-measure';
import {ListRequest} from '../../../../data/remote/request/list-request';

@Component({
  selector: 'app-tests-results',
  templateUrl: './tests-results.component.html',
  styleUrls: ['./tests-results.component.scss']
})
export class TestsResultsComponent implements OnInit, AfterViewInit {

  public readonly isEditAllow: boolean;
  public readonly pageSize: number;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public groupResults: ExerciseResult[];
  public personMeasureValues: ExerciseExecMeasureValue[];

  private readonly _measureTemplateQuery: MeasureTemplateQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _modalService: NgbModal,
              private _translate: TranslateService,
              private _appHelper: AppHelper) {
    this.pageSize = PropertyConstant.pageSize;
    this.isEditAllow = _personService.shared.isEditAllow;

    this._measureTemplateQuery = new MeasureTemplateQuery();
    this._measureTemplateQuery.from = 0;
    this._measureTemplateQuery.count = PropertyConstant.pageSize;
    this._measureTemplateQuery.personId = this._personService.shared.person.id;
  }

  async ngOnInit() {
    this.personMeasureValues = (await this._participantRestApiService.getExerciseValue({personId: this._personService.shared.person.id})).list;
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._measureTemplateQuery.name = value;
        await this.updateListAsync();
      });
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async showMoreValues(result: ExerciseResult) {
    if (result) {
      const groupId = result.group.id;
      const list = result.exerciseValues.list;
      const container = await this._participantRestApiService.getExerciseValue({
        personId: this._personService.shared.person.id,
        groupId: groupId,
        from: list.length
      });
      this._appHelper.pushItemsInList(list.length, list, container);
    } else {
      const container = await this._participantRestApiService.getExerciseValue({
        personId: this._personService.shared.person.id,
        from: this.personMeasureValues.length
      });
      this._appHelper.pushItemsInList(this.personMeasureValues.length, this.personMeasureValues, container);
    }
  }

  public async editPersonal() {
    const measureQuery = new MeasureTemplateQuery();
    measureQuery.from = 0;
    measureQuery.count = PropertyConstant.pageSize;
    measureQuery.dictionaryType = DictionaryType[DictionaryType.SYSTEM].toString();

    const personMeasures: ExerciseMeasure[] = await this._participantRestApiService.getPersonMeasureTemplate();
    const selectedSet = new HashSet<ExerciseMeasure>();
    selectedSet.addAll(personMeasures);

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    ref.componentInstance.header = await this._translate.get('edit').toPromise();
    ref.componentInstance.component = ExerciseMeasureItemComponent;
    ref.componentInstance.selectedSet = selectedSet;
    ref.componentInstance.getListAsync = async (name: string, from: number) => {
      measureQuery.from = from;
      measureQuery.name = name;
      return await this._participantRestApiService.getExerciseMeasure(measureQuery);
    };
    ref.componentInstance.onSave = async () => {
      await this._participantRestApiService.updatePersonMeasureTemplate(new ListRequest(selectedSet.data));
      this.personMeasureValues = (await this._participantRestApiService.getExerciseValue({personId: this._personService.shared.person.id})).list;
      ref.dismiss();
    };
  }

  private async updateListAsync(from: number = 0) {
    this._measureTemplateQuery.from = from;
    const pageContainer = await this._participantRestApiService.getGroupsMeasureTemplate(this._measureTemplateQuery);
    this.groupResults = this._appHelper.pushItemsInList(from, this.groupResults, pageContainer);
  }

}
