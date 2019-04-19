import {DataObject} from './data-object';
import {Node} from './node';

export class Link extends DataObject {

  private source: string;
  private target: string;

  constructor(public sourceNode: Node,
              public targetNode: Node,
              public label?: string,
              data?: any) {
    super(data);

    this.updateIds(sourceNode, targetNode);
  }

  public updateIds(sourceNode: Node, targetNode: Node): void {
    this.source = sourceNode.id;
    this.target = targetNode.id;
  }

}
