import { Component, OnInit } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { TranslateService } from '@ngx-translate/core';
import { SexEnum } from '../../../data/remote/misc/sex-enum';
import { Address } from '../../../data/remote/model/address';
import { Country } from '../../../data/remote/model/country';
import { Region } from '../../../data/remote/model/region';
import { City } from '../../../data/remote/model/city';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  public person: Person;
  private readonly sexEnumValues: SexEnum[] = Object.keys(SexEnum).map(k => SexEnum[k]);
  private countries: Country[];
  private regions: Region[];
  private cities: City[];

  constructor(public translate: TranslateService,
              public participantRestApiService: ParticipantRestApiService) {
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


  ngOnInit() {
    this.person = new Person();
    this.person.firstName = 'Денис';
    this.person.lastName = 'Иванов';
    this.person.patronymic = 'Петрович';
    this.person.birthDate = new Date();
    this.person.sex = SexEnum.MALE;
    this.person.countryCode = '7';
    this.person.phoneNumber = '912344556';

    const country = new Country();
    country.id = 218;
    country.name = 'Россия';
    const region = new Region();
    region.id = 1;
    region.name = 'Санкт-Петербург и область';
    region.country = country;
    const city = new City();
    city.id = 1;
    city.name = 'Санкт-Петербург';
    city.region = region;
    const address = new Address();
    address.country = country;
    address.region = region;
    address.city = city;
    this.person.address = address;

    /*fixme load only when user tries to change value*/
    this.loadCountries();
    this.loadRegions(country.id);
    this.loadCities(region.id);
  }

  private async loadCountries() {
    this.countries = (await this.participantRestApiService.getCountries()).list;
  }

  private async loadRegions(countryId: number) {
    this.regions = (await this.participantRestApiService.getRegions({countryId: countryId})).list;
  }

  private async loadCities(regionId: number) {
    this.cities = (await this.participantRestApiService.getCities({regionId: regionId})).list;

  }

}
