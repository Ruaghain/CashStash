import { I18nService } from './i18n.service';
import { inject, TestBed } from '@angular/core/testing';
import { TRANSLATION_PROVIDERS_STUB } from './translation-provider-stub';
import { I18nPipe } from './i18n.pipe';

describe('i18nPipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        I18nPipe,
        I18nService,
        TRANSLATION_PROVIDERS_STUB
      ]
    })
  });

  describe('transform()', () => {
    it('correctly translates the given value', inject([I18nPipe], (i18nPipe: any) => {
      expect(i18nPipe.transform('account.accounts')).toEqual('Test Accounts')
    }));

    it('returns default value for invalid input', inject([I18nPipe], (i18nPipe: any) => {
      expect(i18nPipe.transform('account.accounts.invalid')).toEqual('**No Translation')
    }));
  });
});
