import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TRANSLATION_PROVIDERS } from './i18n/translation-provider';

//This is used if components are shared across multiple modules. Used in the usual way. Define imports etc
//and then just export the used ones.
@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    TRANSLATION_PROVIDERS
  ]
})
export class SharedModule {
}
