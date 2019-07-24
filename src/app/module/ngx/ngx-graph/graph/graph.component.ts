import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Node} from '../model/node';
import {Link} from '../model/link';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {

  @Input()
  public links: Link[] = [];

  @Input()
  public nodes: Node[] = [];

  @Output()
  public readonly doubleClickLink = new EventEmitter<Link>();

  public readonly curve: any = shape.curveBundle.beta(1);
  public readonly layoutSettings = {
    orientation: 'TB'
  };

  public onDoubleClickLink(link: Link): void {
    this.doubleClickLink.emit(link);
  }

}
