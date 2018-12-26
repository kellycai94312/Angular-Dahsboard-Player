import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Image} from '../../../data/remote/model/file/image/image';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {PropertyConstant} from '../../../data/local/property-constant';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {environment} from '../../../../environments/environment';
import {PermissionService} from '../../../shared/permission.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgxModalService} from '../../ngx-modal/service/ngx-modal.service';
import {IconEnum} from '../../ngx-button/model/icon-enum';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrls: ['./ngx-carousel.component.scss']
})
export class NgxCarouselComponent implements OnInit {

  public readonly imageType = ImageType;
  public readonly iconEnumClass = IconEnum;

  @ViewChild('fileInput')
  public fileInputElementRef: ElementRef;

  @Input()
  public class: string;

  @Input()
  public objectId: number;

  @Input()
  public fileClass: FileClass;

  @Input()
  public canAdd: boolean;

  public images: NameWrapper<Image>[];

  public currentImage: NameWrapper<Image>;
  public canEdit: boolean;

  private _fileDialogParameter: Image;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.class = '';
  }

  async ngOnInit() {
    await this.initialize();
  }

  public async initialize() {
    this.images = (await this._participantRestApiService.getImages({
      count: PropertyConstant.pageSizeMax,
      objectId: this.objectId,
      clazz: this.fileClass,
      type: ImageType.GALLERY
    })).list.map(x => this.mapImage(x));
    const logoImages = (await this._participantRestApiService.getImages({
      count: PropertyConstant.pageSizeMax,
      objectId: this.objectId,
      clazz: this.fileClass,
      type: ImageType.LOGO
    })).list.map(x => this.mapImage(x));

    let logoImage = null;
    if (logoImages.length) {
      logoImage = logoImages[0];
      this.images.push(logoImage);
    }
    if (this.images.length && !this.currentImage) {
      if (logoImage) {
        this.currentImage = logoImage;
      } else {
        this.currentImage = this.images[0];
      }
      await this.refreshCanEdit();
    }
  }

  public async onPrevious() {
    let index = this.images.indexOf(this.currentImage);
    if (index - 1 >= 0) {
      index--;
    } else {
      index = this.images.length - 1;
    }
    this.currentImage = this.images[index];
    await this.refreshCanEdit();
  }

  public async onNext() {
    let index = this.images.indexOf(this.currentImage);
    if (index + 1 < this.images.length) {
      index++;
    } else {
      index = 0;
    }
    this.currentImage = this.images[index];
    await this.refreshCanEdit();
  }

  public async setCurrentImageIndex(item: NameWrapper<Image>) {
    this.currentImage = item;
    await this.refreshCanEdit();
  }

  public async refreshCanEdit() {
    if (this.images.length) {
      this.canEdit = await this._permissionService.canEditFile(this.currentImage.data);
    } else {
      this.canEdit = false;
    }
  }

  public onAddImage = async () => {
    const image = new Image();
    image.type = ImageType.GALLERY;
    image.clazz = this.fileClass;
    image.objectId = this.objectId;

    this.openFileDialog(image);
  };

  public onEditLogoImage = async (item: Image) => {
    item.type = ImageType.LOGO;
    await this._participantRestApiService.updateFile(item, null);
    this.currentImage = null;
    await this.initialize();
  };

  public onRemoveImage = async (item: NameWrapper<Image>) => {
    await this._participantRestApiService.removeFile({fileId: item.data.id});
    await this.onPrevious();
    this._appHelper.removeItem(this.images, item);
  };

  public async onImageChange(fileList: FileList) {
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const isNew = this._appHelper.isNewObject(this._fileDialogParameter);
      if (isNew) {
        await this._participantRestApiService.uploadFile(this._fileDialogParameter, [file]);
      } else {
        await this._participantRestApiService.updateFile(this._fileDialogParameter, file);
      }
      await this.initialize();
      if (isNew) {
        await this.onNext();
      }
    }
  }

  public async onShowImage(image: Image) {
    await this._ngxModalService.showFullImage(image);
  }

  private openFileDialog(data: Image): void {
    this._fileDialogParameter = data;
    this.fileInputElementRef.nativeElement.dispatchEvent(new MouseEvent('click', {bubbles: false}));
  }

  private mapImage(image: Image): NameWrapper<Image> {
    const nameWrapper = new NameWrapper<Image>();
    nameWrapper.data = image;
    nameWrapper.name = `${environment.restUrl}/file/download/image/${image.id}?date=${Math.random() * Date.now()}`;
    return nameWrapper;
  }

}
