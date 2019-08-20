import {Component, OnDestroy, OnInit} from '@angular/core';
import {Locale} from '../../../../../data/remote/misc/locale';
import {LocalStorageService} from '../../../../../shared/local-storage.service';
import {TranslateObjectService} from '../../../../../shared/translate-object.service';
import {NgxSelect} from '../../../../../module/ngx/ngx-select/model/ngx-select';
import {takeWhile} from 'rxjs/operators';
import {AuthorizationService} from '../../../../../shared/authorization.service';
import {Person} from '../../../../../data/remote/model/person';

@Component({
  selector: 'app-person-settings-page',
  templateUrl: './person-settings-page.component.html',
  styleUrls: ['./person-settings-page.component.scss']
})
export class PersonSettingsPageComponent implements OnInit, OnDestroy {

  public languageNgxSelect: NgxSelect;
  public person: Person;
  private _notDestroyed = true;

  constructor(private _localStorageService: LocalStorageService,
              private _authorizationService: AuthorizationService,
              private _translateObjectService: TranslateObjectService) {
  }

  async ngOnInit() {
    const currentLanguage = this._localStorageService.getCurrentLocale();

    this.languageNgxSelect = new NgxSelect();
    this.languageNgxSelect.labelTranslation = 'language';
    this.languageNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<Locale>(Locale, 'LocaleEnum');
    this.languageNgxSelect.control.setValue(this.languageNgxSelect.items.find(x => x.data === currentLanguage));
    this.languageNgxSelect.display = 'name';
    this.languageNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe((value) => {
        this._localStorageService.setLocale(value.data);
      });

    this._authorizationService.person$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        this.person = value;
      });
  }

  ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
