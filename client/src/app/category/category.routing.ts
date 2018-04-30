import {RouterModule, Routes} from "@angular/router";
import {CategoryComponent} from "./category.component";
import {CategoryViewComponent} from "./category-view/category-view.component";

const CATEGORY_ROUTES: Routes = [{
  path: 'category', component: CategoryComponent, children: [
    { path: '', component: CategoryViewComponent }
  ]
}];

export const categoryRouting = RouterModule.forChild(CATEGORY_ROUTES)
