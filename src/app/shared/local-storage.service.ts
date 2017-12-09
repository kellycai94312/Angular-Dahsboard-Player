import { Injectable } from '@angular/core';
import { Locale } from '../data/remote/misc/locale';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LocalStorageService {

  private readonly userId: string;
  private readonly personId: string;

  private readonly locale: string;

  constructor(private translateService: TranslateService) {
    this.userId = 'user_id';
    this.personId = 'person_id';
    this.locale = 'locale';
  }

  public saveUserId(id: number): void {
    localStorage.setItem(this.userId, id.toString());
  }

  public savePersonId(id: number): void {
    localStorage.setItem(this.personId, id.toString());
  }

  public getCurrentUserId(): number {
    return +localStorage.getItem(this.userId);
  }

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

}
