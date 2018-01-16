import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from './data/index';
import { LocalStorageService } from './shared/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _translate: TranslateService,
              private _localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.initLangs();
  }

  private initLangs(): void {
    const langs: Array<string> = [];

    for (const item in Locale) {
      langs.push(Locale[item]);
    }
    this._translate.addLangs(langs);

    const currentLocale = this._localStorageService.getCurrentLocale();
    const localeKey = Locale[currentLocale].toString();
    this._translate.setDefaultLang(localeKey);
    this._translate.use(localeKey);
  }

}
