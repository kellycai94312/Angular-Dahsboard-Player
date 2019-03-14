import {BehaviorSubject, merge, Observable} from 'rxjs';
import {DynamicFlatNode} from '../model/dynamic-flat-node';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import {TreeDataSource} from '../model/base/tree-data-source';

export class DynamicDataSource {

  public dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }

  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private _treeDataSource: TreeDataSource) {
  }

  public connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      const selectionChange = (change as SelectionChange<DynamicFlatNode>);
      if (selectionChange.added || selectionChange.removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  public handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  public async updateNode(node: DynamicFlatNode): Promise<void> {
    await this.toggleNode(node, false);
    this.data.splice(this.data.indexOf(node), 1, JSON.parse(JSON.stringify(node)));
    this.dataChange.next(this.data);
  }

  public async toggleNode(node: DynamicFlatNode, expand: boolean): Promise<void> {
    node.isLoading = true;
    try {
      const index = this.data.indexOf(node);
      if (index < 0) {
        return;
      }

      if (expand) {
        const children = await this._treeDataSource.getChildren(node);
        if (!children) {
          return;
        }
        this.data.splice(index + 1, 0, ...children);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) {
        }
        this.data.splice(index + 1, count);
      }

      node.expanded = expand;
      this.dataChange.next(this.data);
    } finally {
      node.isLoading = false;
    }
  }

}
