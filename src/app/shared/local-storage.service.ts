import {Injectable} from '@angular/core';
import {Locale} from '../data/remote/misc/locale';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class LocalStorageService {

  private readonly userId: string;
  private readonly personId: string;

  private readonly locale: string;
  private readonly sessionId: string;

  constructor(private translateService: TranslateService,
              private cookieService: CookieService) {
    this.userId = 'user_id';
    this.personId = 'person_id';
    this.locale = 'locale';
    this.sessionId = 'rsi';
  }

  public signOut(): void {
    localStorage.removeItem(this.userId);
    localStorage.removeItem(this.personId);

    this.cookieService.remove(this.sessionId);
  }

  /**
   * @deprecated Use AuthorizationService
   */
  public saveUserId(id: number): void {
    localStorage.setItem(this.userId, id.toString());
  }

  /**
   * @deprecated Use AuthorizationService
   */
  public savePersonId(id: number): void {
    localStorage.setItem(this.personId, id.toString());
  }

  /**
   * @deprecated Use AuthorizationService
   */
  public getCurrentUserId(): number {
    return +localStorage.getItem(this.userId);
  }

  /**
   * @deprecated Use AuthorizationService
   */
  public getCurrentPersonId(): number {
    return +localStorage.getItem(this.personId);
  }

  public setLocale(localeKey: string): void {
    if (localeKey == null || Locale[localeKey] == null) {
      localeKey = this.getCurrentLocale();
    }

    localStorage.setItem(this.locale, localeKey);
    this.translateService.use(localeKey);
  }

  public getCurrentLocale(): string {
    const localeKey = localStorage.getItem(this.locale);
    if (localeKey == null || Locale[localeKey] == null) {
      let locale = Locale.en;

      const browserLocaleKey = this.translateService.getBrowserLang();
      if (browserLocaleKey == null || Locale[browserLocaleKey] == null) {
        locale = Locale[browserLocaleKey];
      }
      this.setLocale(locale);
      return locale;
    }
    return Locale[localeKey].toString();
  }

  public getSessionId(): string {
    return this.cookieService.get(this.sessionId);
  }
}
