import { NgModule } from '@angular/core';
import { ButtonListComponent } from './button-list/button-list.component';
import { ButtonListItemComponent } from './button-list/button-list-item/button-list-item.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { FlashComponent } from './flash/flash.component';
import { FlashService } from './flash/flash.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ButtonListComponent,
    ButtonListItemComponent,
    TopbarComponent,
    NavbarComponent,
    FlashComponent
  ],
  providers: [
    FlashService
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [
    ButtonListComponent,
    TopbarComponent,
    NavbarComponent,
    FlashComponent
  ]
})

export class WraithModule {

}
