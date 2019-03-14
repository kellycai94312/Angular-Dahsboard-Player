import {DynamicFlatNode} from '../dynamic-flat-node';

export abstract class TreeDataSource {

  public abstract async initialize(): Promise<DynamicFlatNode[]>;

  public abstract async getChildren(node: DynamicFlatNode): Promise<DynamicFlatNode[]>;

}
