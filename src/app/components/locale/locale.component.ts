import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.scss']
})
export class LocaleComponent implements OnInit {

  constructor(public translate: TranslateService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  onItemChange(localeKey: string) {
    this.localStorageService.setLocale(localeKey);
  }
}
