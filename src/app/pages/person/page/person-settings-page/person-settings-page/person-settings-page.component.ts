import {Component, OnDestroy, OnInit} from '@angular/core';
import {Locale} from '../../../../../data/remote/misc/locale';
import {LocalStorageService} from '../../../../../shared/local-storage.service';
import {TranslateObjectService} from '../../../../../shared/translate-object.service';
import {NgxSelect} from '../../../../../module/ngx/ngx-select/model/ngx-select';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-person-settings-page',
  templateUrl: './person-settings-page.component.html',
  styleUrls: ['./person-settings-page.component.scss']
})
export class PersonSettingsPageComponent implements OnInit, OnDestroy {

  public languageNgxSelect: NgxSelect;
  private _notDestroyed = true;

  constructor(private _localStorageService: LocalStorageService,
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
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
