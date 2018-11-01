import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseFile} from '../../../data/remote/model/file/base/base-file';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {DocumentQuery} from '../../../data/remote/rest-api/query/file/document-query';
import {Resource} from '../../../data/remote/model/file/resource';
import {AppHelper} from '../../../utils/app-helper';
import {ChangeWatcher} from '../../../data/local/util/change-watcher';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent<T extends BaseFile> {

  @Input('class')
  public classes: string;

  @Input()
  public documentQuery: DocumentQuery;

  @Input()
  public baseFile: T;

  @Output()
  public baseFileChange: EventEmitter<T>;

  public url: string;
  private readonly _changeWatcher: ChangeWatcher;
  private readonly _baseFileName: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.baseFileChange = new EventEmitter<T>();
    this.classes = '';
    this._changeWatcher = new ChangeWatcher(this._appHelper);
    this._baseFileName = 'baseFile';
  }

  public async initialize(): Promise<boolean> {
    if (!this.documentQuery || !this.documentQuery.objectId || !this.documentQuery.clazz) {
      return false;
    }

    const pageContainer = await this._participantRestApiService.getDocuments(this.documentQuery);
    if (pageContainer.list.length) {
      this.baseFile = <any>pageContainer.list[0];
      this.baseFileChange.emit(this.baseFile);
    } else if (!this.baseFile) {
      this.baseFile = Object.create(<T>{});
      this.baseFileChange.emit(this.baseFile);
    }
    this._changeWatcher.addOrUpdate(this._baseFileName, this.baseFile);
    return true;
  }

  public async onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length) {
      this.baseFile.resource = this.baseFile.resource || new Resource();
      const file = fileList[0];
      this.baseFile.resource.file = file;
      this.baseFile.resource.name = file.name;
    }
  }

  public async updateFile() {
    if (this._appHelper.isNewObject(this.baseFile)) {
      const baseFile = (await this._participantRestApiService.uploadFile(this.baseFile, this.baseFile.resource && this.baseFile.resource.file ? [this.baseFile.resource.file] : null))[0];
      this._appHelper.updateObject(this.baseFile, baseFile);
    } else {
      const baseFile = await this._participantRestApiService.updateFile(this.baseFile, this.baseFile.resource && this.baseFile.resource.file ? this.baseFile.resource.file : null);
      this._appHelper.updateObject(this.baseFile, baseFile);

      try {
        if (!this.baseFile.resource) {
          await this._participantRestApiService.removeFileResource({fileId: this.baseFile.id});
        }
      } catch (e) {
      }
    }

    this.baseFileChange.emit(this.baseFile);
  }

  public hasChanges(): boolean {
    return this._changeWatcher.hasChanges();
  }

  public onRemoveFile() {
    delete this.baseFile.resource;
    this.baseFileChange.emit(this.baseFile);
  }

}
