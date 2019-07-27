import {Inject, Injectable} from '@angular/core';
import {TRANSLATIONS} from './i18n.translations';
import * as _ from 'lodash'

@Injectable()
export class I18nService {
  private currentLang: string = 'en';

  constructor(@Inject(TRANSLATIONS) private translations: any) {
  }

  public get currentLanguage() {
    return this.currentLang;
  }

  public use(language: string): void {
    this.currentLang = language
  }

  public translate(key: string): string {
    return _.get(this.translations[this.currentLang], key, '**No Translation').toString();
  }
}
