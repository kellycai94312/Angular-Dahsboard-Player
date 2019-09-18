import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';
import { ImageFormat } from '../../../../data/local/image-format';
import { FileClass } from '../../../../data/remote/model/file/base/file-class';
import { Image } from '../../../../data/remote/model/file/image/image';
import { ImageType } from '../../../../data/remote/model/file/image/image-type';
import { ImageCropRequest } from '../../../../data/remote/request/image-crop-request';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { ImageQuery } from '../../../../data/remote/rest-api/query/file/image-query';
import { AppHelper } from '../../../../utils/app-helper';

@Component({
  selector: 'app-ngx-edit-image',
  templateUrl: './ngx-crop-image.component.html',
  styleUrls: ['./ngx-crop-image.component.scss']
})
export class NgxCropImageComponent {

  @ViewChild(ImageCropperComponent, { static: false })
  public imageCropperComponent: ImageCropperComponent;

  @ViewChild('fileInputElement', { static: false })
  public fileInput: ElementRef;

  @Input()
  public format: ImageFormat;

  public readonly imageFormatClass = ImageFormat;
  public croppedImage: any;
  public imageChangedEvent: any;
  public imageBase64: any;
  public cropper: CropperPosition = {x1: 0, y1: 0, x2: 0, y2: 0};
  public imagePosition: CropperPosition;
  public file: File;
  public objectId: number;
  public aspectRatio: number;

  private _image: Image;
  private _type: ImageType;
  private _croppedImageType: ImageType;
  private _fileClass: FileClass;
  private _imageCroppedEvent: ImageCroppedEvent;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  public async initialize(image: Image,
                          format: ImageFormat,
                          imageBase64?: any,
                          imagePosition?: CropperPosition,
                          file?: File): Promise<boolean> {
    return this._appHelper.tryLoad(async () => {
      // this.objectId = image.objectId;

      this._type = image.type;
      this._croppedImageType = image.type;
      this._fileClass = image.clazz;
      this.format = format;
      this.imageBase64 = imageBase64;
      this.imagePosition = imagePosition;
      this.file = file;

      if (!imageBase64 && image.id) {
        this._image = image;

        const urlImage = this._participantRestApiService.getUrlByImage(image);
        this.imageBase64 = await this._participantRestApiService.getDataUrl(urlImage);
      }
    });
  }

  public async imageLoaded() {
  }

  public async onCropperReady(): Promise<void> {
    let croppedImagePosition = this.imagePosition;
    if (!croppedImagePosition && this.objectId) {
      const query: ImageQuery = {
        objectId: this.objectId,
        type: this._croppedImageType,
        clazz: this._fileClass,
        count: 1
      };
      const croppedImages = (await this._participantRestApiService.getImages(query)).list;
      if (croppedImages.length) {
        const croppedImage = croppedImages[0];
        croppedImagePosition = {
          x1: croppedImage.x1,
          y1: croppedImage.y1,
          x2: croppedImage.x2,
          y2: croppedImage.y2
        };
      }
    }

    if (croppedImagePosition) {
      if (croppedImagePosition.x1 != null && croppedImagePosition.x2 != null) {
        const maxSize = (this.imageCropperComponent as any).maxSize;
        const originalSize = (this.imageCropperComponent as any).originalSize;
        const offsetWidth = maxSize.width / originalSize.width;
        const offsetHeight = maxSize.height / originalSize.height;

        this.cropper = {
          x1: croppedImagePosition.x1 * offsetWidth,
          y1: croppedImagePosition.y1 * offsetHeight,
          x2: croppedImagePosition.x2 * offsetWidth,
          y2: croppedImagePosition.y2 * offsetHeight
        };
      }
    }
  }

  public imageCropped(event: ImageCroppedEvent) {
    this._imageCroppedEvent = event;
    this.imagePosition = event.imagePosition;
    this.croppedImage = event.base64;
  }

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    delete this._image;

    this.file = event.target.files[0];
    this.getBase64(this.file)
      .subscribe(value => {
        this.imageBase64 = value;
      });
  }

  public onUploadImage(): void {
    this.fileInput.nativeElement.click();
  }

  public async onSave(): Promise<boolean> {
    return this._appHelper.trySave(async () => {
      if (!this._image || !this._image.id) {
        this._image = new Image();
        // this._image.objectId = this.objectId;
        this._image.type = this._type;
        this._image.clazz = this._fileClass;

        this._image = (await this._participantRestApiService.uploadFile(this._image, this.file));
      }

      this._image = await this._participantRestApiService.cropImage({
        x1: this.imagePosition.x1,
        y1: this.imagePosition.y1,
        x2: this.imagePosition.x2,
        y2: this.imagePosition.y2
      } as ImageCropRequest, {}, {imageId: this._image.id});
    });
  }

  private getBase64<T extends string | ArrayBuffer | null>(blob: Blob): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function () {
        observer.next(reader.result as T);
        observer.complete();
      };
      reader.onerror = function (error) {
        observer.error(error);
      };
    });
  }

}
