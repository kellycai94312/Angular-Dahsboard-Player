import { Component, OnInit } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { TranslateService } from '@ngx-translate/core';
import { SexEnum } from '../../../data/remote/misc/sex-enum';
import { Country } from '../../../data/remote/model/country';
import { Region } from '../../../data/remote/model/region';
import { City } from '../../../data/remote/model/city';
import { ParticipantRestApiService, RestUrl } from '../../../data/remote/rest-api/participant-rest-api.service';
import { UserRole } from '../../../data/remote/model/user-role';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../../../data/remote/model/address';
import { ListRequest } from '../../../data/remote/rest-api/list-request';
import { SportType } from '../../../data/remote/model/sport-type';
import { Picture } from '../../../data/remote/model/picture';
import { PictureType } from '../../../data/remote/misc/picture-type';
import { PictureClass } from '../../../data/remote/misc/picture-class';
import { PersonAnthropometry } from '../../../data/remote/model/person-anthropometry';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  public person: Person;
  private readonly sexEnumValues: SexEnum[] = Object.keys(SexEnum)
    .filter(e => parseInt(e, 10) >= 0)
    .map(k => SexEnum[k]);
  private countries: Country[];
  private regions: Region[];
  private cities: City[];

  private roles: UserRole[];
  private userRolesModal: UserRole[] = [];
  private userRoles: UserRole[] = [];
  private rolesModal = false;

  private sportTypes: SportType[];
  private personSportTypesModal: SportType[] = [];
  private personSportTypes: SportType[] = [];
  private sportTypesModal = false;

  private anthropometry: PersonAnthropometry[];

  private logo: string;
  private roleToggle: UserRole;
  private sportTypeToggle: SportType;

  private personId: number;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onCountryChange(e: any): void {
    this.person.address.region = new Region();
    this.person.address.city = new City();
    if (e.value != null) {
      this.loadRegions(e.value);
    }
  }

  onRegionChange(e): void {
    this.person.address.city = new City();
    if (e.value != null) {
      this.loadCities(e.value);
    }
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
      for (let i = 0; i < this.roles.length; i++) {
        for (const role of this.userRolesModal) {
          if (this.roles[i].id === role.id) {
            this.roles.splice(i, 1);
          }
        }
      }
    } else {
      this.userRolesModal = [];
    }
  }

  async toggleSportTypesModal() {
    this.sportTypesModal = !this.sportTypesModal;
    if (this.sportTypesModal) {
      this.personSportTypesModal = Object.assign([], this.personSportTypes);
      this.sportTypes = await this.participantRestApiService.getSportTypes();
      for (let i = 0; i < this.sportTypes.length; i++) {
        for (const role of this.personSportTypesModal) {
          if (this.sportTypes[i].id === role.id) {
            this.sportTypes.splice(i, 1);
          }
        }
      }
    } else {
      this.personSportTypesModal = [];
    }
  }

  addRole(role: UserRole) {
    this.roles.splice(this.roles.indexOf(role), 1);
    this.userRolesModal.push(role);
  }

  addSportType(sportType: SportType) {
    this.sportTypes.splice(this.sportTypes.indexOf(sportType), 1);
    this.personSportTypesModal.push(sportType);
  }

  removeRole(role: UserRole) {
    this.userRolesModal.splice(this.userRolesModal.indexOf(role), 1);
    this.roles.push(role);
  }

  removeSportType(sportType: SportType) {
    this.personSportTypesModal.splice(this.personSportTypesModal.indexOf(sportType), 1);
    this.sportTypes.push(sportType);
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

  async savePersonal() {
    // fixme
    const person: Person = JSON.parse(JSON.stringify(this.person));
    if (person.address.country.id == null) {
      person.address = null;
    } else if (person.address.region.id == null) {
      person.address.region = null;
      person.address.city = null;
    } else if (person.address.city.id == null) {
      person.address.city = null;
    }
    await this.participantRestApiService.updatePerson(person, {id: person.id});
  }

  async saveAnthropometry() {
    await this.participantRestApiService.changeAnthropometry(new ListRequest(this.anthropometry));
  }

  async onRoleChange() {
  }

  async onSportTypeChange() {
    this.anthropometry = await this.participantRestApiService.getAnhtropometry({
      id: this.personId,
      sportType: this.sportTypeToggle.sportTypeEnum
    });
  }

  updateLogo() {
    this.route.params.subscribe(params => {
      this.logo = `${RestUrl}/picture/download?clazz=${PictureClass[PictureClass.person]}&id=${+params.id}&type=${PictureType[PictureType.LOGO]}&date=${new Date().getTime()}`;
    });
  }

  ngOnInit() {
    this.updateLogo();
    this.route.params.subscribe(params => {
      this.personId = +params.id;
      this.participantRestApiService.getPerson({id: this.personId})
        .then(person => {
          this.person = person;

          // load user roles
          this.participantRestApiService.getUserRoles({id: this.person.user.id})
            .then(userRoles => {
              this.userRoles = userRoles;
              if (userRoles.length) {
                this.roleToggle = userRoles[0];
                this.onRoleChange();
              }
            });

          this.participantRestApiService.getPersonSportTypes({id: this.personId})
            .then(personSportTypes => {
              this.personSportTypes = personSportTypes;
              if (personSportTypes.length) {
                this.sportTypeToggle = personSportTypes[0];
                this.onSportTypeChange();
              }
            });

          // load person address
          this.participantRestApiService.getPersonAddress({id: this.personId})
            .then(address => {
              this.person.address = address;
              /*fixme load only when user tries to change value*/
              this.loadCountries();
              if (this.person.address.country != null) {
                this.loadRegions(this.person.address.country.id);
                if (this.person.address.region != null) {
                  this.loadCities(this.person.address.region.id);
                  if (this.person.address.city == null) {
                    this.person.address.city = new City();
                  }
                } else {
                  this.person.address.region = new Region();
                  this.person.address.city = new City();
                }
              } else {
                this.person.address.country = new Country();
                this.person.address.region = new Region();
                this.person.address.city = new City();
              }
            }).catch(error => {
            this.person.address = new Address();
            this.person.address.country = new Country();
            this.person.address.region = new Region();
            this.person.address.city = new City();
          });
        }).catch(error => {
        this.router.navigate(['not-found']);
      });
    });
  }

  private async loadCountries() {
    this.countries = (await this.participantRestApiService.getCountries({count: 2147483647})).list;
  }

  private async loadRegions(countryId: number) {
    this.regions = (await this.participantRestApiService.getRegions({countryId: countryId, count: 2147483647})).list;
  }

  private async loadCities(regionId: number) {
    this.cities = (await this.participantRestApiService.getCities({regionId: regionId, count: 2147483647})).list;
  }

}
