import {Component} from '@angular/core';
import {BasePersonComponent} from '../../../model/base-person-component';
import {PersonService} from '../../service/person.service';
import {Person} from '../../../../../data/remote/model/person';
import {AuthorizationService} from '../../../../../shared/authorization.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-person-publications',
  templateUrl: './person-publications.component.html',
  styleUrls: ['./person-publications.component.scss']
})
export class PersonPublicationsComponent extends BasePersonComponent {

  public personNews: Person;

  constructor(private _authorizationService: AuthorizationService,
              personService: PersonService) {
    super(personService);
  }

  public updatePerson(person: Person): void {
    super.updatePerson(person);

    this._authorizationService.person$
      .pipe(take(1))
      .subscribe(value => {
        if (value && person && value.id != person.id) {
          this.personNews = person;
        } else {
          delete this.personNews;
        }
      });
  }

}
