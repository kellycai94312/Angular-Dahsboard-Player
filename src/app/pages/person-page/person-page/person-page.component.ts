import {Component, OnInit} from '@angular/core';
import {Person} from '../../../data/remote/model/person';
import {TranslateService} from '@ngx-translate/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {UserRole} from '../../../data/remote/model/user-role';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SportType} from '../../../data/remote/model/sport-type';
import {Image} from '../../../data/remote/model/image';
import {ImageClass} from '../../../data/remote/misc/image-class';
import {ImageService} from '../../../shared/image.service';
import {PersonService} from './person.service';
import {LocalStorageService} from '../../../shared/local-storage.service';
import {ProfileService} from '../../../layout/shared/profile.service';
import {Tab} from './tab';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalSelectComponent} from '../../../components/modal-select/modal-select.component';
import {ListRequest} from '../../../data/remote/request/list-request';
import notify from 'devextreme/ui/notify';
import {SportTypeItemComponent} from './sport-type-item/sport-type-item.component';
import {UserRoleItemComponent} from './user-role-item/user-role-item.component';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {ImageType} from '../../../data/remote/model/image-type';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  public person: Person;
  public baseGroup: GroupPerson;
  public isEditAllow: boolean;
  public queryParams: Params;
  public tabs: Tab[];

  private userRoles: UserRole[] = [];
  private personSportTypes: SportType[];

  private logo: string;
  private roleToggle: UserRole;
  private sportTypeToggle: SportType;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router,
              private route: ActivatedRoute,
              private _localStorageService: LocalStorageService,
              private logoService: ImageService,
              private _personService: PersonService,
              private _navbarService: ProfileService,
              private _modalService: NgbModal,
              private _translate: TranslateService) {

    this.isEditAllow = false;
    this.tabs = [
      {
        name: 'persons.person.personal.section',
        route: 'personal',
        restrict: []
      },
      {
        name: 'persons.person.anthropometry.section',
        route: 'anthropometry',
        restrict: [UserRoleEnum.TRAINER]
      },
      {
        name: 'persons.person.physiology.section',
        route: 'physiology',
        restrict: [UserRoleEnum.TRAINER]
      },
      {
        name: 'persons.person.contact.section',
        route: 'contact',
        restrict: []
      },
      {
        name: 'persons.person.testsResults.section',
        route: 'tests_results',
        restrict: [UserRoleEnum.TRAINER]
      },
      {
        name: 'persons.person.events.section',
        route: 'events',
        restrict: [UserRoleEnum.TRAINER]
      },
      {
        name: 'persons.person.groups.section',
        route: 'groups',
        restrict: []
      }
    ];
    this._personService.baseGroupChangeEmitted$.subscribe(groupPerson => {
      this.baseGroup = groupPerson;
    });
  }

  isTabOpen(tab: Tab): boolean {
    return tab && this.roleToggle && tab.restrict.indexOf(+UserRoleEnum[this.roleToggle.userRoleEnum]) < 0;
  }

  async onLogoChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = ImageClass.PERSON;
      image.objectId = this.person.id;
      image.type = ImageType.LOGO;
      await this.participantRestApiService.uploadImage(file, image);
      this.updateLogo();
    }
  }

  async editUserRoles() {
    const ref = this._modalService.open(ModalSelectComponent, {size: 'lg'});
    const roles = (await this.participantRestApiService.getUserRoles())
      .filter(role =>
        this.userRoles
          .filter(uRole => uRole.id === role.id).length === 0);
    const userRoles = Object.assign([], this.userRoles);
    const errorMessage = await this._translate.get('persons.person.roles.conflict').toPromise();
    ref.componentInstance.header = await this._translate.get('persons.person.roles.edit').toPromise();
    ref.componentInstance.component = UserRoleItemComponent;
    ref.componentInstance.defaultData = roles;
    ref.componentInstance.selectedData = userRoles;
    ref.componentInstance.filter = (typing: string, userRole: UserRole) =>
      userRole.userRoleEnum.toString().toLowerCase().indexOf(typing) > -1;
    ref.componentInstance.onSave = async () => {
      try {
        this.userRoles = await this.participantRestApiService.changeRoles(new ListRequest(userRoles));
        if (this.userRoles.length) {
          this.roleToggle = this.userRoles[0];
          this.onUserRoleChange();
        }
        ref.dismiss();
      } catch (e) {
        if (e.status === 409) {
          notify(errorMessage, 'warning', 3000);
        } else {
          throw e;
        }
      }
    };
  }

  async editSportTypes() {
    const ref = this._modalService.open(ModalSelectComponent, {size: 'lg'});
    const sportTypes = (await this.participantRestApiService.getSportTypes())
      .filter(type =>
        this.personSportTypes
          .filter(pType => pType.id === type.id).length === 0);
    const personSportTypes = Object.assign([], this.personSportTypes);
    ref.componentInstance.header = await this._translate.get('persons.person.sportTypes.edit').toPromise();
    ref.componentInstance.component = SportTypeItemComponent;
    ref.componentInstance.defaultData = sportTypes;
    ref.componentInstance.selectedData = personSportTypes;
    ref.componentInstance.filter = (typing: string, sportType: SportType) =>
      sportType.sportTypeEnum.toString().toLowerCase().indexOf(typing) > -1;
    ref.componentInstance.onSave = async () => {
      this.personSportTypes = await this.participantRestApiService.changeSportTypes(new ListRequest(personSportTypes));
      if (this.personSportTypes.length) {
        this.sportTypeToggle = this.personSportTypes[0];
        this.onSportTypeChange();
      }
      ref.dismiss();
    };
  }

  async onUserRoleChange() {
    this.queryParams['userRole'] = this.roleToggle.id;
    /*redirect to personal tab when user selects role in restrict array*/
    const currentTab = this.tabs.filter(t => this.router.url.includes(t.route))[0];
    if (currentTab && currentTab.restrict.indexOf(+UserRoleEnum[this.roleToggle.userRoleEnum]) > -1) {
      this.router.navigate(['./'], {relativeTo: this.route, queryParams: this.queryParams});
    } else {
      this.router.navigate([], {queryParams: this.queryParams});
    }
    this._personService.emitUserRoleSelect(this.roleToggle);

    // load base group
    try {
      this.baseGroup = await this.participantRestApiService.getBaseGroup({
        id: this.person.id,
        userRoleId: this.roleToggle.id
      });
    } catch (e) {
      this.baseGroup = null;
    }
    this._personService.emitBaseGroupSelect(this.baseGroup);
  }

  async onSportTypeChange() {
    this._personService.emitSportTypeSelect(this.sportTypeToggle);
    this.queryParams['sportType'] = this.sportTypeToggle.id;
    this.router.navigate([], {queryParams: this.queryParams});
  }

  updateLogo() {
    this.logo = this.logoService.getLogo(ImageClass.PERSON, this.person.id);
    this._navbarService.emitLogoChange(this.logo);
  }

  async ngOnInit() {
    this.queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.route.params.subscribe(params => {
      this._navbarService.getPerson(+params.id).then(person => {
        this.person = person;
        this.logo = this.logoService.getLogo(ImageClass.PERSON, this.person.id);
        this.isEditAllow = person.id === this._localStorageService.getCurrentPersonId();
        this._personService.shared = {person: person, isEditAllow: this.isEditAllow};

        // load user roles
        this.participantRestApiService.getUserRolesByUser({id: person.user.id})
          .then(userRoles => {
            this.userRoles = userRoles;
            if (userRoles.length) {
              if (this.queryParams['userRole']) {
                for (const userRole of userRoles) {
                  if (userRole.id === +this.queryParams['userRole']) {
                    this.roleToggle = userRole;
                    this._personService.userRoleSelectDefault = userRole;
                    break;
                  }
                }
                if (!this.roleToggle) {
                  this.roleToggle = userRoles[0];
                  this._personService.userRoleSelectDefault = userRoles[0];
                }
              } else {
                this.roleToggle = userRoles[0];
                this._personService.userRoleSelectDefault = userRoles[0];
              }
              this.onUserRoleChange();
            }
          });

        this.participantRestApiService.getPersonSportTypes({id: person.id})
          .then(personSportTypes => {
            this.personSportTypes = personSportTypes;
            if (personSportTypes.length) {
              if (this.queryParams['sportType']) {
                for (const sportType of personSportTypes) {
                  if (sportType.id === +this.queryParams['sportType']) {
                    this.sportTypeToggle = sportType;
                    this._personService.sportTypeSelectDefault = sportType;
                    break;
                  }
                }
                if (!this.sportTypeToggle) {
                  this.sportTypeToggle = personSportTypes[0];
                  this._personService.sportTypeSelectDefault = personSportTypes[0];
                }
              } else {
                this.sportTypeToggle = personSportTypes[0];
                this._personService.sportTypeSelectDefault = personSportTypes[0];
              }
              this.onSportTypeChange();
            }
          });


      });
    });
  }

}
