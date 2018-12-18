import {Component} from '@angular/core';
import {PersonQuery} from '../../../../../../data/remote/rest-api/query/person-query';

@Component({
  selector: 'app-my-persons-page',
  templateUrl: './my-persons-page.component.html',
  styleUrls: ['./my-persons-page.component.scss']
})
export class MyPersonsPageComponent {

  public readonly personQuery: PersonQuery;

  constructor() {
    this.personQuery = {
      name: '',
      connected: true
    };
  }

}
