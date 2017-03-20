import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";

//This is used if components are shared across multiple modules. Used in the usual way. Define imports etc
//and then just export the used ones.
@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class SharedModule {
}
