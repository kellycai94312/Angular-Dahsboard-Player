import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from "./data/index";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(Locale.English);
  }

}
