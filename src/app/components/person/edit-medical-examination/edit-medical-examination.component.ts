import {Component, Input} from '@angular/core';
import {ComponentWithAttach} from '../../../data/local/component/base/component-with-attach';
import {MedicalExamination} from '../../../data/remote/model/person/medical-examination';
import {PropertyConstant} from '../../../data/local/property-constant';
import {Person} from '../../../data/remote/model/person';
import {SportType} from '../../../data/remote/model/sport-type';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {FileClass} from '../../../data/remote/model/file/base/file-class';

@Component({
  selector: 'app-edit-medical-examination',
  templateUrl: './edit-medical-examination.component.html',
  styleUrls: ['./edit-medical-examination.component.scss']
})
export class EditMedicalExaminationComponent extends ComponentWithAttach<MedicalExamination> {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public person: Person;

  public sportTypes: SportType[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);

    this.document.clazz = FileClass.MEDICAL_EXAMINATION;
    this.documentQuery.clazz = FileClass.MEDICAL_EXAMINATION;
  }

  async initialize(obj: MedicalExamination): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);
      obj.allowed = obj.allowed || false;
      this.sportTypes = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;

      await this.attachFileComponent.initialize();
    });
  }

  async onSave(): Promise<boolean> {
    if (!this.changeWatcher.hasChanges() && !this.attachFileComponent.hasChanges()) {
      return true;
    }

    if (!(await this.validWithNotify())) {
      return false;
    }
    return await this.appHelper.trySave(async () => {
      if (this.changeWatcher.hasChanges()) {
        if (this.appHelper.isNewObject(this.data)) {
          this.appHelper.updateObject(this.data, await this.participantRestApiService.createMedicalExamination(this.data, {}, {personId: this.person.id}));
        } else {
          this.appHelper.updateObject(this.data, await this.participantRestApiService.updateMedicalExamination(this.data, {}, {personId: this.person.id, medicalExaminationId: this.data.id}));
        }
        this.document.number = this.data.number;
        this.document.date = this.data.startDate;
      }

      if (this.attachFileComponent.hasChanges()) {
        this.document.objectId = this.data.id;
        await this.attachFileComponent.updateFile();
      }
    });
  }

  async onRemove(): Promise<boolean> {
    return this.appHelper.isNewObject(this.data) || await this.appHelper.tryRemove(async () => {
      this.data = await this.participantRestApiService.removeMedicalExamination({personId: this.person.id, medicalExaminationId: this.data.id});
    });
  }

  valid(): boolean {
    return super.valid() && !!(this.data.sportType && this.data.number && this.data.startDate && this.data.finishDate);
  }

  public onStartDateChanged(val: Date) {
    this.data.startDate = this.appHelper.getGmtDate(val);
  }

  public onFinishDateChanged(val: Date) {
    this.data.finishDate = this.appHelper.getGmtDate(val);
  }

}
