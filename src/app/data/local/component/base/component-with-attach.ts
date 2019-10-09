import { OnDestroy } from '@angular/core';
import { AppHelper } from '../../../../utils/app-helper';
import { IdentifiedObject } from '../../../remote/base';
import { Document } from '../../../remote/model/document/document';
import { ParticipantRestApiService } from '../../../remote/rest-api/participant-rest-api.service';
import { DocumentQuery } from '../../../remote/rest-api/query/file/document-query';
import { ClientError } from '../../error/client-error';
import { ChangeWatcher } from '../../util/change-watcher';
import { BaseEditComponent } from './base-edit-component';

export abstract class ComponentWithAttach<T extends IdentifiedObject> extends BaseEditComponent<T> implements OnDestroy {

  public readonly changeWatcher: ChangeWatcher;
  public readonly dataName: string;
  public document: Document;
  public documentQuery: DocumentQuery;
  public notDestroyed = true;

  protected constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.document = new Document();
    this.documentQuery = new DocumentQuery();
    this.changeWatcher = new ChangeWatcher(this.appHelper);
    this.dataName = 'data';
  }

  public ngOnDestroy(): void {
    this.notDestroyed = false;
  }

  async initialize(obj: T): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      if (!await super.initialize(obj)) {
        throw new ClientError('loadDataError');
      }

      // this.document.objectId = obj.id;
      this.documentQuery.objectId = obj.id;
      this.changeWatcher.addOrUpdate(this.dataName, this.data);
    });
  }

  public initializeTempFile(document: Document) {
    this.document = document;
    // this.document.objectId = this.data.id;
    this.documentQuery.objectId = this.data.id;
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

  public updateData(): void {
  }

}
