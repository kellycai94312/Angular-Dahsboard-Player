import { Component, OnInit } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { TranslateService } from '@ngx-translate/core';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { UserRole } from '../../../data/remote/model/user-role';
import { ActivatedRoute, Router } from '@angular/router';
import { SportType } from '../../../data/remote/model/sport-type';
import { Picture } from '../../../data/remote/model/picture';
import { PictureType } from '../../../data/remote/misc/picture-type';
import { PictureClass } from '../../../data/remote/misc/picture-class';
import { PictureService } from '../../../shared/picture.service';
import { PersonService } from './person.service';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { ProfileService } from '../../../layout/shared/profile.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { SportTypesModalComponent } from './sport-types-modal/sport-types-modal.component';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  public person: Person;
  public isEditAllow: boolean;

  private userRoles: UserRole[] = [];
  private personSportTypes: SportType[];

  private logo: string;
  private roleToggle: UserRole;
  private sportTypeToggle: SportType;

  private rolesModalRef: BsModalRef;
  private sportTypesModalRef: BsModalRef;

  private tabRoutes: Map<number, string>;
  private defaultTabIndex: number;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router,
              private route: ActivatedRoute,
              private _localStorageService: LocalStorageService,
              private logoService: PictureService,
              private _personService: PersonService,
              private _navbarService: ProfileService,
              private _modalService: BsModalService) {
    this.tabRoutes = new Map<number, string>();
    this.tabRoutes.set(0, 'personal');
    this.tabRoutes.set(1, 'anthropometry');
    this.tabRoutes.set(2, 'physiology');
    this.tabRoutes.set(3, 'contact');
    this.tabRoutes.set(4, 'tests_results');
    this.tabRoutes.set(5, 'events');

    const url = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.tabRoutes.forEach((value: string, key: number) => {
      if (value === url) {
        this.defaultTabIndex = key;
      }
    });

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
  }

  selectTab(e: MatTabChangeEvent) {
    this.router.navigate([`./${this.tabRoutes.get(e.index)}`], {relativeTo: this.route});
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

  toggleRolesModal() {
    this.rolesModalRef = this._modalService.show(RolesModalComponent, {class: 'modal-lg'});
    this.rolesModalRef.content.userRoles = Object.assign([], this.userRoles);
  }

  toggleSportTypesModal() {
    this.sportTypesModalRef = this._modalService.show(SportTypesModalComponent, {class: 'modal-lg'});
    this.sportTypesModalRef.content.personSportTypes = Object.assign([], this.personSportTypes);
  }

  async onRoleChange() {
  }

  async onSportTypeChange() {
    this._personService.emitSportTypeSelect(this.sportTypeToggle);
  }

  updateLogo() {
    this.logo = this.logoService.getLogo(PictureClass.person, this.person.id);
    this._navbarService.emitLogoChange(this.logo);
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this._navbarService.getPerson(+params.id).then(person => {
        this.person = person;
        this.logo = this.logoService.getLogo(PictureClass.person, this.person.id);
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
              this._personService.sportTypeSelectDefault = personSportTypes[0];
              this.onSportTypeChange();
            }
          });


      }).catch(error => {
        this.router.navigate(['not-found']);
      });
    });
  }

}
