import {Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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

@Component({
  selector: 'ngx-image',
  templateUrl: './ngx-image.component.html',
  styleUrls: ['./ngx-image.component.scss']
})
export class NgxImageComponent implements OnInit, OnChanges {

  public readonly imageFormatClass = ImageFormat;

  // @deprecated Use object
  @Input()
  public objectId: number;

  @Input()
  public object: IdentifiedObject;

  @Input()
  public type: ImageType;

  @Input()
  public fileClass: FileClass;

  @Input()
  public class: string;

  @Input()
  public canEdit: boolean;

  @Input()
  public allowFullScreen: boolean;

  @Input()
  public format: ImageFormat;

  @Output()
  public readonly imageChange: EventEmitter<File>;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public autoSave: boolean;

  @Input()
  public cropImage: boolean;

  public url: string;
  public innerWidth: number;
  public innerHeight: number;

  private _parentElementRef: HTMLElement;
  private _initialized: boolean;
  private _tempFile: File;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _elementRef: ElementRef,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _ngxModalService: NgxModalService) {
    this.imageChange = new EventEmitter<File>();
    this.class = '';
    this.autoSave = true;
    this.innerWidth = 0;
    this.innerHeight = 0;
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
    file = file || this._tempFile;
    if (!file) {
      return;
    }
    return await this._appHelper.trySave(async () => {
      const image = new Image();
      image.clazz = this.fileClass;
      image.objectId = this.objectId || this.object.id;
      image.type = this.type;
      await this._participantRestApiService.uploadFile(image, [file]);

      this._tempFile = null;
    }, notify);
  }

  public refresh() {
    let minSide = 0;
    if (this.width || this.height) {
      minSide = Math.min(this.width, this.height);
    } else {
      minSide = Math.min(this._parentElementRef.clientWidth, this._parentElementRef.clientHeight);
    }
    this.innerWidth = minSide;
    this.innerHeight = minSide;

    let url = '';

    if (this._tempFile) {
      url = URL.createObjectURL(this._tempFile);
    } else {
      const imageQuery: ImageQuery = {
        clazz: this.fileClass,
        type: this.type,
        objectId: this.objectId || this.object.id || 0,
      };

      if (!this._appHelper.isUndefinedOrNull(this.innerWidth)) {
        imageQuery.width = this.innerWidth;
      }
      if (!this._appHelper.isUndefinedOrNull(this.innerHeight)) {
        imageQuery.height = this.innerHeight;
      }
      url += `${this._participantRestApiService.getUrlImage(imageQuery)}&date=${Date.now()}`;
    }

    this.url = url;
  }

  public async onShowImage() {
    if (this.allowFullScreen) {
      await this._ngxModalService.showFullImage(this.objectId, this.type, this.fileClass);
    }
  }

  public async onEditImage(elem: HTMLInputElement): Promise<void> {
    if (this.cropImage) {
      await this._templateModalService.showCropImageModal(this.object, this.type, this.fileClass, {componentFactoryResolver: this._componentFactoryResolver});
      this.refresh();
    } else {
      elem.click();
    }
  }
}
