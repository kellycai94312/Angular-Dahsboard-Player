import {Component, Input, OnInit} from '@angular/core';
import {NamedObject} from '../../data/remote/base/named-object';

@Component({
  selector: 'app-named-object-item',
  templateUrl: './named-object-item.component.html',
  styleUrls: ['./named-object-item.component.scss']
})
export class NamedObjectItemComponent implements OnInit {

  @Input()
  public data: NamedObject;

  constructor() {
  }

  ngOnInit() {
  }

}
