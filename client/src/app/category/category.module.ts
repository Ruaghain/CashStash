import {NgModule} from "@angular/core";
import {CategoryViewComponent} from "./category-view/category-view.component";
import {CashModule} from "../components/cash.module";
import {categoryRouting} from "./category.routing";
import {SharedModule} from "../shared/shared.module";
import {CategoryComponent} from "./category.component";

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryViewComponent
  ],
  imports: [
    SharedModule,
    CashModule,
    categoryRouting
  ]
})

export class CategoryModule {

}
