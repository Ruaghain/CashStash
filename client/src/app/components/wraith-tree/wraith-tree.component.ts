import {Component, Input} from '@angular/core';
import {WraithTreeNode} from './wraith-tree.node';
import {WraithTreeService} from './wraith-tree.service';

// https://plnkr.co/edit/IrW82ye4NKK8cYEPxsFc?p=preview
@Component({
  selector: 'wraith-tree',
  styleUrls: ['./wraith-tree.component.scss'],
  templateUrl: './wraith-tree.component.html'
})

export class WraithTreeComponent {

  private _node: WraithTreeNode;

  constructor(private wraithTreeService: WraithTreeService) {

  }

  @Input()
  set node(node: WraithTreeNode) {
    this._node = node;
  }

  get node(): WraithTreeNode {
    return this._node;
  }

  onDrop = (event: any) => {
    event.preventDefault();

    let result = {};
    result['targetId'] = this._node.getId();
    result['id'] = event.dataTransfer.getData('nodeId');

    this.wraithTreeService.emitNodeDropped(result);
  };

  nodeClick = (event: any) => {
    event.stopPropagation();

    let clickedNode = this._node;
    let result = {};
    result['targetId'] = clickedNode.getId();
    this.wraithTreeService.emitNodeExpanded(result);
    clickedNode.setExpanded(!clickedNode.isExpanded());
  };

  drag = (event: any) => {
    event.dataTransfer.setData('nodeId', this._node.getId());
  };

  allowDrop = (event: any) => {
    event.preventDefault();
  };
}
