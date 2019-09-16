import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {FlatNode} from '../model/flat-node';
import {NodeConfiguration} from '../model/node-configuration';
import {TreeDataSource} from '../utils/tree-data-source';

@Component({
  selector: 'ngx-tree',
  templateUrl: './ngx-tree.component.html',
  styleUrls: ['./ngx-tree.component.scss']
})
export class NgxTreeComponent<T extends FlatNode> {

  get selectedNode(): T {
    return this._selectedNode;
  }

  @Input()
  set selectedNode(value: T) {
    this._selectedNode = value;
    this.selectedNodeChange.emit(value);
  }

  @Input()
  public nodeConfigurations: Array<NodeConfiguration<any>> = [];

  @Input()
  public dataSource: TreeDataSource<T>;

  @ContentChild('nodeTemplate', { static: false })
  public nodeTemplate: TemplateRef<any>;

  @Input()
  public selectable: boolean;

  @Input()
  public minDuration: number;

  @Output()
  public readonly selectedNodeChange = new EventEmitter<T>();

  private _selectedNode: T;

  public onClickNode(node: T): void {
    this.selectedNode = node;
  }

}
