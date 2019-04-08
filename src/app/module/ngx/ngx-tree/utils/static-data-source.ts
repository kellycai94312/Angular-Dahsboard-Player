import {FlatNode} from '../model/flat-node';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {Observable} from 'rxjs';
import {TreeDataSource} from './tree-data-source';
import {CollectionViewer} from '@angular/cdk/collections';
import {takeWhile} from 'rxjs/operators';

export class StaticDataSource<T, F extends FlatNode> extends TreeDataSource<F> {

  private readonly _matTreeFlatDataSource: MatTreeFlatDataSource<T, F>;
  private readonly _matTreeFlattener: MatTreeFlattener<T, F>;

  constructor(transformer: (node: T, level: number) => F,
              getChildren: (node: T | any) => Observable<F[]> | F[] | undefined | null) {
    super(getChildren);

    this._matTreeFlattener = new MatTreeFlattener(transformer, this.getLevel, this.isExpandable, getChildren);
    this._matTreeFlatDataSource = new MatTreeFlatDataSource<T, F>(this.treeControl, this._matTreeFlattener);

    this.dataChange.pipe(takeWhile(() => this._notDestroyed))
      .subscribe((value) => {
        this._matTreeFlatDataSource.data = value as any;
      });
  }

  public connect(collectionViewer: CollectionViewer): Observable<F[] | ReadonlyArray<F>> {
    return this._matTreeFlatDataSource.connect(collectionViewer);
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    super.disconnect(collectionViewer);
    this._matTreeFlatDataSource.disconnect();
  }

}
