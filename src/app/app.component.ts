import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from "./data/index";
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    this.initLangs();
  }

  private initLangs(): void {
    var langs: Array<string> = [];

    for (var item in Locale)
      langs.push(Locale[item]);
    this.translate.addLangs(langs);

    this.translate.setDefaultLang(Locale.English);
    let browserLang = this.translate.getBrowserLang();
    this.translate.use(langs.find(x => x === browserLang) != null ? browserLang : Locale.English);
  }

}
