import {Document} from '../../../remote/model/file/document/document';
import {BaseViewModel} from '../base/base-view-model';
import {FileClass} from '../../../remote/model/file/base/file-class';
import {PersonRefereeCategory} from '../../../remote/model/referee-category/person-referee-category';

export class PersonRefereeCategoryViewModel extends BaseViewModel<PersonRefereeCategory> {

  public document: Document;
  public documentUrl: string;

  async initialize() {
    super.initialize();

    this.document = new Document();
    if (this.data.id) {
      const documentPageContainer = await  this.participantRestApiService.getDocuments({clazz: FileClass.PERSON_REFEREE_CATEGORY, objectId: this.data.id});
      if (documentPageContainer.list.length) {
        this.documentUpdate(documentPageContainer.list[0]);
      }
    }
  }

  public documentUpdate(document: Document) {
    this.document = document;
    this.documentUrl = this.participantRestApiService.getFileUrl({clazz: this.document.clazz, objectId: this.document.objectId, type: this.document.type});
  }

}
