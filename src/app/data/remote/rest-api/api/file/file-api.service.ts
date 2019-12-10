import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { UtilService } from '../../../../../services/util/util.service';
import { IdentifiedObject } from '../../../base';
import { PageContainer } from '../../../bean/page-container';
import { SingleAttributeWrapper } from '../../../bean/wrapper/single-attribute-wrapper';
import { FileClass } from '../../../model/file/base';
import { File as ServerFile } from '../../../model/file/file';
import { Image } from '../../../model/file/image';
import {
  FileApplication,
  FileChat,
  FileDevice,
  FileEvent,
  FileFileMessageContent,
  FileGroup,
  FileGroupNews,
  FileGroupStorage,
  FileObject,
  FileParameter,
  FilePerson,
  FilePersonNews,
  FilePersonStorage,
  FileSportType,
  FileUnit
} from '../../../model/file/object';
import { ApiService } from '../base/api.service';
import { FileQuery, ImageCropRequest, ImageQuery } from './model';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  private readonly _basePath = `${environment.restUrl}/file`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService) {
  }

  public getFilePage<T extends FileObject>(fileClass: FileClass,
                                           object: IdentifiedObject,
                                           query?: FileQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(FileObject, `${this._basePath}/${fileClass}/${object.id}`, query) as Observable<PageContainer<T>>;
  }

  public getAvailableSpace(fileClass: FileClass,
                           object: IdentifiedObject): Observable<number> {
    return this._apiService.getValue(SingleAttributeWrapper, `${this._basePath}/${fileClass}/${object.id}/available`).pipe(map(value => value.value as number));
  }

  public getImageUrl(fileClass: FileClass,
                     object: IdentifiedObject,
                     query: ImageQuery): string {
    const url = `${this._basePath}/${fileClass}/${object.id}/download/image`;
    const httpParams = this._apiService.getHttpParamsFromObject(query);
    if (httpParams) {
      return `${url}?${httpParams.toString()}`;
    }

    return url;
  }

  public getImageByIdUrl(fileClass: FileClass,
                         object: IdentifiedObject,
                         image: Image,
                         query?: { width?: number, height?: number }): string {
    const url = `${this._basePath}/${fileClass}/${object.id}/download/image/${image.id}`;
    const httpParams = this._apiService.getHttpParamsFromObject(query);
    if (httpParams) {
      return `${url}?${httpParams.toString()}`;
    }

    return url;
  }

  public getFileByIdUrl(file: ServerFile): string {
    return `${this._basePath}/${file.ownerFileObject.fileClass}/${file.id}/download/file`;
  }

  public createFile<T extends FileObject>(value: T, file?: File): Observable<T> {
    return this._apiService.createValue(FileObject, this._basePath, this.getFileFormData(value, file)) as Observable<T>;
  }

  public updateFile<T extends FileObject>(value: T, file?: File): Observable<T> {
    return this._apiService.updateValue(FileObject, `${this._basePath}/${value.fileClass}/${value.object.id}/${value.id}`, this.getFileFormData(value, file)) as Observable<T>;
  }

  public saveFile<T extends FileObject>(value: T, file?: File): Observable<T> {
    if (value.id) {
      return this.updateFile(value, file);
    }
    return this.createFile(value, file);
  }

  public removeFile<T extends FileObject>(value: T): Observable<null> {
    return this._apiService.removeValue(void 0, `${this._basePath}/${value.fileClass}/${value.object}/${value.id}`) as Observable<null>;
  }

  public cropImage(image: Image, value: ImageCropRequest): Observable<Image> {
    return this._apiService.createValue(Image, `${this._basePath}/${image.ownerFileObject.fileClass}/${image.ownerFileObject.object.id}/${image.id}/crop`, value) as Observable<Image>;
  }

  public getFileObjectByFileClass(fileClass: FileClass): FileObject<any> | undefined {
    switch (fileClass) {
      case FileClass.APPLICATION:
        return new FileApplication();
      case FileClass.CHAT:
        return new FileChat();
      case FileClass.DEVICE:
        return new FileDevice();
      case FileClass.EVENT:
        return new FileEvent();
      case FileClass.FILE_MESSAGE_CONTENT:
        return new FileFileMessageContent();
      case FileClass.GROUP:
        return new FileGroup();
      case FileClass.GROUP_NEWS:
        return new FileGroupNews();
      case FileClass.GROUP_STORAGE:
        return new FileGroupStorage();
      case FileClass.PARAMETER:
        return new FileParameter();
      case FileClass.PERSON:
        return new FilePerson();
      case FileClass.PERSON_NEWS:
        return new FilePersonNews();
      case FileClass.PERSON_STORAGE:
        return new FilePersonStorage();
      case FileClass.SPORT_TYPE:
        return new FileSportType();
      case FileClass.UNIT:
        return new FileUnit();
      default:
        return void 0;
    }
  }

  public async getDataUrl(url: string): Promise<any> {
    return fetch(url, {credentials: 'include', cache: 'no-cache'})
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  public getFileFormData<T extends any>(value: T, file?: File): FormData {
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    // TODO: Use serialize method
    formData.append('requestObj', new Blob([JSON.stringify(value)], {type: 'application/json'}));
    return formData;
  }

}
