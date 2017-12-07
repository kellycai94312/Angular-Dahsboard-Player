import { Component, OnInit } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '../../../data/remote/misc/locale';
import { SexEnum } from '../../../data/remote/misc/sex-enum';
import { Country } from '../../../data/remote/model/country';
import { Region } from '../../../data/remote/model/region';
import { City } from '../../../data/remote/model/city';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { UserRole } from '../../../data/remote/model/user-role';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Address } from '../../../data/remote/model/address';
import { ListRequest } from '../../../data/remote/rest-api/list-request';
import { SportType } from '../../../data/remote/model/sport-type';

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

  constructor(public translate: TranslateService,
              public participantRestApiService: ParticipantRestApiService,
              private router: Router,
              private route: ActivatedRoute) {
    this.initLangs();
  }

  private initLangs(): void {
    const langs: Array<string> = [];

    for (const item in Locale)
      langs.push(Locale[item]);
    this.translate.addLangs(langs);

    this.translate.setDefaultLang(Locale.English);
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(langs.find(x => x === browserLang) != null ? browserLang : Locale.English);
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
    await this.participantRestApiService.updatePerson(this.person, {id: this.person.id});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.participantRestApiService.getPerson({id: +params.id})
        .then(person => {
          this.person = person;

          // load user roles
          this.participantRestApiService.getUserRoles({id: this.person.user.id})
            .then(userRoles => this.userRoles = userRoles);

          this.participantRestApiService.getPersonSportTypes({id: +params.id})
            .then(personSportTypes => this.personSportTypes = personSportTypes);

          /*fixme load only when user tries to change value*/
          this.loadCountries();
          if (this.person.address === null) {
            const country = new Country();
            const region = new Region();
            const city = new City();
            this.person.address = new Address();
            this.person.address.country = country;
            this.person.address.region = region;
            this.person.address.city = city;
          } else {
            if (this.person.address.country !== null) {
              this.loadRegions(this.person.address.country.id);
            }
            if (this.person.address.city !== null) {
              this.loadCities(this.person.address.city.id);
            }
          }
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
