import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../../../pages/group/group-page/service/group.service';
import {TranslateService} from '@ngx-translate/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupConnection} from '../../../../data/remote/model/group/group-connection';
import {GroupConnectionType} from '../../../../data/remote/model/group/group-connection-type';
import {Group} from '../../../../data/remote/model/group/base/group';
import * as shape from 'd3-shape';
import {SubgroupTemplate} from '../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateGroup} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-group';

@Component({
  selector: 'app-subgroup-template-graph',
  templateUrl: './subgroup-template-graph.component.html',
  styleUrls: ['./subgroup-template-graph.component.scss']
})
export class SubgroupTemplateGraphComponent implements OnInit {

  get subgroupTemplate(): SubgroupTemplate {
    return this._subgroupTemplate;
  }

  @Input()
  set subgroupTemplate(value: SubgroupTemplate) {
    this._subgroupTemplate = value;
  }

  public readonly orientation: string = 'BT';
  public readonly colorScheme: any = {domain: ['#ccc']};
  public readonly curve: any = shape.curveBundle.beta(1);
  public readonly updateSubject: Subject<any> = new Subject();
  public nodes: Node[] = [];
  public links: Link[] = [];

  private _subgroupTemplate: SubgroupTemplate;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _translateService: TranslateService) {
  }

  async ngOnInit() {
    await this.initialize(this.subgroupTemplate);
  }

  public async initialize(subgroupTemplate: SubgroupTemplate) {
    await this.initializeGroupConnections(PropertyConstant.pageSizeMax);
  }

  private async initializeGroupConnections(depth: number): Promise<void> {
    this.nodes = [];
    this.links = [];
    const subgroupTemplateGroups = await this._participantRestApiService.getSubgroupTemplateGroups({subgroupTemplateId: this.subgroupTemplate.id});

    const groupConnections = await this._participantRestApiService.getGraphGroupConnections({}, {depth: depth}, {groupId: this.subgroupTemplate.group.id});
    for (const groupConnection of groupConnections) {
      const filteredSubgroupTemplateGroups = subgroupTemplateGroups.filter(x => x.group.id == groupConnection.source.id || x.group.id == groupConnection.target.id);
      const sourceGroupDataNode: GroupDataNode = {group: groupConnection.source};
      const targetGroupDataNode: GroupDataNode = {group: groupConnection.target};
      if (filteredSubgroupTemplateGroups.length) {
        sourceGroupDataNode.subgroupTemplateGroup = filteredSubgroupTemplateGroups.find(x => x.id == groupConnection.source.id);
        targetGroupDataNode.subgroupTemplateGroup = filteredSubgroupTemplateGroups.find(x => x.id == groupConnection.target.id);
      }
      const sourceNode = this.pushToNodes(sourceGroupDataNode);
      const targetNode = this.pushToNodes(targetGroupDataNode);
      const label = await this.getGroupConnectionLabel(groupConnection);
      const color = this.getGroupConnectionColor(groupConnection);
      const link = new Link(sourceNode, targetNode, label, color);

      this.links.push(link);
    }
    this.updateSubject.next(true);
  }

  private async getGroupConnectionLabel(groupConnection: GroupConnection) {
    switch (groupConnection.type) {
      case GroupConnectionType.TOP:
        return await this._translateService.get('topLevelShort').toPromise();
      case GroupConnectionType.SAME:
        return await this._translateService.get('sameLevelShort').toPromise();
      case GroupConnectionType.BOTTOM:
        return await this._translateService.get('bottomLevelShort').toPromise();
    }
  }

  private getGroupConnectionColor(groupConnection: GroupConnection) {
    switch (groupConnection.type) {
      case GroupConnectionType.TOP:
        return '#3D9970';
      case GroupConnectionType.SAME:
        return '#111111';
      case GroupConnectionType.BOTTOM:
        return '#0074D9';
    }
  }

  private pushToNodes(data: GroupDataNode): Node {
    const groupId = data.group.id.toString();
    for (const item of this.nodes) {
      if (item.id == groupId) {
        return item;
      }
    }
    const node = new Node(groupId, data, data.group.name);
    this.nodes.push(node);
    return node;
  }

}

class GroupDataNode {
  public group: Group;
  public subgroupTemplateGroup?: SubgroupTemplateGroup;
}

interface IIdObject {
  id: string;
}

class DataObject {
  public data: any;
}

class Node extends DataObject implements IIdObject {

  public id: string;

  constructor(id: string,
              data: any,
              public label = void 0) {
    super();
    this.id = id;
    this.data = data;
  }

}

class Link extends DataObject {

  get source() {
    return this.sourceNode.id;
  }

  get target() {
    return this.targetNode.id;
  }

  constructor(public sourceNode: Node,
              public targetNode: Node,
              public label: string,
              public color: string
  ) {
    super();
  }

}
