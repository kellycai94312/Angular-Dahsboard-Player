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
import { QueryParams } from '../../../../data/remote/rest-api/query-params';

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

  constructor(private participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _navbarService: NavBarService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    this.person = _personService.shared.person;
  }

  ngOnInit() {
    // load person address
    this.participantRestApiService.getPersonAddress({id: this.person.id})
      .then(address => this.person.address = address)
      .catch(() => this.person.address = new Address());
  }

  onCountryChange(e: any) {
    this.person.address.region = null;
    this.person.address.city = null;
    console.log(1);
  }

  onRegionChange(e: any): void {
    this.person.address.city = null;
    console.log(2);
  }

  async savePersonal() {
    await this.participantRestApiService.updatePerson(this.person, {id: this.person.id});
    this._navbarService.emitFullNameChange(this.person);
  }

  loadCountries = (query: QueryParams) => {
    return this.participantRestApiService.getCountries(query);
  }

  loadRegions = (query: QueryParams) => {
    query.countryId = this.person.address.country.id;
    return this.participantRestApiService.getRegions(query);
  }

  loadCities = (query: QueryParams) => {
    query.regionId = this.person.address.region.id;
    return this.participantRestApiService.getCities(query);
  }

}
