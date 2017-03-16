import { NgModule } from "@angular/core";
import { ButtonListComponent } from "./button-list/button-list.component";
import { ButtonListItemComponent } from "./button-list/button-list-item/button-list-item.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ButtonListComponent,
    ButtonListItemComponent,
    TopbarComponent,
    NavbarComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ButtonListComponent,
    TopbarComponent,
    NavbarComponent
  ]
})

export class WraithModule {

}
