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
import {Sex} from '../../../../data/local/sex';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {AthleteState} from '../../../../data/remote/model/person/athlete-state';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public readonly userRoleEnum = UserRoleEnum;
  public readonly pageSize: number;
  public readonly sexValues: Sex[];

  public allowEdit: boolean;
  public person: Person;
  public baseUserRole: UserRole;
  public selectedSex: Sex;
  public athleteStates: AthleteState[];

  constructor(public personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
    this.pageSize = PropertyConstant.pageSize;
    this.sexValues = [];
    this.person = this.personService.personViewModel.data;
  }

  async ngOnInit() {
    const temp = Object.keys(SexEnum).filter(x => !isNaN(Number(SexEnum[x]))).map(x => SexEnum[x]);
    for (let i = 0; i < temp.length; i++) {
      const sex = new Sex();
      sex.name = await this._translateObjectService.getTranslateName('SexEnum', SexEnum[temp[i]].toString());
      sex.sexEnum = temp[i];
      this.sexValues.push(sex);
    }

    this.selectedSex = this.sexValues.find(x => SexEnum[x.sexEnum].toString() === this.person.sex.toString());
    this.athleteStates = await this._participantRestApiService.getAthleteStates();
    this.allowEdit = await this.personService.allowEdit();
    try {
      if (this.person && this.person.id) {
        this.person.address = await this._participantRestApiService.getPersonAddress({id: this.person.id});
        this.baseUserRole = await this._participantRestApiService.getBaseUserRoleByUser({userId: this.person.user.id});
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
      this.person.sex = this.selectedSex.sexEnum;
      const person = await this._participantRestApiService.updatePerson(this.person, {id: this.person.id});
      this.personService.personViewModel.update(person);

      // TODO: this._profileService.emitFullNameChange(this.person);
      if (this.baseUserRole) {
        await this._participantRestApiService.updateUserBaseUserRole(this.baseUserRole, {}, {userId: this.personService.personViewModel.data.user.id});
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
