import {Document} from '../../../remote/model/file/document/document';
import {GroupConnection} from '../../../remote/model/group/group-connection';
import {BaseViewModel} from '../base/base-view-model';
import {FileClass} from '../../../remote/model/file/base/file-class';
import {PropertyConstant} from '../../property-constant';

export class GroupConnectionViewModel extends BaseViewModel<GroupConnection> {

  public documents: Document[];

  constructor(data: GroupConnection) {
    super(data);

    this.documents = [];
  }

  async initialize() {
    super.initialize();

    this.documents = (await this.participantRestApiService.getDocuments({clazz: FileClass.GROUP_CONNECTION, objectId: this.data.id, count: PropertyConstant.pageSizeMax})).list;
  }

}
