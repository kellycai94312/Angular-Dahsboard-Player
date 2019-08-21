import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {DocumentType} from '../../../model/file/document/document-type';
import {BooleanWrapper} from '../../../bean/wrapper/boolean-wrapper';
import {DocumentQuery} from '../../query/file/document-query';
import {PageContainer} from '../../../bean/page-container';
import {Document} from '../../../model/file/document/document';
import {BaseFile} from '../../../model/file/base/base-file';
import {UtilService} from '../../../../../services/util/util.service';
import {ImageQuery} from '../../query/file/image-query';
import {Image} from '../../../model/file/image/image';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  private readonly _basePath = `${environment.restUrl}/file`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService) {
  }

  public getDocuments(query: DocumentQuery): Observable<PageContainer<Document>> {
    return this._apiService.getPageContainer(Document, `${this._basePath}/document`, query);
  }

  public getImages(query: ImageQuery): Observable<PageContainer<Image>> {
    return this._apiService.getPageContainer(Image, `${this._basePath}/image`, query);
  }

  public createFile<T extends BaseFile>(baseFile: T, file?: File): Observable<T> {
    return this._apiService.createValue(BaseFile, this._basePath, this._getFileFormData(baseFile, file)) as Observable<T>;
  }

  public updateFile<T extends BaseFile>(baseFile: T, file?: File): Observable<T> {
    return this._apiService.updateValue(BaseFile, `${this._basePath}/${baseFile.id}`, this._getFileFormData(baseFile, file)) as Observable<T>;
  }

  public saveFile<T extends BaseFile>(baseFile: T, file?: File): Observable<T> {
    if (baseFile.id) {
      return this.updateFile(baseFile, file);
    }
    return this.createFile(baseFile, file);
  }

  public getDocumentAvailable(document: Document,
                              documentSeries: number,
                              documentNumber: number,
                              documentType: DocumentType.PASSPORT | DocumentType.BIRTH_CERTIFICATE): Observable<BooleanWrapper> {
    return this._apiService.get(`${this._basePath}/document/available`, this._apiService.getHttpParamsFromObject(this._utilService.clone({
        documentId: document.id || void 0,
        series: documentSeries,
        number: documentNumber,
        documentType
      }, {excludeNullable: true}))
    )
      .pipe(
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
