import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {DocumentType} from '../../../model/file/document/document-type';
import {BooleanWrapper} from '../../../bean/wrapper/boolean-wrapper';
import {DocumentQuery} from '../../query/file/document-query';
import {PageContainer} from '../../../bean/page-container';
import {Document} from '../../../model/file/document/document';
import {BaseFile} from '../../../model/file/base/base-file';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  private readonly _basePath = `${environment.restUrl}/file`;

  constructor(private _apiService: ApiService) {
  }

  public getDocuments(query: DocumentQuery): Observable<PageContainer<Document>> {
    return this._apiService.get(`${this._basePath}/document`, this._apiService.getHttpParamsFromObject(query)).pipe(
      map(x => plainToClassFromExist(new PageContainer<Document>(Document), x) as any)
    );
  }

  public createFile<T extends BaseFile>(baseFile: T, file?: File): Observable<T> {
    return this._apiService.post<T>(this._basePath, this._getFileFormData(baseFile, file)).pipe(
      map(x => plainToClass(BaseFile, x) as T)
    );
  }

  public updateFile<T extends BaseFile>(baseFile: T, file?: File): Observable<T> {
    return this._apiService.post<T>(`${this._basePath}/${baseFile.id}`, this._getFileFormData(baseFile, file)).pipe(
      map(x => plainToClass(BaseFile, x) as T)
    );
  }

  public saveFile<T extends BaseFile>(baseFile: T, file?: File): Observable<T> {
    if (baseFile.id) {
      return this.updateFile(baseFile, file);
    }
    return this.createFile(baseFile, file);
  }

  public getDocumentAvailable(documentSeries: number,
                              documentNumber: number,
                              documentType: DocumentType.PASSPORT | DocumentType.BIRTH_CERTIFICATE): Observable<BooleanWrapper> {
    return this._apiService.get(`${this._basePath}/document/available`, this._apiService.getHttpParamsFromObject({series: documentSeries, number: documentNumber, documentType})).pipe(
      map(x => plainToClass(BooleanWrapper, x))
    );
  }

  private _getFileFormData<T extends BaseFile>(baseFile: T, file: File): FormData {
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    formData.append('requestObj', new Blob([JSON.stringify(baseFile)], {type: 'application/json'}));
    return formData;
  }

}
