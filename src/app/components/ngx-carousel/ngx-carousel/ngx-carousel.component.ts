import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { ImageFormat } from '../../../data/local/image-format';
import { NameWrapper } from '../../../data/local/name-wrapper';
import { PropertyConstant } from '../../../data/local/property-constant';
import { IdentifiedObject } from '../../../data/remote/base';
import { FileClass } from '../../../data/remote/model/file/base';
import { Image, ImageType } from '../../../data/remote/model/file/image';
import { FileObject } from '../../../data/remote/model/file/object';
import { FileApiService } from '../../../data/remote/rest-api/api/file/file-api.service';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { TemplateModalService } from '../../../service/template-modal.service';
import { PermissionService } from '../../../shared/permission.service';
import { AppHelper } from '../../../utils/app-helper';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrls: ['./ngx-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxCarouselComponent implements OnInit {

  @ViewChild('fileInput', {static: true})
  public fileInputElementRef: ElementRef;

  @Input()
  public object: IdentifiedObject;

  @Input()
  public fileClass: FileClass;

  @Input()
  public canEdit: boolean;

  @Input()
  public height = 300;

  public readonly imageTypeClass = ImageType;
  public readonly imageFormatClass = ImageFormat;
  public images: NameWrapper<FileObject>[] = [];
  public currentImage: NameWrapper<FileObject>;
  public defaultImageUrl = 'assets/img/default.png';
  private _fileDialogParameter: FileObject;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService,
              private _fileApiService: FileApiService,
              private _templateModalService: TemplateModalService,
              private _appHelper: AppHelper,
              private _ngZone: NgZone,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  public async ngOnInit(): Promise<void> {
    await this.initialize();
  }

  public initialize(): void {
    this._ngZone.runOutsideAngular(() => {
      delete this.currentImage;

      this._fileApiService.getFilePage(this.fileClass, this.object, {
        imageType: ImageType.GALLERY,
        count: PropertyConstant.pageSizeMax
      })
        .subscribe(values => {
          this.images = values.list.map(value => new NameWrapper<FileObject>(value, this._fileApiService.getImageByIdUrl(this.fileClass, this.object, value.file as Image)));

          if (this.images.length && !this.currentImage) {
            this.currentImage = this.images[0];
          }

          this._changeDetectorRef.markForCheck();
        });
    });
  }

  public onPrevious(): void {
    this._ngZone.runOutsideAngular(() => {
      let index = this.images.length - 1;
      if (this.currentImage) {
        index = this.images.indexOf(this.currentImage);
        if (index - 1 >= 0) {
          index--;
        } else {
          index = this.images.length - 1;
        }
      }
      this.currentImage = this.images[index];

      this._changeDetectorRef.markForCheck();
    });
  }

  public onNext(): void {
    this._ngZone.runOutsideAngular(() => {
      let index = 0;
      if (this.currentImage) {
        index = this.images.indexOf(this.currentImage);
        if (index + 1 < this.images.length) {
          index++;
        } else {
          index = 0;
        }
      }
      this.currentImage = this.images[index];

      this._changeDetectorRef.markForCheck();
    });
  }

  public setCurrentImageIndex(item: NameWrapper<FileObject>): void {
    this.currentImage = item;
  }

  public async onAddImage(): Promise<void> {
    const fileObject = this._fileApiService.getFileObjectByFileClass(this.fileClass);
    const image = new Image();
    image.type = ImageType.GALLERY;
    fileObject.file = image;
    fileObject.object = this.object;

    await this._templateModalService.showCropImageModal(fileObject, ImageFormat.SQUARE, void 0, void 0, void 0, void 0, true, 11 / 6);
    await this.initialize();
  }

  public onRemoveImage(item: NameWrapper<FileObject>): void {
    this._fileApiService.removeFile(item.data).subscribe(async () => {
      await this.onPrevious();
      this._appHelper.removeItem(this.images, item);
    });
  }

  public async onImageChange(fileList: FileList): Promise<void> {
    if (fileList.length) {
      const file: File = fileList[0];
      const isNew = this._appHelper.isNewObject(this._fileDialogParameter);
      await this._fileApiService.saveFile(this._fileDialogParameter, file).toPromise();
      await this.initialize();
      if (isNew) {
        await this.onNext();
      }
    }
  }

  public async onChangeImage(): Promise<void> {
    await this.initialize();
  }

}
