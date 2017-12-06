import { Component, OnInit } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '../../../data/remote/misc/locale';
import { SexEnum } from '../../../data/remote/misc/sex-enum';
import { Address } from '../../../data/remote/model/address';
import { Country } from '../../../data/remote/model/country';
import { Region } from '../../../data/remote/model/region';
import { City } from '../../../data/remote/model/city';
import { HttpClient } from '@angular/common/http';
import { PageContainer } from '../../../data/remote/bean/page-container';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  private person: Person;
  private readonly sexEnumValues: SexEnum[] = Object.keys(SexEnum).map(k => SexEnum[k]);
  private countries: Country[];
  private regions: Region[];
  private cities: City[];

  constructor(public translate: TranslateService,
              public http: HttpClient) {
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

    this.loadCountries();
    this.loadRegions(country.id);
    this.loadCities(region.id);
  }

  private loadCountries(): void {
    this.http.get(`http://localhost:8082/country/filter?count=2147483647`, {withCredentials: true})
      .toPromise()
      .then(response => this.countries = (response as PageContainer<Country>).list);
  }

  private loadRegions(countryId: number): void {
    this.http.get(`http://localhost:8082/region/filter?countryId=${countryId}&count=2147483647`, {withCredentials: true})
      .toPromise()
      .then(response => this.regions = (response as PageContainer<Region>).list);
  }

  private loadCities(regionId: number): void {
    this.http.get(`http://localhost:8082/city/filter?regionId=${regionId}&count=2147483647`, {withCredentials: true})
      .toPromise()
      .then(response => this.cities = (response as PageContainer<City>).list);
  }

}
