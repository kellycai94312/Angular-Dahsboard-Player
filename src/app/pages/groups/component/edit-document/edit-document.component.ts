import {Component} from '@angular/core';
import {Document} from '../../../../data/remote/model/file/document/document';
import {DocumentType} from '../../../../data/remote/model/file/document/document-type';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {TranslateObjectService} from '../../../../shared/translate-object.service';

// @Component({
//   selector: 'app-edit-document',
//   templateUrl: './edit-document.component.html',
//   styleUrls: ['./edit-document.component.scss']
// })
export class EditDocumentComponent extends BaseEditComponent<Document> {

  public readonly propertyConstant = PropertyConstant;

  public documentTypes: NameWrapper<DocumentType>[];
  public selectedFileName: string;
  public selectedDocumentType: NameWrapper<DocumentType>;

  private _file: File;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
    super(participantRestApiService, appHelper);
  }

  async initialize(obj: Document): Promise<boolean> {
    await super.initialize(obj);

    this.documentTypes = await this._translateObjectService.getTranslatedEnumCollection<DocumentType>(DocumentType, 'DocumentTypeEnum');
    this.selectedDocumentType = this.documentTypes.find(x => x.data === this.data.type);

    if (obj && obj.resource !== undefined) {
      this.selectedFileName = obj.resource.name;
    }
    return true;
  }

  public async onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length) {
      this._file = fileList[0];
      this.selectedFileName = this._file.name;
    }
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      this.data.type = this.selectedDocumentType.data;

      if (this.appHelper.isNewObject(this.data)) {
        this.data = (await this.participantRestApiService.uploadFile(this.data, [this._file]))[0];
      } else {
        this.data = await this.participantRestApiService.updateFile(this.data, this._file);
      }
    });
  }

  public async onRemove(): Promise<boolean> {
    return this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removeFile({fileId: this.data.id});
    });
  }

}
