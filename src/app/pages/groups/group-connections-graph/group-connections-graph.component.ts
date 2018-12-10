import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../group/group-page/service/group.service';
import {GroupConnection} from '../../../data/remote/model/group/group-connection';
import {Group} from '../../../data/remote/model/group/base/group';
import {GroupConnectionType} from '../../../data/remote/model/group/group-connection-type';
import {TranslateService} from '@ngx-translate/core';
import {NestingEnum} from '../../../data/local/nesting-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {PropertyConstant} from '../../../data/local/property-constant';
import {Subject} from 'rxjs';
import {NameWrapper} from '../../../data/local/name-wrapper';

@Component({
  selector: 'app-group-connections-graph',
  templateUrl: './group-connections-graph.component.html',
  styleUrls: ['./group-connections-graph.component.scss']
})
export class GroupConnectionsGraphComponent implements OnInit {

  public nesting: NameWrapper<NestingEnum>;
  public nestingValues: NameWrapper<NestingEnum>[];

  public nodes: Node[];
  public links: Link[];
  public readonly orientation: string;
  public readonly colorScheme: any;
  public readonly curve: any;
  public readonly updateSubject: Subject<any>;

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
    this.nestingValues = await this._translateObjectService.getTranslatedEnumCollection<NestingEnum>(NestingEnum, 'NestingEnum');
    this.nesting = this.nestingValues[0];
  }

  public async onNestingChanged(nameWrapper: NameWrapper<NestingEnum>) {
    switch (nameWrapper.data) {
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
    const groupId = this._groupService.groupSubject.getValue().id;
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
