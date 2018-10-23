import {Component, Input} from '@angular/core';
import {LocalStorageService} from '../../shared/local-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {EnvironmentType} from '../../../environments/environment-type';
import {IEnvironment} from '../../../environments/ienvironment';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.scss']
})
export class LocaleComponent {

  public readonly environmentTypeClass = EnvironmentType;
  public readonly environment: IEnvironment;

  @Input()
  public compact: boolean;

  constructor(public translate: TranslateService,
              private _localStorageService: LocalStorageService) {
    this.environment = environment;
  }

  onItemChange(localeKey: string) {
    this._localStorageService.setLocale(localeKey);
  }

}
