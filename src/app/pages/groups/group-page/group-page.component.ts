import {Component, OnInit} from '@angular/core';
import {Group} from '../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {ImageType} from '../../../data/remote/model/image-type';
import {GroupPersonState} from '../../../data/local/group-person-state';
import {SubGroup} from '../../../data/remote/model/group/sub-group';
import {TranslateService} from '@ngx-translate/core';
import {Tab} from '../../../data/local/tab';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  public group: Group;
  public groupPerson: GroupPerson;
  public subGroups: SubGroup[];

  public imageLogoUrl: string;
  public textStateInGroup: string;

  public tabs: Tab[];

  private _groupPersonState: GroupPersonState;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateService: TranslateService,
              private _activatedRoute: ActivatedRoute,
              private _groupService: GroupService) {
    this._groupPersonState = GroupPersonState.NOT_MEMBER;
    this.textStateInGroup = 'join';
    this._groupService.groupSubject.subscribe(group => {
      this.group = group;
    });
    this._groupService.subgroupsSubject.subscribe(async subgroups => {
      this.subGroups = subgroups;
      await  this.initTabs();
    });
  }

  async ngOnInit() {
    const groupId = this._activatedRoute.snapshot.params.id;
    this.group = await this._participantRestApiService.getGroup({id: groupId});
    this._groupService.updateGroup(this.group);

    if (this.group != null) {
      await this.baseInit();
    }
  }

  async baseInit() {
    this.imageLogoUrl = this._participantRestApiService.getImageUrl({
      clazz: 'group',
      id: this.group.id,
      type: ImageType.LOGO
    });

    this.groupPerson = await this._participantRestApiService.getCurrentGroupPerson({id: this.group.id});

    if (this.groupPerson == null) {
      this._groupPersonState = GroupPersonState.NOT_MEMBER;
      this.textStateInGroup = 'join';
    } else {
      if (this.groupPerson.approved) {
        this._groupPersonState = GroupPersonState.MEMBER;
        this.textStateInGroup = 'leave';
      } else {
        this._groupPersonState = GroupPersonState.CONSIDERATION;
        this.textStateInGroup = 'cancelJoin';
      }
    }

    await this._groupService.updateSubgroups();
  }

  private async initTabs() {
    this.tabs = [];
    for (let i = 0; i < this.subGroups.length; i++) {
      const tab = new Tab();
      tab.name = this.subGroups[i].name;
      tab.routerLink = this.getSubGroupRouterLink(this.subGroups[i].id);
      this.tabs.push(tab);
    }
    const defaultTab = new Tab();
    defaultTab.name = await this._translateService.get('members').toPromise();
    defaultTab.routerLink = this.getSubGroupRouterLink(0);
    this.tabs.push(defaultTab);

    if (this.groupPerson.admin && this.groupPerson.approved) {
      const managementTab = new Tab();
      managementTab.name = await this._translateService.get('administration').toPromise();
      managementTab.routerLink = 'administration';
      this.tabs.push(managementTab);
    }
  }

  private getSubGroupRouterLink(subGroupId: number): string {
    return `subgroup/${subGroupId}`;
  }

  public async onGroupPersonState() {
    if (this._groupPersonState === GroupPersonState.NOT_MEMBER) {
      await this._participantRestApiService.joinGroup({id: this.group.id});
    } else {
      await this._participantRestApiService.leaveGroup({id: this.group.id});
    }
    await this.baseInit();
  }

}
