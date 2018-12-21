import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Person} from '../../../../data/remote/model/person';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ImageFormat} from '../../../../data/local/image-format';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss']
})
export class PersonItemComponent extends BaseComponent<Person> implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly propertyConstantClass = PropertyConstant;
  public readonly imageFormatClass = ImageFormat;

  constructor() {
    super();
  }

}
