import {Component, OnInit} from '@angular/core';
import {PersonService} from '../person.service';
import {Person} from '../../../../data/remote/model/person';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Address} from '../../../../data/remote/model/address';
import {ProfileService} from '../../../../shared/profile.service';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {UserRole} from '../../../../data/remote/model/user-role';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public readonly isEditAllow: boolean;
  public readonly person: Person;
  public readonly pageSize: number;
  public readonly sexEnumValues: SexEnum[];

  public userRoles: UserRole[];
  public baseUserRole: UserRole;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _profileService: ProfileService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    this.pageSize = PropertyConstant.pageSize;
    this.person = _personService.shared.person;
    this.sexEnumValues = Object.keys(SexEnum)
      .filter(e => parseInt(e, 10) >= 0)
      .map(k => SexEnum[k]);
  }

  async ngOnInit() {
    // load person address
    this._participantRestApiService.getPersonAddress({id: this.person.id})
      .then(address => this.person.address = address)
      .catch(() => this.person.address = new Address());

    // TODO:
    this.userRoles = await this._participantRestApiService.getUserRolesByUser({id: this.person.user.id});

    try {
      this.baseUserRole = await this._participantRestApiService.getBaseUserRoleByUser({id: this.person.user.id});
    } catch (e) {
      this.baseUserRole = null;
    }
  }

  onCountryChange(e: any) {
    this.person.address.region = null;
    this.person.address.city = null;
  }

  onRegionChange(e: any): void {
    this.person.address.city = null;
  }

  async savePersonal() {
    await this._participantRestApiService.updatePerson(this.person, {id: this.person.id});
    this._profileService.emitFullNameChange(this.person);

    try {
      if (this.baseUserRole) {
        await this._participantRestApiService.postBaseUserRoleByUser({id: this.baseUserRole.id});
      }
    } catch (e) {
    }
  }

  loadCountries = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCountries({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  loadRegions = async (from: number, searchText: string) => {
    return this._participantRestApiService.getRegions({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this.person.address.country.id
    });
  };

  loadCities = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCities({
      from: from,
      count: this.pageSize,
      name: searchText,
      regionId: this.person.address.region.id
    });
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: NamedObject) {
    return item.name;
  }

}
