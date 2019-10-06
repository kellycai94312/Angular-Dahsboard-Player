import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';
import { ImageFormat } from '../../../../data/local/image-format';
import { IdentifiedObject } from '../../../../data/remote/base';
import { FileClass } from '../../../../data/remote/model/file/base';
import { Image, ImageType } from '../../../../data/remote/model/file/image';
import { FileObject } from '../../../../data/remote/model/file/object';
import { FileApiService } from '../../../../data/remote/rest-api/api/file/file-api.service';
import { AppHelper } from '../../../../utils/app-helper';

@Component({
  selector: 'app-ngx-edit-image',
  templateUrl: './ngx-crop-image.component.html',
  styleUrls: ['./ngx-crop-image.component.scss']
})
export class NgxCropImageComponent {

  @ViewChild(ImageCropperComponent, {static: false})
  public imageCropperComponent: ImageCropperComponent;

  @ViewChild('fileInputElement', {static: true})
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
  public object: IdentifiedObject;
  public aspectRatio: number;
  private _image: FileObject;
  private _type: ImageType;
  private _croppedImageType: ImageType;
  private _fileClass: FileClass;
  private _imageCroppedEvent: ImageCroppedEvent;

  constructor(private _fileApiService: FileApiService,
              private _appHelper: AppHelper) {
  }

  public async initialize(fileObject: FileObject,
                          format: ImageFormat,
                          imageBase64?: any,
                          imagePosition?: CropperPosition,
                          file?: File): Promise<boolean> {
    return this._appHelper.tryLoad(async () => {
      this.object = fileObject.object;

      const image = fileObject.file as Image;
      this._type = image.type;
      this._croppedImageType = image.type;
      this._fileClass = fileObject.fileClass;
      this.format = format;
      this.imageBase64 = imageBase64;
      this.imagePosition = imagePosition;
      this.file = file;

      if (!imageBase64 && fileObject.id) {
        this._image = fileObject;

        const urlImage = this._fileApiService.getImageUrl(this._fileClass, this.object, {
          type: this._type,
          cropped: false
        });
        this.imageBase64 = await this._fileApiService.getDataUrl(urlImage);
      }
    });
  }

  public imageLoaded(): void {
  }

  public async onCropperReady(): Promise<void> {
    let croppedImagePosition = this.imagePosition;
    if (!croppedImagePosition && this.object) {
      const fileObject = (await this._fileApiService.getFilePage(this._fileClass, this.object, {
        imageType: this._croppedImageType,
        count: 1
      }).toPromise()).list;
      if (fileObject.length) {
        const croppedImage = (fileObject[0].file as Image).croppedImage;
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

  public imageCropped(event: ImageCroppedEvent): void {
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
    if (!this._image || !this._image.id) {
      this._image = this._fileApiService.getFileObjectByFileClass(this._fileClass);
      const image = new Image();
      image.type = this._type;
      this._image.file = image;
      this._image.object = this.object;

      this._image = await this._fileApiService.createFile(this._image, this.file).toPromise();
    }

    this._image.file = await this._fileApiService.cropImage(this._image.file as Image, {
      x1: this.imagePosition.x1,
      y1: this.imagePosition.y1,
      x2: this.imagePosition.x2,
      y2: this.imagePosition.y2
    }).toPromise();
    return this._appHelper.trySave(async () => {

    });
  }

  private getBase64<T extends string | ArrayBuffer | null>(blob: Blob): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        observer.next(reader.result as T);
        observer.complete();
      };
      reader.onerror = error => observer.error(error);
    });
  }

}
