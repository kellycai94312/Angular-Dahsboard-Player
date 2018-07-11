import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ImageService} from '../../shared/image.service';
import {ImageDimension} from '../../data/local/image-dimension';
import {ImageFormat} from '../../data/local/image-format';
import {ImageType} from '../../data/remote/model/file/image/image-type';
import {FileClass} from '../../data/remote/model/file/base/file-class';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, OnChanges {

  @Input()
  type: ImageType;

  @Input()
  clazz: FileClass;

  @Input()
  id: number;

  @Input()
  dimension: ImageDimension;

  @Input()
  public format: ImageFormat;

  public url: string;
  public style: string;

  constructor(private _imageService: ImageService) {
  }

  ngOnInit() {
    this.refresh();
  }

  public refresh(id: any = this.id) {
    this.url = this._imageService.rebuildUrl(this.dimension, {
      clazz: this.clazz,
      objectId: id,
      type: this.type
    });
    this.style = this._imageService.getImageStyle(this.format, this.dimension);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO: Optimize refresh image data
    this.refresh();
  }

}
