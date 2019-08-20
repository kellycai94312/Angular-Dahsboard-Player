import {OnDestroy, OnInit} from '@angular/core';
import {Person} from '../../../data/remote/model/person';
import {PersonService} from '../person-page/service/person.service';
import {takeWhile} from 'rxjs/operators';

export class BasePersonComponent implements OnInit, OnDestroy {

  public isBusy: boolean;
  public canEdit: boolean;
  public person: Person;
  public notDestroyed = true;

  public constructor(public personService: PersonService) {
  }

  public ngOnInit(): void {
    this.isBusy = true;

    this.personService.person$
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(value => {
        this.person = value;
        this.updatePerson(value);
        delete this.isBusy;
      });

    this.personService.canEditPerson$
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(value => {
        this.canEdit = value;
      });
  }

  public ngOnDestroy(): void {
    delete this.notDestroyed;
  }

  public updatePerson(person: Person): void {
  }

}
