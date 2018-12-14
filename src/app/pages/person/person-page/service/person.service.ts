import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {SportType} from '../../../../data/remote/model/sport-type';
import {UserRole} from '../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Image} from '../../../../data/remote/model/file/image/image';
import {PersonViewModel} from '../../../../data/local/view-model/person-view-model';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../../utils/app-helper';
import {PublicUserRole} from '../../../../data/remote/model/group/public-user-role';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PersonService implements OnDestroy {

  public readonly personViewModelSubject: BehaviorSubject<PersonViewModel>;
  public readonly sportTypeSubject: BehaviorSubject<SportType>;

  /*
  @deprecated Use person
   */
  public personViewModel: PersonViewModel;
  public userRoles: UserRole[];
  public sportTypes: SportType[];

  public selectedUserRole: UserRole;
  public selectedPublicUserRole: PublicUserRole;
  // BaseGroup by SelectedUserRole
  public baseGroup: GroupPerson;

  public readonly userRoleHandler: Subject<UserRole>;
  public readonly personStageSportTypeHandler: Subject<PublicUserRole>;
  public readonly baseGroupHandler: Subject<GroupPerson>;
  public readonly logoHandler: Subject<Image>;

  private _userRoleSubscription: ISubscription;
  private readonly _sportTypeSubscription: ISubscription;

  public constructor(private _participantRestApiService: ParticipantRestApiService,
                     private _appHelper: AppHelper) {
    this.userRoleHandler = new Subject<UserRole>();
    this.sportTypeSubject = new BehaviorSubject<SportType>(null);
    this.personStageSportTypeHandler = new Subject<PublicUserRole>();
    this.baseGroupHandler = new Subject<GroupPerson>();
    this.logoHandler = new Subject<Image>();
    this.personViewModelSubject = new BehaviorSubject<PersonViewModel>(null);
    this.userRoles = [];
    this.sportTypes = [];

    this.selectedUserRole = null;
    this.baseGroup = null;

    this._sportTypeSubscription = this.sportTypeSubject.subscribe(async value => {
      await this.refreshCurrentPersonStage();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public async initialize(personId: number): Promise<PersonViewModel> {
    try {
      const person = await this._participantRestApiService.getPerson({id: personId});
      this.personViewModel = new PersonViewModel(person);
      await this.personViewModel.initialize();
      this.personViewModelSubject.next(this.personViewModel);
      if (person && person.id) {
        if (person.user && person.user.id) {
          this.userRoles = await this._participantRestApiService.getUserUserRoles({userId: person.user.id});
          if (this.userRoles.length) {
            this.selectedUserRole = this.userRoles[0];
          }
        }

        this.sportTypes = await this._participantRestApiService.getPersonSportTypes({id: person.id});
        if (this.sportTypes.length) {
          this.sportTypeSubject.next(this.sportTypes[0]);
        }

        this._userRoleSubscription = this.userRoleHandler.subscribe(async value => {
          if (value) {
            try {
              this.baseGroup = await this._participantRestApiService.getPersonBaseGroup({
                personId: this.personViewModel.data.id,
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

  public async refreshCurrentPersonStage(): Promise<PublicUserRole> {
    let currentItem = null;
    const sportType = this.sportTypeSubject.getValue();
    if (sportType) {
      try {
        const items = await this._participantRestApiService.getPublicUserRoles({}, {
          sportTypeId: sportType.id,
          userRoleId: this.selectedUserRole.id
        }, {personId: this.personViewModel.data.id});

        currentItem = items.reverse().find(x => !this._appHelper.isUndefinedOrNull(x.joinDate));
      } catch (e) {
      }
    }

    this.selectedPublicUserRole = currentItem;
    this.personStageSportTypeHandler.next(currentItem);
    return currentItem;
  }

  public setBaseGroup(baseGroup: GroupPerson) {
    this.baseGroup = baseGroup;
    this.baseGroupHandler.next(baseGroup);
  }

  public subscribe() {
  }

  public unsubscribe() {
    this._appHelper.unsubscribe(this._userRoleSubscription);
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public async allowEdit(): Promise<boolean> {
    try {
      const createdByAnotherPerson = this.personViewModel.data.user.id != this.personViewModel.data.owner.id;
      const canEdit = (await this._participantRestApiService.canEditPerson({personId: this.personViewModel.data.id})).value;
      return !createdByAnotherPerson && canEdit;
    } catch (e) {
    }
    return false;
  }

}
