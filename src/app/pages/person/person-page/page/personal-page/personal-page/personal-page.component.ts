import {Component, OnInit} from '@angular/core';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {UserRoleEnum} from '../../../../../../data/remote/model/user-role-enum';
import {Person} from '../../../../../../data/remote/model/person';
import {UserRole} from '../../../../../../data/remote/model/user-role';
import {NameWrapper} from '../../../../../../data/local/name-wrapper';
import {SexEnum} from '../../../../../../data/remote/misc/sex-enum';
import {AthleteState} from '../../../../../../data/remote/model/person/athlete-state';
import {PersonService} from '../../../service/person.service';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {TranslateObjectService} from '../../../../../../shared/translate-object.service';
import {IdentifiedObject} from '../../../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../../../data/remote/base/named-object';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {

  public readonly propertyConstant = PropertyConstant;
  public readonly userRoleEnum = UserRoleEnum;
  public readonly pageSize: number;

  public allowEdit: boolean;
  public person: Person;
  public baseUserRole: UserRole;
  public sexEnumNameWrappers: NameWrapper<SexEnum>[];
  public selectedSexEnum: NameWrapper<SexEnum>;
  public athleteStates: AthleteState[];

  constructor(public personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
    this.pageSize = PropertyConstant.pageSize;
    this.person = this.personService.personViewModel.data;
  }

  async ngOnInit() {
    this.allowEdit = await this.personService.allowEdit();

    this.sexEnumNameWrappers = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.selectedSexEnum = this.sexEnumNameWrappers.find(x => x.data === this.person.sex);
    this.athleteStates = await this._participantRestApiService.getAthleteStates();
    try {
      if (this.person && this.person.id) {
        this.person.address = await this._participantRestApiService.getPersonAddress({id: this.person.id});
        // this.baseUserRole = await this._participantRestApiService.getBaseUserRoleByUser({userId: this.person.user.id});
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

  public onSave = async () => {
    await this._appHelper.trySave(async () => {
      this.person.sex = this.selectedSexEnum.data;
      const person = await this._participantRestApiService.updatePerson(this.person, {}, {personId: this.person.id});
      this.personService.personViewModel.update(person);

      // TODO: this._profileService.emitFullNameChange(this.person);
      if (this.baseUserRole) {
        await this._participantRestApiService.updateUserBaseUserRole(this.baseUserRole, {}, {userId: this.personService.personViewModel.data.user.id});
      }
    });
  };

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
