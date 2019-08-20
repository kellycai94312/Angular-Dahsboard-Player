import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Person} from '../../../../data/remote/model/person';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {map} from 'rxjs/operators';
import {PermissionService} from '../../../../shared/permission.service';

@Injectable()
export class PersonService {

  private readonly _personSubject = new ReplaySubject<Person>(1);
  private readonly _canEditPersonSubject = new ReplaySubject<boolean>(1);

  public get person$(): Observable<Person> {
    return this._personSubject.asObservable();
  }

  public get canEditPerson$(): Observable<boolean> {
    return this._canEditPersonSubject.asObservable();
  }

  public constructor(private _personApiService: PersonApiService,
                     private _permissionService: PermissionService,
                     private _authorizationService: AuthorizationService) {
  }

  public initialize(personId: number): void {
    this._personApiService.getPerson(personId)
      .subscribe(value => {
        this.updatePerson(value);
        this._updateCanEditPerson(value);
      });
  }

  public isAuthorizedPerson(person: Person): Observable<boolean> {
    return this._authorizationService.person$.pipe(map(value => value && value.id == person.id));
  }

  //region Update

  public updatePerson(value: Person): void {
    this._personSubject.next(value);
  }

  public _updateCanEditPerson(person: Person): void {
    this._permissionService.canEditPerson(person).subscribe(value => {
      this._canEditPersonSubject.next(value);
    });
  }

  //endregion

}
