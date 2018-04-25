import { EventEmitter, Injectable } from '@angular/core';

/**
 * To use this service the owning component will have to subscribe to the relevant
 * events in gnOnInit. e.g.
 *
 *  private dropSubscription: any;
 *  private expandSubscription: any;
 *
 *  ngOnInit(): void {
 *   this.dropSubscription = this.wraithTreeService.getNodeDroppedEmitter().subscribe((item: any) => this.nodeDropped(item));
 *   this.expandSubscription = this.wraithTreeService.getNodeExpandedEmitter().subscribe((item: any) => this.nodeExpanded(item));
 *  }
 *
 *  ngOnDestroy(): void {
 *    this.dropSubscription.unsubscribe();
 *    this.expandSubscription.unsubscribe();
 *  }
 *
 *  nodeDropped = (data: any) => {
 *    let result = JSON.parse(data);
 *    let targetNode = this.node.findNode(result.targetId);
 *    let sourceNode = this.node.findNode(result.id);
 *    let sourceNodeParent = sourceNode.getParent();
 *    targetNode.addChild(sourceNode);
 *    sourceNodeParent.deleteChildNode(sourceNode.getId());
 *  };
 *
 *  nodeExpanded = (node: any) => {
 *    console.log('This was the node that was emitted on the expand event: ' + JSON.stringify(node));
 *  }
 */

@Injectable()
export class WraithTreeService {

  private _childAdded = new EventEmitter<any>();
  private _nodeExpanded = new EventEmitter<any>();

  emitNodeDropped(data: any) {
    this._childAdded.emit(JSON.stringify(data));
  };

  emitNodeExpanded(node: any) {
    this._nodeExpanded.emit(JSON.stringify(node));
  };

  getNodeDroppedEmitter() {
    return this._childAdded;
  }

  getNodeExpandedEmitter() {
    return this._nodeExpanded;
  }
}
