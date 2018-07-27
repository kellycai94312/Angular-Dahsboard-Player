import {Component, Input, ViewChild} from '@angular/core';
import {NamedObject} from '../../../data/remote/base/named-object';
import {DxTextBoxComponent} from 'devextreme-angular';

@Component({
  selector: 'app-named-object',
  templateUrl: './named-object.component.html',
  styleUrls: ['./named-object.component.scss']
})
export class NamedObjectComponent<T extends NamedObject> {

  @ViewChild('name')
  public name: DxTextBoxComponent;

  @Input()
  public data: T;

  constructor() {
    this.data = <T>{};
  }

  public valid(): boolean {
    return this.name.validator.instance.validate().isValid;
  }

}
