import {Component, Input, OnInit} from '@angular/core';
import {ImageType} from '../../data/remote/model/image-type';
import {ImageClass} from '../../data/remote/misc/image-class';
import {ImageService} from '../../shared/image.service';
import {ImageDimension} from '../../data/local/image-dimension';
import {ImageFormat} from '../../data/local/image-format';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input()
  type: ImageType;

  @Input()
  clazz: ImageClass;

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
    const dimension: any = ImageDimension[this.dimension];
    const format: any = ImageFormat[this.format];
    this.url = this._imageService.buildUrl({
      clazz: this.clazz,
      id: this.id,
      type: this.type,
      dimension: dimension
    });
    this.style = this._imageService.getImageStyle(format, dimension);
  }

  public refresh(id: any = this.id) {
    const dimension: any = ImageDimension[this.dimension];
    this.url = this._imageService.rebuildUrl({
      clazz: this.clazz,
      id: id,
      type: this.type,
      dimension: dimension
    });
  }

}
