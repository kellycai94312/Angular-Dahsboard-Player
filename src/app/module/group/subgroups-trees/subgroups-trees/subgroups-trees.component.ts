import {Component, Input} from '@angular/core';
import {DynamicFlatNode} from '../model/dynamic-flat-node';
import {DynamicDataSource} from '../utils/dynamic-data-source';
import {FlatTreeControl} from '@angular/cdk/tree';
import {TreeDataSource} from '../model/base/tree-data-source';
import {MatMenuTrigger} from '@angular/material';
import {ContextMenuItem} from '../model/context-menu-item';

@Component({
  selector: 'app-subgroups-trees',
  templateUrl: './subgroups-trees.component.html',
  styleUrls: ['./subgroups-trees.component.scss']
})
export class SubgroupsTreesComponent {

  get treeDataSource(): TreeDataSource {
    return this._treeDataSource;
  }

  @Input()
  set treeDataSource(val: TreeDataSource) {
    this._treeDataSource = val;
    if (val) {
      setTimeout(async () => {
        await this.initialize(val);
      });
    }
  }

  @Input()
  public getNodeContextMenuItem: (node: DynamicFlatNode) => Promise<ContextMenuItem[]>;

  public treeControl: FlatTreeControl<DynamicFlatNode>;
  public dataSource: DynamicDataSource;
  public contextMenuItems: ContextMenuItem[];

  private _treeDataSource: TreeDataSource;

  constructor() {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
  }

  private async initialize(treeDataSource: TreeDataSource): Promise<void> {
    this.dataSource = new DynamicDataSource(this.treeControl, this._treeDataSource);
    this.dataSource.data = await treeDataSource.initialize();
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  public async onShowContextMenu(node: DynamicFlatNode, matMenuTrigger: MatMenuTrigger): Promise<void> {
    this.contextMenuItems = await this.getNodeContextMenuItem(node);
    if (this.contextMenuItems && this.contextMenuItems.length) {
      matMenuTrigger.openMenu();
    }
  }

}
