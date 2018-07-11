import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {SportType} from '../../../data/remote/model/sport-type';
import {UserRole} from '../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Image} from '../../../data/remote/model/file/image/image';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {ISubscription} from 'rxjs-compat/Subscription';
import {Person} from '../../../data/remote/model/person';
import {AppHelper} from '../../../utils/app-helper';

@Injectable()
export class PersonService implements OnDestroy {

  public personViewModel: PersonViewModel;
  public userRoles: UserRole[];
  public sportTypes: SportType[];

  public selectedUserRole: UserRole;
  public selectedSportType: SportType;
  // BaseGroup by SelectedUserRole
  public baseGroup: GroupPerson;

  public readonly userRoleHandler: Subject<UserRole>;
  public readonly sportTypeHandler: Subject<SportType>;
  public readonly baseGroupHandler: Subject<GroupPerson>;
  public readonly logoHandler: Subject<Image>;

  private _userRoleSubscription: ISubscription;

  public constructor(private _participantRestApiService: ParticipantRestApiService,
                     private _appHelper: AppHelper) {
    this.userRoleHandler = new Subject<UserRole>();
    this.sportTypeHandler = new Subject<SportType>();
    this.baseGroupHandler = new Subject<GroupPerson>();
    this.logoHandler = new Subject<Image>();

    this.userRoles = [];
    this.sportTypes = [];

    this.selectedUserRole = null;
    this.selectedSportType = null;
    this.baseGroup = null;

    const person = new Person();
    person.id = 1;
    person.firstName = '';
    person.lastName = '';
    this.shared = {person: person, isEditAllow: true};
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public async initialize(personId: number): Promise<PersonViewModel> {
    try {
      const person = await this._participantRestApiService.getPerson({id: personId});
      this.personViewModel = new PersonViewModel(person);
      await this.personViewModel.initialize();
      if (person && person.id) {
        if (person.user && person.user.id) {
          this.userRoles = await  this._participantRestApiService.getUserRolesByUser({id: person.user.id});
          if (this.userRoles.length) {
            this.setUserRole(this.userRoles[0]);
          }
        }

        this.sportTypes = await  this._participantRestApiService.getPersonSportTypes({id: person.id});
        if (this.sportTypes.length) {
          this.setSportType(this.sportTypes[0]);
        }

        this._userRoleSubscription = this.userRoleHandler.subscribe(async value => {
          if (value) {
            try {
              this.baseGroup = await this._participantRestApiService.getBaseGroup({
                id: this.personViewModel.data.id,
                userRoleId: value.id
              });
            } catch (e) {
              this.baseGroup = null;
            }
          } else {
            this.baseGroup = null;
          }
          this.baseGroupHandler.next(this.baseGroup);
        });
      }

      return this.personViewModel;
    } catch (e) {
    }
    return null;
  }

  public setUserRole(userRole: UserRole) {
    this.selectedUserRole = userRole;
    this.userRoleHandler.next(userRole);
  }

  public setSportType(sportType: SportType) {
    this.selectedSportType = sportType;
    this.sportTypeHandler.next(sportType);
  }

  public subscribe() {
  }

  public unsubscribe() {
    this._appHelper.unsubscribe(this._userRoleSubscription);
  }

  public allowEdit(): boolean {
    // TODO: Add expression
    return true;
  }

  //#region Deprecated
  /**
   * @deprecated
   */
  shared: {
    /**
     * @deprecated
     */
    person: Person;
    /**
     * @deprecated
     */
    isEditAllow: boolean;
  };
  /**
   * @deprecated
   */
  sportTypeSelectDefault: SportType;
  /**
   * @deprecated
   */
  userRoleSelectDefault: UserRole;
  /**
   * @deprecated
   */
  baseGroupSelectDefault: GroupPerson;
  /**
   * @deprecated
   */
  private sportTypeSelect = new Subject<SportType>();
  /**
   * @deprecated
   */
  sportTypeSelectEmitted$ = this.sportTypeSelect.asObservable();
  /**
   * @deprecated
   */
  private userRoleSelect = new Subject<UserRole>();
  /**
   * @deprecated
   */
  userRoleSelectEmitted$ = this.userRoleSelect.asObservable();
  /**
   * @deprecated
   */
  private baseGroupSelect = new Subject<GroupPerson>();
  /**
   * @deprecated
   */
  baseGroupSelectEmitted$ = this.baseGroupSelect.asObservable();
  /**
   * @deprecated
   */
  private baseGroupChange = new Subject<GroupPerson>();
  /**
   * @deprecated
   */
  baseGroupChangeEmitted$ = this.baseGroupChange.asObservable();

  /**
   * @deprecated
   */
  emitSportTypeSelect(change: SportType) {
    this.sportTypeSelectDefault = change;
    this.sportTypeSelect.next(change);
  }

  /**
   * @deprecated
   */
  emitUserRoleSelect(change: UserRole) {
    this.userRoleSelectDefault = change;
    this.userRoleSelect.next(change);
  }

  /**
   * @deprecated
   */
  emitBaseGroupSelect(change: GroupPerson) {
    this.baseGroupSelectDefault = change;
    this.baseGroupSelect.next(change);
  }

  /**
   * @deprecated
   */
  emitBaseGroupChange(change: GroupPerson) {
    this.baseGroupSelectDefault = change;
    this.baseGroupChange.next(change);
  }

  //#endregion

}
