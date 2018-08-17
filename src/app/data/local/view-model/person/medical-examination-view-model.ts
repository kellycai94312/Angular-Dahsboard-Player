import {FileClass} from '../../../remote/model/file/base/file-class';
import {Document} from '../../../remote/model/file/document/document';
import {BaseViewModel} from '../base/base-view-model';
import {MedicalExamination} from '../../../remote/model/person/medical-examination';

export class MedicalExaminationViewModel extends BaseViewModel<MedicalExamination> {

  public document: Document;

  async initialize() {
    super.initialize();

    try {
      if (this.data && this.data.id) {
        const documents = await this.participantRestApiService.getDocuments({clazz: FileClass.MEDICAL_EXAMINATION, objectId: this.data.id, count: 1});
        if (documents.list.length) {
          this.document = documents.list[0];
        }
      }
    } catch (e) {
    }
  }

}
