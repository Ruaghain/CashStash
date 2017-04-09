import { async, inject, TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';
import { TRANSLATION_PROVIDERS_STUB } from './translation-provider-stub';

describe('i18nService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        I18nService,
        TRANSLATION_PROVIDERS_STUB
      ]
    })
  }));

  describe('use()', () => {
    it('sets the passed in language', inject([I18nService], (i18nService: any) => {
      i18nService.use('ie');
      expect(i18nService.currentLanguage).toEqual('ie');
    }));
  });

  describe('translate()', () => {
    it('retrieves the correct translation for a valid key', inject([I18nService], (i18nService: any) => {
      let result = i18nService.translate('account.accounts');
      expect(result).toEqual('Test Accounts');
    }));

    it('retrieves a default translation for an invalid key', inject([I18nService], (i18nService: any) => {
      let result = i18nService.translate('account.account.fake');
      expect(result).toEqual('**No Translation');
    }));
  })
});
