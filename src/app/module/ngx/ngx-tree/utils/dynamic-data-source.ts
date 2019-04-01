import {FlatNode} from '../model/flat-node';
import {TreeDataSource} from './tree-data-source';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {merge, Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';

export class DynamicDataSource<T extends FlatNode> extends TreeDataSource<T> {

  public constructor(getChildren: (node: (any | T)) => (Observable<T[]> | T[] | undefined | null)) {
    super(getChildren);
    this.toggleNode(void 0, true);
  }

  public connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    this.treeControl.expansionModel.changed.subscribe((change) => {
      if ((change as SelectionChange<T>).added || (change as SelectionChange<T>).removed) {
        this.handleTreeControl(change as SelectionChange<T>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  private toggleNode(node: T | null | undefined, expand: boolean): void {
    if (node) {
      node.isLoading = true;
    }

    (this.getChildren(node) as Observable<T[]>)
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe((children) => {
        let nextNodeLevel = 0;
        let index = -1;
        if (node) {
          nextNodeLevel = node.level + 1;

          index = this.data.indexOf(node);
          if (!children || index < 0) {
            return;
          }
        }

        if (expand) {
          const nodes = children.map((x) => {
            x.level = nextNodeLevel;
            return x;
          });
          this.data.splice(index + 1, 0, ...nodes);
        } else {
          let count = 0;
          for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) {
          }
          this.data.splice(index + 1, count);
        }

        this.dataChange.next(this.data);
        if (node) {
          node.isLoading = false;
        }
      }, (error) => {
        if (node) {
          node.isLoading = false;
        }
      });
  }

  private handleTreeControl(change: SelectionChange<T>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach((node) => this.toggleNode(node, false));
    }
  }

}
