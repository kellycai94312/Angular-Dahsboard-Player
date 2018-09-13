import {Component} from '@angular/core';
import {BaseComponent} from '../../../data/local/component/base/base-component';
import {NamedObject} from '../../../data/remote/base/named-object';

@Component({
  selector: 'app-preview-named-object',
  templateUrl: './preview-named-object.component.html',
  styleUrls: ['./preview-named-object.component.scss']
})
export class PreviewNamedObjectComponent<T extends NamedObject> extends BaseComponent<T> {
}
