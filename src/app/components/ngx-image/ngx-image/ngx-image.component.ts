import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ImageFormat} from '../../../data/local/image-format';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {environment} from '../../../../environments/environment';
import {AppHelper} from '../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Image} from '../../../data/remote/model/file/image/image';

@Component({
  selector: 'ngx-image',
  templateUrl: './ngx-image.component.html',
  styleUrls: ['./ngx-image.component.scss']
})
export class NgxImageComponent implements OnInit, OnChanges {

  public readonly imageFormat = ImageFormat;

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
  public format: ImageFormat;

  @Output()
  public readonly imageChange: EventEmitter<any>;

  public url: string;
  public width: number;
  public height: number;

  private _parentElementRef: HTMLElement;
  private _initialized: boolean;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _elementRef: ElementRef) {
    this.imageChange = new EventEmitter<any>();
    this.class = '';
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
    const minSide = Math.min(this._parentElementRef.clientWidth, this._parentElementRef.clientHeight);
    this.width = minSide;
    this.height = minSide;

    let url = `${environment.restUrl}/file/download/image?clazz=${this.fileClass}&objectId=${this.objectId}&type=${this.type}`;

    if (!this._appHelper.isUndefinedOrNull(this.width)) {
      url += `&width=${this.width}`;
    }
    if (!this._appHelper.isUndefinedOrNull(this.height)) {
      url += `&height=${this.height}`;
    }

    url += `&date=${Date.now()}`;
    this.url = url;
  }

}
