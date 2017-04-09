import { LANG_EN_NAME, LANG_EN_TRANSLATIONS } from './translations/translation-en';
import { LANG_ES_NAME, LANG_ES_TRANSLATIONS } from './translations/translation-es';
import { TRANSLATIONS } from '../../components/i18n/i18n.translations';

const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANSLATIONS,
  [LANG_ES_NAME]: LANG_ES_TRANSLATIONS
};

export const TRANSLATION_PROVIDERS = [
  {
    provide: TRANSLATIONS,
    useValue: dictionary
  }
];
