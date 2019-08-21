import {Component} from '@angular/core';
import {BasePersonComponent} from '../../../model/base-person-component';
import {PersonService} from '../../service/person.service';

@Component({
  selector: 'app-person-publications',
  templateUrl: './person-publications.component.html',
  styleUrls: ['./person-publications.component.scss']
})
export class PersonPublicationsComponent extends BasePersonComponent {
  constructor(personService: PersonService) {
    super(personService);
  }
}
