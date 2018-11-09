import {Injectable} from '@angular/core';
import {Locale} from '../data/remote/misc/locale';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class LocalStorageService {

  private readonly localeName: string;
  private readonly sessionIdName: string;
  private readonly lastGroupNameName: string;

  constructor(private _translateService: TranslateService,
              private _cookieService: CookieService) {
    this.localeName = 'locale';
    this.sessionIdName = 'rsi';
    this.lastGroupNameName = 'lastGroupName';
  }

  public signOut(): void {
    this._cookieService.remove(this.sessionIdName);
  }

  public setLocale(localeKey: string): void {
    if (!this.existLocaleKey(localeKey)) {
      localeKey = this.getCurrentLocale();
    }

    localStorage.setItem(this.localeName, localeKey);
    this._translateService.use(localeKey);
  }

  public getCurrentLocale(): string {
    const localeKey = localStorage.getItem(this.localeName);
    if (!this.existLocaleKey(localeKey)) {
      let locale = Locale.en;
      const browserLocaleKey = this._translateService.getBrowserLang();
      if (!this.existLocaleKey(browserLocaleKey)) {
        locale = Locale[browserLocaleKey];
      }
      return locale;
    }
    return Locale[localeKey];
  }

  public getSessionId(): string {
    return this._cookieService.get(this.sessionIdName);
  }

  public getLastGroupName(): string {
    return localStorage.getItem(this.lastGroupNameName);
  }

  public setLastGroupName(val: string): void {
    if (val) {
      localStorage.setItem(this.lastGroupNameName, val);
    } else {
      localStorage.removeItem(this.lastGroupNameName);
    }
  }

  private existLocaleKey(key: string): boolean {
    return key && Locale[key];
  }

}
