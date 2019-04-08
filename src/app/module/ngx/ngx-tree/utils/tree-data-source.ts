import {BehaviorSubject, Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/table';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CollectionViewer, SelectionModel} from '@angular/cdk/collections';
import {FlatNode} from '../model/flat-node';

export abstract class TreeDataSource<T extends FlatNode> extends DataSource<T> {

  get data(): T[] {
    return this.dataChange.value;
  }

  set data(value: T[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  public readonly dataChange = new BehaviorSubject<T[]>([]);
  public readonly treeControl: FlatTreeControl<T>;
  public readonly getChildren: (node: T | any) => Observable<T[]> | T[] | undefined | null;
  public readonly selectionModel = new SelectionModel<T>(true);

  protected _notDestroyed = true;

  protected constructor(getChildren: (node: T | any) => Observable<T[]> | T[] | undefined | null) {
    super();
    this.treeControl = new FlatTreeControl<T>(this.getLevel, this.isExpandable);
    this.getChildren = getChildren;
  }

  public connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return void 0;
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this._notDestroyed = false;
  }

  public getLevel = (node: T): number => {
    return node.level;
  };

  public isExpandable = (node: T): boolean => {
    return node.expandable;
  };

  public getParentNode(node: T): T | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.data.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.data[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  public addOrUpdateNodeIfCan<TNodeData, TParentData>(data: TNodeData,
                                                      compare: (source: TNodeData, target: TNodeData) => boolean,
                                                      parentData?: TParentData,
                                                      parentCompare?: (source: TParentData, target: TParentData) => boolean): T {
    const node: T = this.data.find(x => compare(x.data, data));
    if (node) {
      Object.assign(node.data, data);
    } else {
      let parentNode: T;
      const newNode = new FlatNode(data, 0, true);
      if (parentData) {
        parentNode = this.data.find(x => parentCompare(x.data, parentData));
        if (parentNode) {
          newNode.level = parentNode.level + 1;
          const descendants = this.treeControl.getDescendants(parentNode);
          if (descendants.length) {
            const lastDescendantNodeInLevel = descendants[descendants.length - 1];
            const indexLastDescendantNodeInLevel = this.data.indexOf(lastDescendantNodeInLevel);
            this.data.splice(indexLastDescendantNodeInLevel + 1, 0, newNode as T);
          } else {
            const indexParentNode = this.data.indexOf(parentNode);
            this.data.splice(indexParentNode + 1, 0, newNode as T);
          }
        } else {
          this.data.push(newNode as T);
        }
      } else {
        this.data.push(newNode as T);
      }
    }
    this.data = this.data;
    return node;
  }

  public getNodeByData<TNodeData>(data: TNodeData, compare: (source: TNodeData, target: TNodeData) => boolean): T | undefined {
    return this.data.find(x => compare(x.data, data));
  }

  public removeNodeByData<TNodeData>(data: TNodeData, compare: (source: TNodeData, target: TNodeData) => boolean): void {
    const node = this.getNodeByData(data, compare);
    if (node) {
      this.removeNode(node);
    }
  }

  public removeNode(node: T): void {
    this.collapse(node);
    const nodeIndex = this.data.indexOf(node);
    if (nodeIndex > -1) {
      this.data.splice(nodeIndex, 1);
      this.data = this.data;
    }
  }

  public collapse(node: T): boolean {
    const index = this.data.indexOf(node);
    if (index < 0) {
      return;
    }

    let count = 0;
    for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) {
    }
    this.data.splice(index + 1, count);
    this.data = this.data;
  }

  //#region Selection

  public descendantsAllSelected(node: T): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every((child) =>
      this.selectionModel.isSelected(child)
    );
  }

  public descendantsPartiallySelected(node: T): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) => this.selectionModel.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  public itemSelectionToggle(node: T): void {
    this.selectionModel.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.selectionModel.isSelected(node) ? this.selectionModel.select(...descendants) : this.selectionModel.deselect(...descendants);

    descendants.every((child) =>
      this.selectionModel.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  public leafItemSelectionToggle(node: T): void {
    this.selectionModel.toggle(node);
    this.checkAllParentsSelection(node);
  }

  public checkAllParentsSelection(node: T): void {
    let parent: T | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  public checkRootNodeSelection(node: T): void {
    const nodeSelected = this.selectionModel.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.selectionModel.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.selectionModel.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.selectionModel.select(node);
    }
  }

  public isLeafItem(node: T): boolean {
    return !this.treeControl.getDescendants(node).length;
  }

  public getBreadcrumbsFromSelectedNodes(): T[][] {
    const breadcrumbs: T[][] = [];
    for (const item of this.selectionModel.selected) {
      if (!this.isLeafItem(item)) {
        continue;
      }

      const currentBreadcrumbs: T[] = [item];
      let parent: T;
      do {
        parent = this.getParentNode(parent || item);
        if (parent) {
          currentBreadcrumbs.unshift(parent);
        }
      } while (parent);
      breadcrumbs.push(currentBreadcrumbs);
    }
    return breadcrumbs;
  }

  //#endregion

}
