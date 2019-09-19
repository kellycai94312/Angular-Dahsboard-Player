import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CropperPosition } from 'ngx-image-cropper';
import { ImageFormat } from '../../../data/local/image-format';
import { IdentifiedObject } from '../../../data/remote/base';
import { FileClass } from '../../../data/remote/model/file/base';
import { Image, ImageType } from '../../../data/remote/model/file/image';
import { FileObject } from '../../../data/remote/model/file/object';
import { FileApiService } from '../../../data/remote/rest-api/api/file/file-api.service';
import { ImageQuery } from '../../../data/remote/rest-api/api/file/model/image-query';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { NgxCropImageComponent } from '../../../module/ngx/ngx-crop-image/ngx-crop-image/ngx-crop-image.component';
import { TemplateModalService } from '../../../service/template-modal.service';
import { AppHelper } from '../../../utils/app-helper';
import { NgxModalService } from '../../ngx-modal/service/ngx-modal.service';

// TODO: Fix this component!
@Component({
  selector: 'ngx-image',
  templateUrl: './ngx-image.component.html',
  styleUrls: ['./ngx-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxImageComponent implements OnInit, OnChanges {

  public readonly imageFormatClass = ImageFormat;

  @Input()
  public object: IdentifiedObject;

  @Input()
  public type: ImageType;

  @Input()
  public fileClass: FileClass;

  @Input()
  public class = '';

  @Input()
  public canEdit: boolean;

  @Input()
  public allowFullScreen: boolean;

  @Input()
  public format = ImageFormat.CIRCLE;

  @Output()
  public readonly imageChange = new EventEmitter<File>();

  @Input()
  public autoWidth: boolean;

  @Input()
  public autoHeight: boolean;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public autoSave = true;

  @Input()
  public cropImage: boolean;

  @Input()
  public fileObject: FileObject;

  @Input()
  public url: string;

  @Input()
  public cropped = true;

  @Input()
  public aspectRatio = 1;

  public innerUrl: string;
  public innerWidth = '100%';
  public innerHeight = '100%';
  private _parentElementRef: HTMLElement;
  private _initialized: boolean;
  private _tempFile: File;
  private _tempNgxCropImageComponent: NgxCropImageComponent;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _elementRef: ElementRef,
              private _fileApiService: FileApiService,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _changeDetectorRef: ChangeDetectorRef,
              private _ngZone: NgZone,
              private _ngxModalService: NgxModalService) {
  }

  public async ngOnInit(): Promise<void> {
    this._parentElementRef = this._elementRef.nativeElement.parentElement;
    await this._appHelper.delay();
    this._initialized = true;

    this.refresh();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this._initialized) {
      this.refresh();
    }
  }

  public async onImageChange(fileList: FileList): Promise<void> {
    if (fileList.length > 0) {
      this._tempFile = fileList[0];
      if (this.autoSave && !await this.save(this._tempFile)) {
        return;
      }
      this.imageChange.emit(this._tempFile);
      this.refresh();
    }
  }

  public async save(file?: File, notify = true): Promise<boolean> {
    if (this.cropImage) {
      if (!this.autoSave && this._tempNgxCropImageComponent) {
        this._tempNgxCropImageComponent.object = this.object;
        await this._tempNgxCropImageComponent.onSave();
        this.imageChange.emit();
        this.refresh();
      }
    } else {
      file = file || this._tempFile;
      if (!file) {
        return;
      }

      return this._appHelper.trySave(async () => {
        const fileObject = this._fileApiService.getFileObjectByFileClass(this.fileClass);
        const image = new Image();
        image.type = this.type;
        fileObject.file = image;
        fileObject.object = this.object;

        await this._fileApiService.createFile(fileObject, file).toPromise();

        delete this._tempFile;
      }, notify);
    }
  }

  public refresh(): void {
    this._ngZone.runOutsideAngular(() => {
      const width = this.width || this._parentElementRef.clientWidth;
      const height = this.height || this._parentElementRef.clientHeight;

      let url = '';

      if (this._tempFile) {
        url = URL.createObjectURL(this._tempFile);
      } else {
        const imageQuery: ImageQuery = {type: this.type};

        if (!this._appHelper.isUndefinedOrNull(width)) {
          imageQuery.width = width;
        }
        if (!this._appHelper.isUndefinedOrNull(height)) {
          imageQuery.height = height;
        }
        if (this.fileObject) {
          let image = this.fileObject.file as Image;
          if (this.cropped && image.croppedImage) {
            image = image.croppedImage;
          }
          url = `${this._fileApiService.getImageByIdUrl(image, imageQuery)}&date=${Date.now()}`;
        } else {
          url = `${this._fileApiService.getImageUrl(this.fileClass, this.object, imageQuery)}&date=${Date.now()}`;
        }
        if (this.cropped) {
          url += '&cropped=true';
        }
      }

      if (!this.autoWidth) {
        this.innerWidth = `${width}px`;
      }
      if (!this.autoHeight) {
        this.innerHeight = `${height}px`;
      }

      this.innerUrl = this.url || url;
      this._changeDetectorRef.markForCheck();
    });
  }

  public async onShowImage(): Promise<void> {
    if (this.allowFullScreen) {
      if (this.fileObject) {
        await this._ngxModalService.showFullImage(this.fileObject.file as Image);
      } else {
        await this._ngxModalService.showFullImage(this.object.id || 0, this.type, this.fileClass);
      }
    }
  }

  public async onEditImage(elem: HTMLInputElement): Promise<void> {
    if (this.cropImage) {
      let imageBase64;
      let imagePosition: CropperPosition;
      let file: File;

      let fileObject = this._fileApiService.getFileObjectByFileClass(this.fileClass);
      const image = new Image();
      image.type = this.type;
      fileObject.file = image;
      fileObject.object = this.object;

      if (this._tempNgxCropImageComponent) {
        imageBase64 = this._tempNgxCropImageComponent.imageBase64;
        imagePosition = this._tempNgxCropImageComponent.imagePosition;
        file = this._tempNgxCropImageComponent.file;
      } else {
        const images = (await this._fileApiService.getFilePage(this.fileClass, this.object, {imageType: this.type, count: 1}).toPromise()).list;
        if (images.length) {
          fileObject = images[0];
          if (image.croppedImage) {
            imagePosition = {
              x1: image.croppedImage.x1,
              y1: image.croppedImage.y1,
              x2: image.croppedImage.x2,
              y2: image.croppedImage.y2
            };
          }
        }
      }

      const dialogResult = await this._templateModalService.showCropImageModal(this.fileObject || fileObject, this.format, imageBase64, imagePosition, file, {componentFactoryResolver: this._componentFactoryResolver}, this.autoSave, this.aspectRatio);
      if (dialogResult.result) {
        if (!this.autoSave) {
          this._ngZone.runOutsideAngular(() => {
            this._tempNgxCropImageComponent = dialogResult.data;
            this.innerUrl = this._tempNgxCropImageComponent.croppedImage;

            this._changeDetectorRef.markForCheck();
          });
        } else {
          this.imageChange.emit();
          this.refresh();
        }
      }
    } else {
      elem.click();
    }
  }

}
