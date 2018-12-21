import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ImageFormat} from '../../../data/local/image-format';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {environment} from '../../../../environments/environment';
import {AppHelper} from '../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Image} from '../../../data/remote/model/file/image/image';
import {NgxModalService} from '../../ngx-modal/service/ngx-modal.service';

@Component({
  selector: 'ngx-image',
  templateUrl: './ngx-image.component.html',
  styleUrls: ['./ngx-image.component.scss']
})
export class NgxImageComponent implements OnInit, OnChanges {

  public readonly imageFormatClass = ImageFormat;

  @Input()
  public objectId: number;

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
  public readonly imageChange: EventEmitter<any>;

  @Input()
  public width: number;

  @Input()
  public height: number;

  public url: string;

  public innerWidth: number;
  public innerHeight: number;

  private _parentElementRef: HTMLElement;
  private _initialized: boolean;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _elementRef: ElementRef,
              private _ngxModalService: NgxModalService) {
    this.imageChange = new EventEmitter<any>();
    this.class = '';
    this.allowFullScreen = true;
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
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = this.fileClass;
      image.objectId = this.objectId;
      image.type = this.type;
      const files = await this._participantRestApiService.uploadFile(image, [file]);
      this.imageChange.emit(files[0]);
      this.refresh();
    }
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

    let url = `${environment.restUrl}/file/download/image?clazz=${this.fileClass}&objectId=${this.objectId}&type=${this.type}`;

    if (!this._appHelper.isUndefinedOrNull(this.innerWidth)) {
      url += `&width=${this.innerWidth}`;
    }
    if (!this._appHelper.isUndefinedOrNull(this.innerHeight)) {
      url += `&height=${this.innerHeight}`;
    }

    url += `&date=${Date.now()}`;
    this.url = url;
  }

  public async onShowImage() {
    if (this.allowFullScreen) {
      await this._ngxModalService.showFullImage(this.objectId, this.type, this.fileClass);
    }
  }

}
