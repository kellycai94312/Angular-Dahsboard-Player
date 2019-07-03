import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ImageFormat} from '../../../data/local/image-format';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {AppHelper} from '../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Image} from '../../../data/remote/model/file/image/image';
import {NgxModalService} from '../../ngx-modal/service/ngx-modal.service';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {ImageQuery} from '../../../data/remote/rest-api/query/file/image-query';
import {TemplateModalService} from '../../../service/template-modal.service';
import {NgxCropImageComponent} from '../../../module/ngx/ngx-crop-image/ngx-crop-image/ngx-crop-image.component';
import {CropperPosition} from 'ngx-image-cropper';

@Component({
  selector: 'ngx-image',
  templateUrl: './ngx-image.component.html',
  styleUrls: ['./ngx-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxImageComponent implements OnInit, OnChanges {

  public readonly imageFormatClass = ImageFormat;

  // TODO: Fix it
  @Input()
  public fixForCarousel: boolean;

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
  public width: number;

  @Input()
  public height: number;

  @Input()
  public autoSave = true;

  @Input()
  public cropImage: boolean;

  @Input()
  public image: Image;

  @Input()
  public url: string;

  public innerUrl: string;
  public innerWidth = 0;
  public innerHeight = 0;
  private _parentElementRef: HTMLElement;
  private _initialized: boolean;
  private _tempFile: File;
  private _tempNgxCropImageComponent: NgxCropImageComponent;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _elementRef: ElementRef,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _changeDetectorRef: ChangeDetectorRef,
              private _ngZone: NgZone,
              private _ngxModalService: NgxModalService) {
  }

  async ngOnInit() {
    this._parentElementRef = this._elementRef.nativeElement.parentElement;
    await this._appHelper.delay();
    this._initialized = true;

    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._initialized) {
      this.refresh();
    }
  }

  public async onImageChange(fileList: FileList) {
    if (fileList.length > 0) {
      this._tempFile = fileList[0];
      if (this.autoSave && !await this.save(this._tempFile)) {
        return;
      }
      this.imageChange.emit(this._tempFile);
      this.refresh();
    }
  }

  public async save(file: File = null, notify: boolean = true): Promise<boolean> {
    if (this.cropImage) {
      if (!this.autoSave && this._tempNgxCropImageComponent) {
        this._tempNgxCropImageComponent.objectId = this.object.id;
        await this._tempNgxCropImageComponent.onSave();
        this.imageChange.emit();
        this.refresh();
      }
    } else {
      file = file || this._tempFile;
      if (!file) {
        return;
      }
      return await this._appHelper.trySave(async () => {
        const image = new Image();
        image.clazz = this.fileClass;
        image.objectId = this.object.id;
        image.type = this.type;
        await this._participantRestApiService.uploadFile(image, [file]);

        this._tempFile = null;
      }, notify);
    }
  }

  public refresh() {
    this._ngZone.runOutsideAngular(() => {
      let minSide = 0;
      if (this.fixForCarousel) {
        this.innerWidth = this.width;
        this.innerHeight = this.height;
      } else {
        if (this.width || this.height) {
          minSide = Math.min(this.width, this.height);
        } else {
          minSide = Math.min(this._parentElementRef.clientWidth, this._parentElementRef.clientHeight);
        }
        this.innerWidth = minSide;
        this.innerHeight = minSide;
      }

      let url = '';

      if (this._tempFile) {
        url = URL.createObjectURL(this._tempFile);
      } else {
        const imageQuery: ImageQuery = {
          clazz: this.fileClass,
          type: this.type,
          objectId: this.object.id || 0,
        };

        if (!this._appHelper.isUndefinedOrNull(this.innerWidth)) {
          imageQuery.width = this.innerWidth;
        }
        if (!this._appHelper.isUndefinedOrNull(this.innerHeight)) {
          imageQuery.height = this.innerHeight;
        }
        if (this.image) {
          url = `${this._participantRestApiService.getUrlByImage(this.image, imageQuery)}&date=${Date.now()}`;
        } else {
          url = `${this._participantRestApiService.getUrlImage(imageQuery)}&date=${Date.now()}`;
        }
      }

      this.innerUrl = this.url || url;
      this._changeDetectorRef.markForCheck();
    });
  }

  public async onShowImage() {
    if (this.allowFullScreen) {
      if (this.image) {
        await this._ngxModalService.showFullImage(this.image);
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
      if (this._tempNgxCropImageComponent) {
        imageBase64 = this._tempNgxCropImageComponent.imageBase64;
        imagePosition = this._tempNgxCropImageComponent.imagePosition;
        file = this._tempNgxCropImageComponent.file;
      }
      const dialogResult = await this._templateModalService.showCropImageModal(this.object, this.type, this.fileClass, this.format, imageBase64, imagePosition, file, {componentFactoryResolver: this._componentFactoryResolver}, this.autoSave);
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
