import {Component, Input} from '@angular/core';
import {LocalStorageService} from '../../shared/local-storage.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.scss']
})
export class LocaleComponent {

  @Input()
  public compact: boolean;

  constructor(public translate: TranslateService,
              private _localStorageService: LocalStorageService) {
  }

  onItemChange(localeKey: string) {
    this._localStorageService.setLocale(localeKey);
  }

}
