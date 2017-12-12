import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../../../../data/remote/model/person';
import { City } from '../../../../data/remote/model/city';
import { Region } from '../../../../data/remote/model/region';
import { Country } from '../../../../data/remote/model/country';
import { SexEnum } from '../../../../data/remote/misc/sex-enum';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { Address } from '../../../../data/remote/model/address';
import { NavBarService } from '../../../../layout/nav-bar/nav-bar.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  private person: Person;
  private isEditAllow: boolean;

  private readonly sexEnumValues: SexEnum[] = Object.keys(SexEnum)
    .filter(e => parseInt(e, 10) >= 0)
    .map(k => SexEnum[k]);
  private countries: Country[];
  private regions: Region[];
  private cities: City[];

  constructor(private participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _navbarService: NavBarService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    this.person = _personService.shared.person;
  }

  ngOnInit() {
    // load person address
    this.participantRestApiService.getPersonAddress({id: this.person.id})
      .then(address => {
        this.person.address = address;
        /*fixme load only when user tries to change value*/
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
    this.loadCountries();
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
    this._navbarService.emitFullNameChange(this.person);
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
