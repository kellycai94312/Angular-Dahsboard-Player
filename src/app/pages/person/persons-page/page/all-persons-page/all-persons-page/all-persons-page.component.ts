import {Component} from '@angular/core';
import {PersonQuery} from '../../../../../../data/remote/rest-api/query/person-query';

@Component({
  selector: 'app-all-persons-page',
  templateUrl: './all-persons-page.component.html',
  styleUrls: ['./all-persons-page.component.scss']
})
export class AllPersonsPageComponent {

  public readonly personQuery: PersonQuery;

  constructor() {
    this.personQuery = {
      name: ''
    };
  }

}
