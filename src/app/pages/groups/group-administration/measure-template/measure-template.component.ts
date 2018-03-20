import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GroupService } from '../../group.service';
import { ExerciseMeasure } from '../../../../data/remote/model/exercise/exercise-measure';
import { DictionaryType } from '../../../../data/remote/misc/dictionary-type';
import { ModalSelectPageComponent } from '../../../../components/modal-select-page/modal-select-page.component';
import { MeasureTemplateQuery } from '../../../../data/remote/rest-api/query/measure-template-query';
import { HashSet } from '../../../../data/local/hash-set';
import { ListRequest } from '../../../../data/remote/request/list-request';
import { ExerciseMeasureItemComponent } from '../../../../components/exercise-measure-item/exercise-measure-item.component';
import { PropertyConstant } from '../../../../data/local/property-constant';

@Component({
  selector: 'app-measure-template',
  templateUrl: './measure-template.component.html',
  styleUrls: ['./measure-template.component.scss']
})
export class MeasureTemplateComponent implements OnInit {

  readonly isEditAllow: boolean;

  groupMeasures: ExerciseMeasure[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal,
              private _translate: TranslateService,
              private _groupService: GroupService) {
  }

  async ngOnInit() {
    this.groupMeasures = await this._participantRestApiService.getGroupMeasureTemplate({groupId: this._groupService.getGroup().id});
  }

  async editTemplates() {
    const measureQuery = new MeasureTemplateQuery();
    measureQuery.from = 0;
    measureQuery.count = PropertyConstant.pageSize;
    measureQuery.dictionaryType = DictionaryType[DictionaryType.SYSTEM].toString();

    const selectedSet = new HashSet<ExerciseMeasure>();
    selectedSet.addAll(this.groupMeasures);

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
      await this._participantRestApiService.updateGroupMeasureTemplate(new ListRequest(selectedSet.data),
        {}, {groupId: this._groupService.getGroup().id});
      this.groupMeasures = selectedSet.data;
      ref.dismiss();
    };
  }

}
