import {OnDestroy} from '@angular/core';
import {Person} from '../../../remote/model/person';
import {PersonService} from '../../../../pages/person/person-page/service/person.service';
import {AppHelper} from '../../../../utils/app-helper';

export abstract class BasePersonComponent implements OnDestroy {

  public person: Person;
  public canEdit: boolean;
  public isOwner: boolean;


  protected constructor(protected personService: PersonService,
                        protected appHelper: AppHelper) {
  }

  ngOnDestroy(): void {
  }

}
