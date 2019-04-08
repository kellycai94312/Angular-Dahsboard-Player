import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {ContextMenuItem} from '../model/context-menu-item';
import {NodeConfiguration} from '../../../ngx/ngx-tree/model/node-configuration';
import {FlatNode} from '../../../ngx/ngx-tree/model/flat-node';
import {DynamicDataSource} from '../../../ngx/ngx-tree/utils/dynamic-data-source';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-subgroups-trees',
  templateUrl: './subgroups-trees.component.html',
  styleUrls: ['./subgroups-trees.component.scss']
})
export class SubgroupsTreesComponent {

  get getChildren(): (node: (FlatNode | any)) => (Observable<FlatNode[]> | FlatNode[] | undefined | null) {
    return this._getChildren;
  }

  @Input()
  set getChildren(value: (node: (FlatNode | any)) => (Observable<FlatNode[]> | FlatNode[] | undefined | null)) {
    this._getChildren = value;
    this.initialize();
  }

  @Input()
  public getNodeContextMenuItem: (node: FlatNode) => Promise<ContextMenuItem[]>;

  @Input()
  public getNodeName: (node: FlatNode) => string;

  @Output()
  public readonly selectedNodeChange = new EventEmitter<FlatNode>();

  public readonly nodeConfigurations: NodeConfiguration<FlatNode>[];
  public dataSource: DynamicDataSource<FlatNode>;
  public contextMenuItems: ContextMenuItem[];
  private _getChildren: (node: FlatNode | any) => Observable<FlatNode[]> | FlatNode[] | undefined | null;

  constructor() {
    this.nodeConfigurations = [
      new NodeConfiguration('leaf'),
      new NodeConfiguration('nested', (index, nodeData: FlatNode) => {
        return nodeData.expandable;
      })
    ];
  }

  private initialize(): void {
    this.dataSource = new DynamicDataSource(this._getChildren);
  }

  public async onShowContextMenu(node: FlatNode, matMenuTrigger: MatMenuTrigger): Promise<void> {
    this.contextMenuItems = await this.getNodeContextMenuItem(node);
    if (this.contextMenuItems && this.contextMenuItems.length) {
      matMenuTrigger.openMenu();
    }
  }

  public onSelectedNodeChanged(node: FlatNode) {
    this.selectedNodeChange.emit(node);
  }

}
