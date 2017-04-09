import { TRANSLATIONS } from './i18n.translations';

const dictionary = {
  ['en']: {
    account: {
      accounts: 'Test Accounts'
    }
  }
};

export const TRANSLATION_PROVIDERS_STUB = [
  {
    provide: TRANSLATIONS,
    useValue: dictionary
  }
];
