import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {MedicalExamination} from '../../../../data/remote/model/person/medical-examination';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {EditDocumentComponent} from '../../../groups/component/edit-document/edit-document.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {Document} from '../../../../data/remote/model/file/document/document';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-edit-medical-examination',
  templateUrl: './edit-medical-examination.component.html',
  styleUrls: ['./edit-medical-examination.component.scss']
})
export class EditMedicalExaminationComponent extends BaseEditComponent<MedicalExamination> {

  public propertyConstant = PropertyConstant;

  @Input()
  public personId: number;

  private _document: Document;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);

    this._document = new Document();
    this._document.clazz = FileClass.MEDICAL_EXAMINATION;
  }


  async initialize(obj: MedicalExamination): Promise<boolean> {
    await  super.initialize(obj);
    this._document.objectId = this.data.id;

    return this.appHelper.tryLoad(async () => {
      if (this.data && this.data.id) {
        const documents = await this.participantRestApiService.getDocuments({clazz: FileClass.MEDICAL_EXAMINATION, objectId: this.data.id, count: 1});
        if (documents.list.length) {
          this._document = documents.list[0];
        }
      }
    });
  }

  async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      this.data.passDate = this.appHelper.dateByFormat(this.data.passDate, PropertyConstant.dateTimeServerFormat);
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createMedicalExamination(this.data, {}, {personId: this.personId});
      } else {
        this.data = await this.participantRestApiService.updateMedicalExamination(this.data, {}, {personId: this.personId, medicalExaminationId: this.data.id});
      }
      this._document.objectId = this.data.id;
    });
  }

  async onRemove(): Promise<boolean> {
    return this.appHelper.tryRemove(async () => {
      if (!this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.removeMedicalExamination({personId: this.personId, medicalExaminationId: this.data.id});
      }
    });
  }

  public editDocument = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditDocumentComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this.appHelper.cloneObject(this._document));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            await this._ngxModalService.save(modal, component);
          },
        },
        {
          nameKey: 'remove',
          callback: async () => {
            await this._ngxModalService.remove(modal, component);
          },
        }
      ];

      modal.result.then(async x => {
      }, async reason => {
        this._document = component.data;
      });
    });
  };

}
