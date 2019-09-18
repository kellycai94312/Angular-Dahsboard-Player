import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {Image} from '../../../data/remote/model/file/image/image';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {PropertyConstant} from '../../../data/local/property-constant';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {environment} from '../../../../environments/environment';
import {PermissionService} from '../../../shared/permission.service';
import {AppHelper} from '../../../utils/app-helper';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {ImageFormat} from '../../../data/local/image-format';
import {TemplateModalService} from '../../../service/template-modal.service';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrls: ['./ngx-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxCarouselComponent implements OnInit {

  @ViewChild('fileInput', { static: false })
  public fileInputElementRef: ElementRef;

  @Input()
  public class = '';

  @Input()
  public object: IdentifiedObject;

  @Input()
  public fileClass: FileClass;

  @Input()
  public canEdit: boolean;

  @Input()
  public width = 360;

  @Input()
  public height = 300;

  public readonly imageTypeClass = ImageType;
  public readonly imageFormatClass = ImageFormat;
  public images: NameWrapper<Image>[] = [];
  public currentImage: NameWrapper<Image>;
  public defaultImageUrl = 'assets/img/default.png';
  private _fileDialogParameter: Image;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService,
              private _templateModalService: TemplateModalService,
              private _appHelper: AppHelper,
              private _ngZone: NgZone,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  async ngOnInit() {
    await this.initialize();
  }

  public async initialize() {
    await this._ngZone.runOutsideAngular(async () => {
      delete this.currentImage;
      this.images = (await this._participantRestApiService.getImages({
        count: PropertyConstant.pageSizeMax,
        objectId: this.object.id,
        clazz: this.fileClass,
        type: ImageType.GALLERY,
        cropped: true
      })).list.map(x => this.mapImage(x));

      if (this.images.length && !this.currentImage) {
        this.currentImage = this.images[0];
      }

      this._changeDetectorRef.markForCheck();
    });
  }

  public onPrevious() {
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

  public onNext() {
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

  public async setCurrentImageIndex(item: NameWrapper<Image>) {
    this.currentImage = item;
  }

  public async onAddImage(): Promise<void> {
    const image = new Image();
    // image.objectId = this.object.id;
    image.type = ImageType.GALLERY;
    image.clazz = this.fileClass;

    await this._templateModalService.showCropImageModal(image, ImageFormat.SQUARE, null, null, null, null, true, 11 / 6);
    await this.initialize();
  }

  public async onRemoveImage(item: NameWrapper<Image>): Promise<void> {
    await this._participantRestApiService.removeFile({fileId: item.data.id});
    await this.onPrevious();
    this._appHelper.removeItem(this.images, item);
  }

  public async onImageChange(fileList: FileList) {
    if (fileList.length) {
      const file: File = fileList[0];
      const isNew = this._appHelper.isNewObject(this._fileDialogParameter);
      if (isNew) {
        await this._participantRestApiService.uploadFile(this._fileDialogParameter, file);
      } else {
        await this._participantRestApiService.updateFile(this._fileDialogParameter, file);
      }
      await this.initialize();
      if (isNew) {
        await this.onNext();
      }
    }
  }

  public async onChangeImage(): Promise<void> {
    await this.initialize();
  }

  private openFileDialog(data: Image): void {
    this._fileDialogParameter = data;
    this.fileInputElementRef.nativeElement.dispatchEvent(new MouseEvent('click', {bubbles: false}));
  }

  private mapImage(image: Image): NameWrapper<Image> {
    const nameWrapper = new NameWrapper<Image>();
    nameWrapper.data = image;
    nameWrapper.name = `${environment.restUrl}/file/download/image/${image.id}?cropped=true&date=${Math.random() * Date.now()}`;
    return nameWrapper;
  }

}
