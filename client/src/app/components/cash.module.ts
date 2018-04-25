import { NgModule } from '@angular/core';
import { ButtonListComponent } from './button-list/button-list.component';
import { ButtonListItemComponent } from './button-list/button-list-item/button-list-item.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { FlashComponent } from './flash/flash.component';
import { FlashService } from './flash/flash.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { I18nService } from './i18n/i18n.service';
import { I18nPipe } from './i18n/i18n.pipe';
import { WraithTreeComponent } from './wraith-tree/wraith-tree.component';
import { WraithTreeService } from './wraith-tree/wraith-tree.service';

@NgModule({
  declarations: [
    ButtonListComponent,
    ButtonListItemComponent,
    TopbarComponent,
    NavbarComponent,
    FlashComponent,
    I18nPipe,
    WraithTreeComponent
  ],
  providers: [
    FlashService,
    I18nService,
    WraithTreeService
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [
    ButtonListComponent,
    TopbarComponent,
    NavbarComponent,
    FlashComponent,
    I18nPipe,
    WraithTreeComponent
  ]
})

export class CashModule {

}
