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

  constructor(private translate: TranslateService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.initLangs();
  }

  private initLangs(): void {
    const langs: Array<string> = [];

    for (const item in Locale) {
      langs.push(Locale[item]);
    }
    this.translate.addLangs(langs);

    const currentLocale = this.localStorageService.getCurrentLocale();
    const localeKey = Locale[currentLocale].toString();
    this.translate.setDefaultLang(localeKey);
    this.translate.use(localeKey);
  }

}
