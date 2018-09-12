import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../group.service';
import {GroupConnection} from '../../../data/remote/model/group/group-connection';
import {Group} from '../../../data/remote/model/group/base/group';
import {GroupConnectionType} from '../../../data/remote/model/group/group-connection-type';
import {TranslateService} from '@ngx-translate/core';
import {NestingEnum} from './nesting-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {Nesting} from './nesting';
import {PropertyConstant} from '../../../data/local/property-constant';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-group-connections-graph',
  templateUrl: './group-connections-graph.component.html',
  styleUrls: ['./group-connections-graph.component.scss']
})
export class GroupConnectionsGraphComponent implements OnInit {

  public nesting: Nesting;
  public nestingValues: Nesting[];

  public nodes: Node[];
  public links: Link[];
  public orientation: string;
  public colorScheme: any;
  public curve: any;
  public updateSubject: Subject<any>;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _translateService: TranslateService,
              private _translateObjectService: TranslateObjectService) {
    this.nodes = [];
    this.links = [];
    this.orientation = 'BT';
    this.colorScheme = {
      domain: ['#ccc']
    };
    this.curve = shape.curveBundle.beta(1);
    this.updateSubject = new Subject();
  }

  async ngOnInit() {
    this.nestingValues = [];
    const nestingTypes = Object.keys(NestingEnum).filter(x => !isNaN(Number(NestingEnum[x]))).map(x => NestingEnum[x]);
    for (let i = 0; i < nestingTypes.length; i++) {
      const nesting = new Nesting();
      nesting.nestingEnum = nestingTypes[i];
      nesting.name = await this._translateObjectService.getTranslateName('nestingEnum', NestingEnum[nestingTypes[i]].toString());
      this.nestingValues.push(nesting);
    }
    this.nesting = this.nestingValues[0];
  }

  public async onNestingChanged(nesting: Nesting) {
    switch (nesting.nestingEnum) {
      case NestingEnum.LEVEL1:
        await this.initializeGroupConnections(1);
        break;
      case NestingEnum.LEVEL2:
        await this.initializeGroupConnections(2);
        break;
      case NestingEnum.LEVEL3:
        await this.initializeGroupConnections(3);
        break;
      case NestingEnum.ENDLESS:
        await this.initializeGroupConnections(PropertyConstant.pageSizeMax);
    }
  }

  private async initializeGroupConnections(depth: number) {
    this.nodes = [];
    this.links = [];
    const groupId = this._groupService.getGroup().id;
    const groupConnections = await this._participantRestApiService.getGraphGroupConnections({}, {depth: depth}, {groupId: groupId});
    for (const groupConnection of groupConnections) {
      this.pushToNodes(groupConnection.source);
      this.pushToNodes(groupConnection.target);
      const label = await this.getGroupConnectionLabel(groupConnection);
      const color = this.getGroupConnectionColor(groupConnection);
      const link = new Link(groupConnection, label, color);
      this.links.push(link);
    }
    this.updateSubject.next(true);
  }

  private async getGroupConnectionLabel(groupConnection: GroupConnection) {
    switch (GroupConnectionType[groupConnection.type]) {
      case GroupConnectionType.TOP:
        return await this._translateService.get('topLevelShort').toPromise();
      case GroupConnectionType.SAME:
        return await this._translateService.get('sameLevelShort').toPromise();
      case GroupConnectionType.BOTTOM:
        return await this._translateService.get('bottomLevelShort').toPromise();
    }
  }

  private getGroupConnectionColor(groupConnection: GroupConnection) {
    switch (GroupConnectionType[groupConnection.type]) {
      case GroupConnectionType.TOP:
        return '#3D9970';
      case GroupConnectionType.SAME:
        return '#111111';
      case GroupConnectionType.BOTTOM:
        return '#0074D9';
    }
  }

  private pushToNodes(group: Group): void {
    let contains = false;
    for (const node of this.nodes) {
      if (node.id === group.id.toString()) {
        contains = true;
        break;
      }
    }
    if (!contains) {
      this.nodes.push(new Node(group));
    }
  }

}

class Node {
  id: string;
  label: string;

  constructor(group: Group) {
    this.id = group.id.toString();
    this.label = group.name;
  }

}

class Link {

  source: string;
  target: string;
  label: string;
  color: string;

  constructor(groupConnection: GroupConnection, label: string, color: string) {
    this.source = groupConnection.source.id.toString();
    this.target = groupConnection.target.id.toString();
    this.label = label;
    this.color = color;
  }

}
