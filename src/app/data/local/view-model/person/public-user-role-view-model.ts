import {BaseViewModel} from '../base/base-view-model';
import {Document} from '../../../remote/model/file/document/document';
import {FileClass} from '../../../remote/model/file/base/file-class';
import {PublicUserRole} from '../../../remote/model/group/public-user-role';

export class PublicUserRoleViewModel extends BaseViewModel<PublicUserRole> {

  public document: Document;

  async initialize() {
    super.initialize();

    if (this.data && this.data.id) {
      const documents = await this.participantRestApiService.getDocuments({clazz: FileClass.PUBLIC_USER_ROLE, objectId: this.data.id, count: 1});
      if (documents.list.length) {
        this.document = documents.list[0];
      }
    }
  }

}
