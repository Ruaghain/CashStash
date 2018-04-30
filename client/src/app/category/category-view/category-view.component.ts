import {Component, OnInit} from "@angular/core";
import {WraithTreeNode} from "../../components/wraith-tree/wraith-tree.node";

@Component({
  selector: 'category-view',
  templateUrl: './category-view.component.html'
})

export class CategoryViewComponent implements OnInit {

  public node: WraithTreeNode = new WraithTreeNode('-1', 'Categories', true);

  ngOnInit(): void {
  }

}
