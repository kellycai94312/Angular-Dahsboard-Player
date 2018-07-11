import {Component, OnInit} from '@angular/core';
import {PersonService} from '../person.service';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {UserRole} from '../../../../data/remote/model/user-role';
import {Person} from '../../../../data/remote/model/person';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public readonly pageSize: number;
  public readonly sexEnumValues: SexEnum[];

  public allowEdit: boolean;
  public person: Person;
  public baseUserRole: UserRole;

  constructor(public personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private  _appHelper: AppHelper) {
    this.pageSize = PropertyConstant.pageSize;
    this.sexEnumValues = Object.keys(SexEnum)
      .filter(e => parseInt(e, 10) >= 0)
      .map(k => SexEnum[k]);
  }

  async ngOnInit() {
    this.person = this.personService.personViewModel.data;
    this.allowEdit = this.personService.allowEdit();
    try {
      if (this.person && this.person.id) {
        this.person.address = await this._participantRestApiService.getPersonAddress({id: this.person.id});
        this.baseUserRole = await this._participantRestApiService.getBaseUserRoleByUser({id: this.person.user.id});
      }
    } catch (e) {
    }
  }

  onCountryChange(e: any) {
    this.person.address.region = null;
    this.person.address.city = null;
  }

  onRegionChange(e: any): void {
    this.person.address.city = null;
  }

  public async onSave() {
    try {
      const person = await this._participantRestApiService.updatePerson(this.person, {id: this.person.id});
      this.personService.personViewModel.update(person);

      // TODO: this._profileService.emitFullNameChange(this.person);
      if (this.baseUserRole) {
        await this._participantRestApiService.postBaseUserRoleByUser({id: this.baseUserRole.id});
      }
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
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
