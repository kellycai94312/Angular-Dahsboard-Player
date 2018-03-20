import { Component, Input, OnInit } from '@angular/core';
import { SportType } from '../../data/remote/model/sport-type';

@Component({
  selector: 'app-sport-type-item',
  templateUrl: './sport-type-item.component.html',
  styleUrls: ['./sport-type-item.component.scss']
})
export class SportTypeItemComponent implements OnInit {

  @Input()
  public data: SportType;

  constructor() {
  }

  ngOnInit() {
  }

}
