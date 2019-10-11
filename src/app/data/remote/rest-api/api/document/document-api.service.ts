import { Injectable } from '@angular/core';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { BooleanWrapper } from 'app/data/remote/bean/wrapper/boolean-wrapper';
import { Document } from 'app/data/remote/model/document/document';
import { DocumentClass } from 'app/data/remote/model/document/document-class';
import { DocumentType } from 'app/data/remote/model/document/document-type';
import { ResourceFile } from 'app/data/remote/model/file/base';
import { IdRequest } from 'app/data/remote/request/id-request';
import { ApiService, FileApiService } from 'app/data/remote/rest-api/api';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService {

  private readonly _basePath = `${environment.restUrl}/document`;

  constructor(private _apiService: ApiService,
              private _fileApiService: FileApiService) {
  }

  public getDocumentPage(query: { clazz: DocumentClass, objectId: number, documentType?: DocumentType } & PageQuery): Observable<PageContainer<Document>> {
    return this._apiService.getPageContainer(Document, this._basePath, query);
  }

  public getDocumentList(query: { clazz: DocumentClass, objectId: number, documentType?: DocumentType }): Observable<Document[]> {
    return this._apiService.getValues(Document, `${this._basePath}/all`, query);
  }

  public getUrlDownloadDocumentResourceById(document: Document): string {
    return `${this._basePath}/${document.id}/download`;
  }

  public createDocument(value: Document, file?: File): Observable<Document> {
    return this._apiService.createValue(Document, this._basePath, this._fileApiService.getFileFormData(value, file)) as Observable<Document>;
  }

  public updateDocument(value: Document, file?: File): Observable<Document> {
    return this._apiService.updateValue(Document, `${this._basePath}/${value.id}`, this._fileApiService.getFileFormData(value, file)) as Observable<Document>;
  }

  public saveDocument(value: Document, file?: File): Observable<Document> {
    if (value.id) {
      return this.updateDocument(value, file);
    }
    return this.createDocument(value, file);
  }

  public removeDocument(value: Document): Observable<Document> {
    return this._apiService.removeValue(Document, `${this._basePath}/${value.id}`) as Observable<Document>;
  }

  public updateGroupDocumentResource(document: Document, resourceFile: ResourceFile): Observable<null> {
    return this._apiService.updateValue(void 0, `${this._basePath}/${document.id}/file`, new IdRequest(resourceFile.id)) as Observable<null>;
  }

  public removeDocumentFile(document: Document): Observable<ResourceFile> {
    return this._apiService.removeValue(void 0, `${this._basePath}/${document.id}/file`) as Observable<ResourceFile>;
  }

  public getDocumentAvailable(document: Document): Observable<boolean> {
    const query: any = {series: document.series, number: document.number, documentType: document.type};
    if (!document.isNew) {
      query.documentId = document.id;
    }
    return this._apiService.getValue(BooleanWrapper, `${this._basePath}/document/available`, query).pipe(map(x => x.value));
  }

}
