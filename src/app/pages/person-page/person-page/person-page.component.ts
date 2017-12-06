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
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { PageContainer } from '../../../data/remote/bean/page-container';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  private person: Person;
  private readonly sexEnumValues: SexEnum[] = Object.keys(SexEnum).map(k => SexEnum[k]);
  private countriesDS: any = {};

  constructor(public translate: TranslateService,
              public http: HttpClient) {
    this.initLangs();

    this.countriesDS = new DataSource({
      store: new CustomStore({
        load: function (loadOptions: any) {
          const from = loadOptions.skip || 0;
          const count = loadOptions.take || 20;
          return http.get(`http://localhost:8082/country/filter?from=${from}&count=${count}`, {withCredentials: true})
            .toPromise()
            .then(response => {
              return {
                data: (response as PageContainer<Country>).list
              };
            });
        },
        byKey: function (key) {
          return http.get(`http://localhost:8082/country/filter?name=${key}`, {withCredentials: true})
            .toPromise()
            .then(response => {
              return {
                data: (response as PageContainer<Country>).list
              };
            });
        }
      })
    });
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
    country.id = 1;
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
    address.city = city;
    this.person.address = address;
    console.log(this.person.address.city.region.country.id);
  }

}
