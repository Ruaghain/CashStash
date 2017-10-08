export class WraithTreeNode {
  private readonly _id: string;
  private readonly _name: string;
  private _children: WraithTreeNode[] = [];
  private _expanded: boolean = false;
  private _parent: WraithTreeNode;

  constructor(id: string, name: string, expanded?: boolean) {
    this._id = id;
    this._name = name;

    if (expanded) {
      this._expanded = expanded;
    }
  }

  public getId = () => {
    return this._id;
  };

  public getName = () => {
    return this._name;
  };

  public addChild = (child: WraithTreeNode): void => {
    child.setParent(this);
    this._children.push(child);
  };

  public getChildren = (): WraithTreeNode[] => {
    return this._children;
  };

  public hasChildren = (): boolean => {
    return this._children.length > 0
  };

  public isExpanded = (): boolean => {
    return this._expanded;
  };

  public setExpanded = (expanded: boolean) => {
    this._expanded = expanded;
  };

  public findNode = (id: String): WraithTreeNode | null => {
    if (this._id === id) {
      return this;
    }

    for (const child of this._children) {
      const result = child.findNode(id);
      if (result) {
        return result;
      }
    }
    return null;
  };

  public deleteChildNode = (id: String) => {
    this._children.forEach((child: WraithTreeNode, index: any) => {
      if (child.getId() === id) {
        this._children.splice(index, 1);
      }
    });
  };

  public getParent = () => {
    return this._parent;
  };

  public setParent = (parentNode : WraithTreeNode) => {
    this._parent = parentNode;
  }

}
