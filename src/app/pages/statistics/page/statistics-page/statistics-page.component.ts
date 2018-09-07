import {Component} from '@angular/core';
import {NameWrapper} from '../../../../data/local/name-wrapper';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent {

  public dictionaries: NameWrapper<string>[];

  constructor() {
    this.dictionaries = [
      {name: 'sportType', data: 'sport-type'}
    ];
  }

}
