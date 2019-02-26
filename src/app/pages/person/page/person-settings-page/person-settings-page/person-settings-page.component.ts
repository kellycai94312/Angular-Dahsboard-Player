import {Component, OnInit} from '@angular/core';
import {NameWrapper} from '../../../../../data/local/name-wrapper';
import {Locale} from '../../../../../data/remote/misc/locale';
import {LocalStorageService} from '../../../../../shared/local-storage.service';
import {TranslateObjectService} from '../../../../../shared/translate-object.service';

@Component({
  selector: 'app-person-settings-page',
  templateUrl: './person-settings-page.component.html',
  styleUrls: ['./person-settings-page.component.scss']
})
export class PersonSettingsPageComponent implements OnInit {

  public languages: NameWrapper<Locale>[];
  public selectedLanguage: NameWrapper<Locale>;

  constructor(private _localStorageService: LocalStorageService,
              private _translateObjectService: TranslateObjectService) {
  }

  async ngOnInit() {
    this.languages = await this._translateObjectService.getTranslatedEnumCollection<Locale>(Locale, 'LocaleEnum');
    const currentLanguage = this._localStorageService.getCurrentLocale();
    this.selectedLanguage = this.languages.find(x => x.data === currentLanguage);
  }

  public onLanguageChanged(val: NameWrapper<Locale>) {
    this._localStorageService.setLocale(val.data);
  }

}
