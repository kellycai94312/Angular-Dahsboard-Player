import {Document} from '../../../remote/model/file/document/document';
import {BaseViewModel} from '../base/base-view-model';
import {PersonStageSportType} from '../../../remote/model/stage/person-stage-sport-type';
import {FileClass} from '../../../remote/model/file/base/file-class';

export class PersonStageSportTypeViewModel extends BaseViewModel<PersonStageSportType> {

  public document: Document;

  async initialize() {
    super.initialize();

    try {
      if (this.data && this.data.id) {
        const documents = await this.participantRestApiService.getDocuments({clazz: FileClass.PERSON_STAGE_SPORT_TYPE, objectId: this.data.id, count: 1});
        if (documents.list.length) {
          this.document = documents.list[0];
        }
      }
    } catch (e) {
    }
  }

}
