import {Component, Input} from '@angular/core';
import {GroupCluster} from '../../../../data/remote/model/group/connection/group-cluster';
import {Node} from '../../../ngx/ngx-graph/model/node';
import {Link} from '../../../ngx/ngx-graph/model/link';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-group-connections-graph',
  templateUrl: './group-connections-graph.component.html',
  styleUrls: ['./group-connections-graph.component.scss']
})
export class GroupConnectionsGraphComponent {

  get groupCluster(): GroupCluster {
    return this._groupCluster;
  }

  @Input()
  set groupCluster(value: GroupCluster) {
    this._groupCluster = value;
    setTimeout(async () => {
      await this.initializeGraph(value);
    });
  }

  public nodes: Node[] = [];
  public links: Link[] = [];
  private _groupCluster: GroupCluster;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
  }

  private async initializeGraph(groupCluster: GroupCluster) {
    const groupConnections = await this._participantRestApiService.getGroupConnections({groupId: groupCluster.group.id, clusterId: groupCluster.id});
    for (const groupConnection of groupConnections) {
      const sourceGroupDataNode: Node = new Node(groupConnection.group.id.toString(), groupConnection, groupConnection.group.name);
      const targetGroupDataNode: Node = new Node(groupConnection.parentGroup.id.toString(), groupConnection, groupConnection.parentGroup.name);

      const sourceNode = this.pushToNodes(sourceGroupDataNode);
      const targetNode = this.pushToNodes(targetGroupDataNode);

      const link = new Link(sourceNode, targetNode);

      this.links.push(link);
    }
  }

  private pushToNodes(node: Node): Node {
    for (const item of this.nodes) {
      if (item.id == node.id) {
        return item;
      }
    }
    this.nodes.push(node);
    return node;
  }

}
