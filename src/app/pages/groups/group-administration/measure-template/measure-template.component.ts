import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../../../group/group-page/service/group.service';
import {ExerciseMeasure} from '../../../../data/remote/model/exercise/exercise-measure';
import {DictionaryType} from '../../../../data/remote/misc/dictionary-type';
import {ModalSelectPageComponent} from '../../../../components/modal-select-page/modal-select-page.component';
import {MeasureTemplateQuery} from '../../../../data/remote/rest-api/query/measure-template-query';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {ExerciseMeasureItemComponent} from '../../../../components/exercise-measure-item/exercise-measure-item.component';
import {PropertyConstant} from '../../../../data/local/property-constant';

// @Component({
//   selector: 'app-measure-template',
//   templateUrl: './measure-template.component.html',
//   styleUrls: ['./measure-template.component.scss']
// })
export class MeasureTemplateComponent implements OnInit {

  readonly isEditAllow: boolean;

  groupMeasures: ExerciseMeasure[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal,
              private _groupService: GroupService) {
  }

  async ngOnInit() {
    this.groupMeasures = await this._participantRestApiService.getGroupMeasureTemplate({groupId: this._groupService.groupSubject.getValue().id});
  }

  async editTemplates() {
    const measureQuery = new MeasureTemplateQuery();
    measureQuery.from = 0;
    measureQuery.count = PropertyConstant.pageSize;
    measureQuery.dictionaryType = DictionaryType[DictionaryType.SYSTEM].toString();

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = ExerciseMeasureItemComponent;
    componentInstance.pageQuery = measureQuery;
    componentInstance.getItems = async pageQuery => {
      return await this._participantRestApiService.getExerciseMeasures(pageQuery);
    };
    ref.componentInstance.onSave = async selectedItems => {
      try {
        const items = await this._participantRestApiService.updateGroupMeasureTemplate(new ListRequest(selectedItems),
          {}, {groupId: this._groupService.groupSubject.getValue().id});
        this.groupMeasures = items;
        ref.dismiss();
      } catch (e) {
        // TODO: Set toast message
      }
    };
    await componentInstance.initialize(this.groupMeasures);
  }

}
