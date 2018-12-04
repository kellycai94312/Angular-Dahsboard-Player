import {Injectable} from '@angular/core';
import {Person} from '../data/remote/model/person';
import {UserRoleEnum} from '../data/remote/model/user-role-enum';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {Tag} from '../data/remote/model/tag';
import {BaseExercise} from '../data/remote/model/exercise/base/base-exercise';
import {AuthorizationService} from './authorization.service';
import {BaseFile} from '../data/remote/model/file/base/base-file';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {UserRole} from '../data/remote/model/user-role';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService) {
  }

  public async canEditTag(data: Tag, person: Person): Promise<boolean> {
    if (this.areYouCreator(data, person)) {
      return true;
    }

    if (await this.hasAnyRole([UserRoleEnum.ADMIN], person)) {
      return true;
    }

    return false;
  }

  public async canEditActivity<T extends BaseExercise>(data: T, person?: Person): Promise<boolean> {
    person = await this.getDefaultPerson(person);
    if (this.areYouCreator(data, person)) {
      return true;
    }

    if (await this.hasAnyRole([UserRoleEnum.ADMIN], person)) {
      return true;
    }

    return false;
  }

  public async canEditFile<T extends BaseFile>(data: T, person?: Person): Promise<boolean> {
    person = await this.getDefaultPerson(person);
    if (this.areYouCreator(data, person)) {
      return true;
    }

    if (await this.hasAnyRole([UserRoleEnum.ADMIN], person)) {
      return true;
    }

    return false;
  }

  public async hasRole(person: Person, userRoleEnum: UserRoleEnum): Promise<boolean> {
    const userRoles = await this._participantRestApiService.getUserUserRoles({userId: person.user.id});
    return userRoles.find(x => x.userRoleEnum === userRoleEnum) !== null;
  }

  public async hasAnyRole(userRoleEnums: UserRoleEnum[], person: Person = null): Promise<boolean> {
    person = await this.getDefaultPerson(person);
    const userRoles = await this._participantRestApiService.getUserUserRoles({userId: person.user.id});
    return this.hasAnyRoles(userRoles, userRoleEnums);
  }

  public hasAnyRoles(source: UserRole[], target: UserRoleEnum[]): boolean {
    let result = false;
    for (const item of target) {
      if (source.find(x => x.userRoleEnum === item)) {
        result = true;
        break;
      }
    }
    return result;
  }

  public areYouCreator<T extends IdentifiedObject>(data: T, person: Person) {
    if (data.owner && data.owner.id == person.user.id) {
      return true;
    }
    return false;
  }

  private async getDefaultPerson(person: Person): Promise<Person> {
    return person || await this._authorizationService.getPerson();
  }

}
