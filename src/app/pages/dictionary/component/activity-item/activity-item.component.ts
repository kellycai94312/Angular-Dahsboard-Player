import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {BaseExercise} from '../../../../data/remote/model/exercise/base/base-exercise';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {AppHelper} from '../../../../utils/app-helper';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent<T extends BaseExercise> extends BaseComponent<T> implements OnInit {

  public readonly propertyConstant = PropertyConstant;
  public readonly imageType = ImageType;

  @Input()
  public class: string;

  public fileClass: FileClass;

  constructor(private _appHelper: AppHelper) {
    super();
  }

  ngOnInit() {
    this.fileClass = this._appHelper.exerciseTypeToFileClass(this.data.discriminator);
  }

}
