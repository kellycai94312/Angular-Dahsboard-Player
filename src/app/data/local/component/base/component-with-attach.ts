import {IdentifiedObject} from '../../../remote/base/identified-object';
import {BaseEditComponent} from './base-edit-component';
import {ViewChild} from '@angular/core';
import {AttachFileComponent} from '../../../../components/attach-file/attach-file/attach-file.component';
import {Document} from '../../../remote/model/file/document/document';
import {DocumentQuery} from '../../../remote/rest-api/query/file/document-query';
import {ChangeWatcher} from '../../util/change-watcher';
import {ParticipantRestApiService} from '../../../remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ClientError} from '../../error/client-error';

export abstract class ComponentWithAttach<T extends IdentifiedObject> extends BaseEditComponent<T> {

  @ViewChild(AttachFileComponent)
  public attachFileComponent: AttachFileComponent<Document>;

  public readonly changeWatcher: ChangeWatcher;
  public readonly dataName: string;
  public document: Document;
  public documentQuery: DocumentQuery;

  protected constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.document = new Document();
    this.documentQuery = new DocumentQuery();
    this.changeWatcher = new ChangeWatcher(this.appHelper);
    this.dataName = 'data';
  }

  async initialize(obj: T): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      if (!await super.initialize(obj)) {
        throw new ClientError('loadDataError');
      }

      this.document.objectId = obj.id;
      this.documentQuery.objectId = obj.id;
      this.changeWatcher.addOrUpdate(this.dataName, this.data);
    });
  }

  public valid(): boolean {
    return true;
  }

  public async validWithNotify(): Promise<boolean> {
    const valid = this.valid();
    if (!valid) {
      await this.appHelper.showErrorMessage('someFieldsNotValid');
    }
    return valid;
  }

}
