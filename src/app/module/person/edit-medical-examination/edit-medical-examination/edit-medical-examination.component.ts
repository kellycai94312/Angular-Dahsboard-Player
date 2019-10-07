import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentWithAttach } from '../../../../data/local/component/base/component-with-attach';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { Person } from '../../../../data/remote/model/person';
import { MedicalExamination } from '../../../../data/remote/model/person/medical-examination';
import { PersonApiService } from '../../../../data/remote/rest-api/api/person/person-api.service';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { AppHelper } from '../../../../utils/app-helper';
import { NgxDate } from '../../../ngx/ngx-date/model/ngx-date';
import { NgxInput } from '../../../ngx/ngx-input/model/ngx-input';
import { NgxSelect } from '../../../ngx/ngx-select/model/ngx-select';

@Component({
  selector: 'app-edit-medical-examination',
  templateUrl: './edit-medical-examination.component.html',
  styleUrls: ['./edit-medical-examination.component.scss']
})
export class EditMedicalExaminationComponent extends ComponentWithAttach<MedicalExamination> {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public person: Person;

  public readonly sportTypeNgxSelect = new NgxSelect();
  public readonly numberNgxInput = new NgxInput();
  public readonly startDateNgxDate = new NgxDate();
  public readonly finishDateNgxDate = new NgxDate();
  public readonly formGroup = new FormGroup({});

  constructor(private _personApiService: PersonApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    // TODO:
    // this.document.clazz = FileClass.MEDICAL_EXAMINATION;
    // this.documentQuery.clazz = FileClass.MEDICAL_EXAMINATION;
  }

  async initialize(obj: MedicalExamination): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);
      obj.allowed = obj.allowed || false;

      this.sportTypeNgxSelect.labelTranslation = 'sportTypes';
      this.sportTypeNgxSelect.required = true;
      this.sportTypeNgxSelect.display = 'name';
      this.sportTypeNgxSelect.items = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
      this.sportTypeNgxSelect.control.setValue(obj.sportType ? this.sportTypeNgxSelect.items.find(x => x.id == obj.sportType.id) : this.sportTypeNgxSelect.items[0]);
      this.sportTypeNgxSelect.control.setValidators(Validators.required);

      this.numberNgxInput.labelTranslation = 'number';
      this.numberNgxInput.required = true;
      this.numberNgxInput.control.setValue(obj.number);
      this.numberNgxInput.control.setValidators(Validators.required);

      this.startDateNgxDate.placeholderTranslation = 'issued';
      this.startDateNgxDate.required = true;
      this.startDateNgxDate.format = PropertyConstant.dateFormat;
      this.startDateNgxDate.control = new FormControl(obj.startDate, [Validators.required]);

      this.finishDateNgxDate.placeholderTranslation = 'actual';
      this.finishDateNgxDate.required = true;
      this.finishDateNgxDate.format = PropertyConstant.dateFormat;
      this.finishDateNgxDate.control = new FormControl(obj.finishDate, [Validators.required]);

      this.formGroup.setControl('sportType', this.sportTypeNgxSelect.control);
      this.formGroup.setControl('number', this.numberNgxInput.control);
      this.formGroup.setControl('startDate', this.startDateNgxDate.control);
      this.formGroup.setControl('finishDate', this.finishDateNgxDate.control);

      // await this.attachFileComponent.initialize();
    });
  }

  async onSave(): Promise<boolean> {
    // if (!this.changeWatcher.hasChanges() && !this.attachFileComponent.hasChanges()) {
    //   return true;
    // }

    if (!(await this.validWithNotify())) {
      return false;
    }
    this.data.sportType = this.sportTypeNgxSelect.control.value;
    this.data.number = this.numberNgxInput.control.value;
    this.data.startDate = this.appHelper.getGmtDate(this.startDateNgxDate.control.value);
    this.data.finishDate = this.appHelper.getGmtDate(this.finishDateNgxDate.control.value);

    return await this.appHelper.trySave(async () => {
      this.data = await this._personApiService.saveMedicalExamination(this.person, this.data).toPromise();

      this.document.number = this.data.number;
      this.document.date = this.data.startDate;

      // if (this.attachFileComponent.hasChanges()) {
      //   this.document.objectId = this.data.id;
      //   await this.attachFileComponent.updateFile();
      // }
    });
  }

  async onRemove(): Promise<boolean> {
    return this.appHelper.isNewObject(this.data) || await this.appHelper.tryRemove(async () => {
      this.data = await this._personApiService.removeMedicalExamination(this.person, this.data).toPromise();
    });
  }

  valid(): boolean {
    return super.valid() && this.formGroup.valid;
  }

}
