import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../../../../data/remote/model/person';
import { SexEnum } from '../../../../data/remote/misc/sex-enum';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { Address } from '../../../../data/remote/model/address';
import { ProfileService } from '../../../../layout/shared/profile.service';
import { IdentifiedObject } from '../../../../data/remote/base/identified-object';
import { NamedObject } from '../../../../data/remote/base/named-object';
import { PropertyConstant } from '../../../../data/local/property-constant';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  person: Person;
  isEditAllow: boolean;
  public pageSize = PropertyConstant.pageSize;
  readonly sexEnumValues: SexEnum[] = Object.keys(SexEnum)
    .filter(e => parseInt(e, 10) >= 0)
    .map(k => SexEnum[k]);

  constructor(private participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _profileService: ProfileService) {
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
  }

  onRegionChange(e: any): void {
    this.person.address.city = null;
  }

  async savePersonal() {
    await this.participantRestApiService.updatePerson(this.person, {id: this.person.id});
    this._profileService.emitFullNameChange(this.person);
  }

  loadCountries = async (from: number, searchText: string) => {
    return this.participantRestApiService.getCountries({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  }

  loadRegions = async (from: number, searchText: string) => {
    return this.participantRestApiService.getRegions({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this.person.address.country.id
    });
  }

  loadCities = async (from: number, searchText: string) => {
    return this.participantRestApiService.getCities({
      from: from,
      count: this.pageSize,
      name: searchText,
      regionId: this.person.address.region.id
    });
  }

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: NamedObject) {
    return item.name;
  }

}
