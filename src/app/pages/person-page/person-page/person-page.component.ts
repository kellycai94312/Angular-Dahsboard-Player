import { Component, OnInit } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { TranslateService } from '@ngx-translate/core';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { UserRole } from '../../../data/remote/model/user-role';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SportType } from '../../../data/remote/model/sport-type';
import { Picture } from '../../../data/remote/model/picture';
import { PictureType } from '../../../data/remote/misc/picture-type';
import { PictureClass } from '../../../data/remote/misc/picture-class';
import { PictureService } from '../../../shared/picture.service';
import { PersonService } from './person.service';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { ProfileService } from '../../../layout/shared/profile.service';
import { Tab } from './tab';
import { UserRoleEnum } from '../../../data/remote/model/user-role-enum';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalSelectComponent } from '../../../components/modal-select/modal-select.component';
import { Subject } from 'rxjs/Subject';
import { ListRequest } from '../../../data/remote/request/list-request';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  public person: Person;
  public isEditAllow: boolean;
  public queryParams: Params;
  public tabs: Tab[];

  private userRoles: UserRole[] = [];
  private personSportTypes: SportType[];

  private logo: string;
  private roleToggle: UserRole;
  private sportTypeToggle: SportType;

  private rolesModalRef: NgbModalRef;
  private sportTypesModalRef: NgbModalRef;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router,
              private route: ActivatedRoute,
              private _localStorageService: LocalStorageService,
              private logoService: PictureService,
              private _personService: PersonService,
              private _navbarService: ProfileService,
              private _modalService: NgbModal,
              private _translate: TranslateService) {

    this.isEditAllow = false;
    this._personService.rolesChangeEmitted$.subscribe(userRoles => {
      this.userRoles = userRoles;
      if (this.userRoles.length) {
        this.roleToggle = userRoles[0];
        this.onRoleChange();
      }
    });
    this._personService.sportTypesChangeEmitted$.subscribe(userRoles => {
      this.personSportTypes = userRoles;
      if (this.personSportTypes.length) {
        this.sportTypeToggle = this.personSportTypes[0];
        this.onSportTypeChange();
      }
    });
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
      }
    ];
  }

  isTabOpen(tab: Tab): boolean {
    return tab && this.roleToggle && tab.restrict.indexOf(+UserRoleEnum[this.roleToggle.userRoleEnum]) < 0;
  }

  async onLogoChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const picture: Picture = new Picture();
      picture.clazz = PictureClass.person;
      picture.objectId = this.person.id;
      picture.type = PictureType.LOGO;
      await this.participantRestApiService.uploadPicture(file, picture);
      this.updateLogo();
    }
  }

  async toggleRolesModal() {
    const ref = this._modalService.open(ModalSelectComponent);
    const roles = (await this.participantRestApiService.getUserRoles())
      .filter(role =>
        this.userRoles
          .filter(uRole => uRole.id === role.id).length === 0);
    const userRoles = Object.assign([], this.userRoles);
    const errorMessage = await this._translate.get('persons.person.roles.conflict').toPromise();
    ref.componentInstance.header = await this._translate.get('persons.person.roles.edit').toPromise();
    ref.componentInstance.defaultData = roles;
    ref.componentInstance.selectedData = userRoles;
    const subject = new Subject();
    ref.componentInstance.subject = subject;
    ref.componentInstance.field = 'userRoleEnum';
    ref.componentInstance.onSearch = (typing: string) => this.getRoles(roles, typing);
    ref.componentInstance.onSelect = (typing: string, role: UserRole) => {
      roles.splice(roles.indexOf(role), 1);
      userRoles.push(role);
      return this.getRoles(roles, typing);
    };
    ref.componentInstance.onRemove = (role: UserRole) => {
      userRoles.splice(userRoles.indexOf(role), 1);
      roles.push(role);
      subject.next();
    };
    ref.componentInstance.onSave = async () => {
      try {
        this.userRoles = await this.participantRestApiService.changeRoles(new ListRequest(userRoles));
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

  private getRoles(roles: UserRole[], typing: string) {
    const data = [];
    for (const item of roles) {
      if (item.userRoleEnum.toString().toLowerCase().indexOf(typing) > -1) {
        data.push(item);
      }
    }
    return data;
  }

  toggleSportTypesModal() {
    // this.sportTypesModalRef = this._modalService.show(SportTypesModalComponent, {class: 'modal-lg'});
    // this.sportTypesModalRef.content.personSportTypes = Object.assign([], this.personSportTypes);
  }

  async onRoleChange() {
    this.queryParams['userRole'] = this.roleToggle.id;
    /*redirect to personal tab when user selects role in restrict array*/
    const currentTab = this.tabs.filter(t => this.router.url.includes(t.route))[0];
    if (currentTab && currentTab.restrict.indexOf(+UserRoleEnum[this.roleToggle.userRoleEnum]) > -1) {
      this.router.navigate(['./'], {relativeTo: this.route, queryParams: this.queryParams});
    } else {
      this.router.navigate([], {queryParams: this.queryParams});
    }
  }

  async onSportTypeChange() {
    this._personService.emitSportTypeSelect(this.sportTypeToggle);
    this.queryParams['sportType'] = this.sportTypeToggle.id;
    this.router.navigate([], {queryParams: this.queryParams});
  }

  updateLogo() {
    this.logo = this.logoService.getLogo(PictureClass.person, this.person.id);
    this._navbarService.emitLogoChange(this.logo);
  }

  async ngOnInit() {
    this.queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.route.params.subscribe(params => {
      this._navbarService.getPerson(+params.id).then(person => {
        this.person = person;
        this.logo = this.logoService.getLogo(PictureClass.person, this.person.id);
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
                    break;
                  }
                }
                if (!this.roleToggle) {
                  this.roleToggle = userRoles[0];
                }
              } else {
                this.roleToggle = userRoles[0];
              }
              this.onRoleChange();
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
