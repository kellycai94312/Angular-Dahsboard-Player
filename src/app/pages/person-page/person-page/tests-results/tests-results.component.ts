import {Component, OnInit, ViewChild} from '@angular/core';
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
import {ExerciseMeasureItemComponent} from '../../../../components/exercise-measure-item/exercise-measure-item.component';
import {DictionaryType} from '../../../../data/remote/misc/dictionary-type';
import {ExerciseMeasure} from '../../../../data/remote/model/exercise/exercise-measure';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-tests-results',
  templateUrl: './tests-results.component.html',
  styleUrls: ['./tests-results.component.scss']
})
export class TestsResultsComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public isEditAllow: boolean;
  public readonly measureTemplateQuery: MeasureTemplateQuery;

  public personMeasureValues: ExerciseExecMeasureValue[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper) {
    this.measureTemplateQuery = new MeasureTemplateQuery();
    this.measureTemplateQuery.from = 0;
    this.measureTemplateQuery.count = PropertyConstant.pageSize;
    this.measureTemplateQuery.personId = this._personService.personViewModel.data.id;
  }

  async ngOnInit() {
    this.isEditAllow = await this._personService.allowEdit();
    this.personMeasureValues = (await this._participantRestApiService.getExerciseValue({personId: this._personService.personViewModel.data.id})).list;
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.measureTemplateQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  public async showMoreValues(result: ExerciseResult) {
    if (result) {
      const groupId = result.group.id;
      const list = result.exerciseValues.list;
      const container = await this._participantRestApiService.getExerciseValue({
        personId: this._personService.personViewModel.data.id,
        groupId: groupId,
        from: list.length
      });
      this._appHelper.pushItemsInList(list.length, list, container);
    } else {
      const container = await this._participantRestApiService.getExerciseValue({
        personId: this._personService.personViewModel.data.id,
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

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = ExerciseMeasureItemComponent;
    componentInstance.pageQuery = measureQuery;
    componentInstance.getItems = async pageQuery => {
      return await this._participantRestApiService.getExerciseMeasures(pageQuery);
    };
    componentInstance.onSave = async selectedItems => {
      try {
        await this._participantRestApiService.updatePersonMeasureTemplate(new ListRequest(selectedItems));
        this.personMeasureValues = (await this._participantRestApiService.getExerciseValue({personId: this._personService.personViewModel.data.id})).list;
        ref.dismiss();
      } catch (e) {
        await this._appHelper.showErrorMessage('saveError');
      }
    };
    await componentInstance.initialize(personMeasures);
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getGroupsMeasureTemplate(pageQuery);
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
