import {Component, ElementRef, ViewChild} from '@angular/core';
import {CropperPosition, ImageCroppedEvent} from 'ngx-image-cropper';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ImageQuery} from '../../../../data/remote/rest-api/query/file/image-query';
import {Image} from '../../../../data/remote/model/file/image/image';
import {ImageCropRequest} from '../../../../data/remote/request/image-crop-request';

@Component({
  selector: 'app-ngx-edit-image',
  templateUrl: './ngx-crop-image.component.html',
  styleUrls: ['./ngx-crop-image.component.scss']
})
export class NgxCropImageComponent {

  @ViewChild('fileInputElement')
  public fileInput: ElementRef;

  public cropperPosition: CropperPosition = {x1: 0, y1: 0, x2: 0, y2: 0};
  public croppedImage: any;
  public imageChangedEvent: any;
  public imageBase64: any;

  private _image: Image;
  private _objectId: number;
  private _type: ImageType;
  private _fileClass: FileClass;
  private _imageCroppedEvent: ImageCroppedEvent;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  public async initialize(obj: IdentifiedObject,
                          type: ImageType,
                          fileClass: FileClass): Promise<boolean> {
    return await this._appHelper.tryLoad(async () => {
      this._objectId = obj.id;
      this._type = type.toString().replace('CROPPED_', '') as ImageType;
      this._fileClass = fileClass;

      const query: ImageQuery = {
        objectId: this._objectId,
        type: this._type,
        clazz: this._fileClass,
        count: 1
      };

      const originalImages = (await this._participantRestApiService.getImages(query)).list;
      if (originalImages.length) {
        this._image = originalImages[0];

        const urlImage = this._participantRestApiService.getUrlImage(query);
        this.imageBase64 = await this._participantRestApiService.getDataUrl(urlImage);
      }

      query.type = type;
      const croppedImages = (await this._participantRestApiService.getImages(query)).list;

      if (croppedImages.length) {
        const croppedImage = croppedImages[0];
        if (croppedImage.x1 != null && croppedImage.x2 != null) {
          this.cropperPosition = {
            x1: croppedImage.x1,
            y1: croppedImage.y1,
            x2: croppedImage.x2,
            y2: croppedImage.y2
          };
        }
      }
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    delete this._image;
  }

  imageCropped(event: ImageCroppedEvent) {
    this._imageCroppedEvent = event;
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // TODO: show cropper
  }

  cropperReady() {
    // TODO: cropper ready
  }

  loadImageFailed() {
    // TODO: show message
  }

  public onUploadImage(): void {
    this.fileInput.nativeElement.click();
  }

  public async onSave(): Promise<boolean> {
    return await this._appHelper.trySave(async () => {
      if (!this._image) {
        this._image = new Image();
        this._image.objectId = this._objectId;
        this._image.type = this._type;
        this._image.clazz = this._fileClass;

        this._image = (await this._participantRestApiService.uploadFile(this._image, [this.imageChangedEvent.target.files[0]]))[0];
      }

      this._image = await this._participantRestApiService.cropImage({
        x1: this._imageCroppedEvent.cropperPosition.x1,
        y1: this._imageCroppedEvent.cropperPosition.y1,
        x2: this._imageCroppedEvent.cropperPosition.x2,
        y2: this._imageCroppedEvent.cropperPosition.y2
      } as ImageCropRequest, {}, {imageId: this._image.id});
    });
  }

}
