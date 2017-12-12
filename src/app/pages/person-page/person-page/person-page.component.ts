import { Component, OnInit } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { TranslateService } from '@ngx-translate/core';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { UserRole } from '../../../data/remote/model/user-role';
import { ActivatedRoute, Router } from '@angular/router';
import { ListRequest } from '../../../data/remote/request/list-request';
import { SportType } from '../../../data/remote/model/sport-type';
import { Picture } from '../../../data/remote/model/picture';
import { PictureType } from '../../../data/remote/misc/picture-type';
import { PictureClass } from '../../../data/remote/misc/picture-class';
import { PictureService } from '../../../shared/picture.service';
import { Subject } from 'rxjs/Subject';
import { PersonService } from './person.service';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { NavBarService } from '../../../layout/nav-bar/nav-bar.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  public person: Person;
  public isEditAllow: boolean;

  private roles: UserRole[];
  private userRolesModal: UserRole[] = [];
  private userRoles: UserRole[] = [];
  private roleSubject: Subject<any> = new Subject();
  private rolesModal = false;

  private sportTypes: SportType[];
  private personSportTypesModal: SportType[] = [];
  private personSportTypes: SportType[] = [];
  private sportTypeSubject: Subject<any> = new Subject();
  private sportTypesModal = false;

  private logo: string;
  private roleToggle: UserRole;
  private sportTypeToggle: SportType;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router,
              private route: ActivatedRoute,
              private _localStorageService: LocalStorageService,
              private logoService: PictureService,
              private _personService: PersonService,
              private _navbarService: NavBarService) {
    this.isEditAllow = false;
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
    this.rolesModal = !this.rolesModal;
    if (this.rolesModal) {
      this.userRolesModal = Object.assign([], this.userRoles);
      this.roles = await this.participantRestApiService.getRoles();
      this.roleSubject.next();
    } else {
      this.userRolesModal = [];
      if (this.userRoles.length) {
        this.roleToggle = this.userRoles[0];
        this.onRoleChange();
      }
    }
  }

  async toggleSportTypesModal() {
    this.sportTypesModal = !this.sportTypesModal;
    if (this.sportTypesModal) {
      this.personSportTypesModal = Object.assign([], this.personSportTypes);
      this.sportTypes = await this.participantRestApiService.getSportTypes();
      this.sportTypeSubject.next();
    } else {
      this.personSportTypesModal = [];
      if (this.personSportTypes.length) {
        this.sportTypeToggle = this.personSportTypes[0];
        this.onSportTypeChange();
      }
    }
  }

  getRoles = (typing: string) => {
    const data = [];
    for (const item of this.roles) {
      if (item.userRoleEnum.toString().toLowerCase().indexOf(typing) > -1) {
        data.push(item);
      }
    }
    return data;
  }

  addRole = (typing: string, role: UserRole) => {
    this.roles.splice(this.roles.indexOf(role), 1);
    this.userRolesModal.push(role);
    return this.getRoles(typing);
  }

  getSportTypes = (typing: string) => {
    const data = [];
    for (const item of this.sportTypes) {
      if (item.sportTypeEnum.toString().toLowerCase().indexOf(typing) > -1) {
        data.push(item);
      }
    }
    return data;
  }

  addSportType = (typing: string, sportType: SportType) => {
    this.sportTypes.splice(this.sportTypes.indexOf(sportType), 1);
    this.personSportTypesModal.push(sportType);
    return this.getSportTypes(typing);
  }

  removeRole(role: UserRole) {
    this.userRolesModal.splice(this.userRolesModal.indexOf(role), 1);
    this.roles.push(role);
    this.roleSubject.next();
  }

  removeSportType(sportType: SportType) {
    this.personSportTypesModal.splice(this.personSportTypesModal.indexOf(sportType), 1);
    this.sportTypes.push(sportType);
    this.sportTypeSubject.next();
  }

  async changeRoles() {
    const user = await this.participantRestApiService.changeRoles(new ListRequest(this.userRolesModal));
    this.userRoles = user.userRoles;
    this.toggleRolesModal();
  }

  async changeSportTypes() {
    this.personSportTypes = await this.participantRestApiService.changeSportTypes(new ListRequest(this.personSportTypesModal));
    this.toggleSportTypesModal();
  }

  async onRoleChange() {
  }

  async onSportTypeChange() {
    this._personService.emitSportTypeChange(this.sportTypeToggle);
  }

  updateLogo() {
    this.logo = this.logoService.getLogo(PictureClass.person, this.person.id);
    this._navbarService.emitLogoChange(this.logo);
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.participantRestApiService.getPerson({id: +params.id})
        .then(person => {
          this.person = person;
          this.updateLogo();
          this.isEditAllow = person.id === this._localStorageService.getCurrentPersonId();
          this._personService.shared = {person: person, isEditAllow: this.isEditAllow};

          // load user roles
          this.participantRestApiService.getUserRoles({id: person.user.id})
            .then(userRoles => {
              this.userRoles = userRoles;
              if (userRoles.length) {
                this.roleToggle = userRoles[0];
                this.onRoleChange();
              }
            });

          this.participantRestApiService.getPersonSportTypes({id: person.id})
            .then(personSportTypes => {
              this.personSportTypes = personSportTypes;
              if (personSportTypes.length) {
                this.sportTypeToggle = personSportTypes[0];
                this.onSportTypeChange();
              }
            });


        }).catch(error => {
        this.router.navigate(['not-found']);
      });
    });
  }

}
