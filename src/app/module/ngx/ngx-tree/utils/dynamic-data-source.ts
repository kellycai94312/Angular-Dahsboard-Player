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
    if (expand) {
      if (node) {
        node.isLoading = true;
      }
      const stopLoading = () => {
        if (node) {
          node.isLoading = false;
        }
      };

      const getChildrenObservable = this.getChildren(node) as Observable<T[]>;
      if (getChildrenObservable) {
        getChildrenObservable.pipe(takeWhile(() => this._notDestroyed))
          .subscribe((children: T[]) => {
            let nextNodeLevel = 0;
            let index = -1;
            if (node) {
              nextNodeLevel = node.level + 1;

              index = this.data.indexOf(node);
              if (!children || !children.length || index < 0) {
                this.treeControl.collapse(node);
                return;
              }
            }

            const nodes = children.map((x) => {
              x.level = nextNodeLevel;
              return x;
            });
            this.data.splice(index + 1, 0, ...nodes);
            this.data = this.data;
          }, (error) => {
            stopLoading();
          }, () => {
            stopLoading();
          });
      }
    } else {
      this.collapse(node);
    }
  }

  public refreshNodesOnLevel(node: T): void {
    if (node) {
      const parentNode = this.getParentNode(node);
      if (parentNode) {
        this.treeControl.collapse(parentNode);
        this.treeControl.expand(parentNode);
      } else {
        this.data = [];
        this.toggleNode(null, true);
      }
    } else {
      this.data = [];
      this.toggleNode(null, true);
    }
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
