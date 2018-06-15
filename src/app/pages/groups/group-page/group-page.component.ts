import {Component, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {GroupPersonState} from '../../../data/local/group-person-state';
import {SubGroup} from '../../../data/remote/model/group/sub-group';
import {Tab} from '../../../data/local/tab';
import {GroupService} from '../group.service';
import {Image} from '../../../data/remote/model/image';
import {ImageClass} from '../../../data/remote/misc/image-class';
import {ImageType} from '../../../data/remote/model/image-type';
import {ImageComponent} from '../../../components/image/image.component';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  public group: Group;
  public groupPerson: GroupPerson;
  public subGroups: SubGroup[];

  public textStateInGroup: string;

  @ViewChild('logo')
  public logo: ImageComponent;

  public tabs: Tab[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              public groupService: GroupService) {
    this.groupService.groupSubject.subscribe(group => {
      this.group = group;
    });
    this.groupService.subgroupsSubject.subscribe(async subgroups => {
      this.subGroups = subgroups;
      await  this.initTabs();
    });
  }

  async ngOnInit() {
    const groupId = this._activatedRoute.snapshot.params.id;
    this.group = await this._participantRestApiService.getGroup({id: groupId});
    this.groupService.updateGroup(this.group);

    if (this.group != null) {
      await this.baseInit();
    }
  }

  async baseInit() {

    this.groupPerson = await this.groupService.getCurrentGroupPerson();
    this.textStateInGroup = this.groupService.getKeyNamePersonStateInGroup(this.groupService.getGroupPersonState());

    await this.groupService.updateSubgroups();
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
    defaultTab.nameKey = 'members';
    defaultTab.routerLink = this.getSubGroupRouterLink(0);
    this.tabs.push(defaultTab);

    if (this.groupService.isEditAllow()) {
      const managementTab = new Tab();
      managementTab.nameKey = 'administration';
      managementTab.routerLink = 'administration';
      this.tabs.push(managementTab);
    }

    if (this.groupService.hasEvents()) {
      const eventsTab = new Tab();
      eventsTab.nameKey = 'events';
      eventsTab.routerLink = 'events';
      this.tabs.push(eventsTab);
    }
  }

  private getSubGroupRouterLink(subGroupId: number): string {
    return `subgroup/${subGroupId}`;
  }

  public async onLogoChange(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = ImageClass.GROUP;
      image.objectId = this.group.id;
      image.type = ImageType.LOGO;
      await this._participantRestApiService.uploadImage(file, image);

      this.logo.refresh();
    }
  }

  public async onGroupPersonState() {
    try {
      if (this.groupService.getGroupPersonState() === GroupPersonState.NOT_MEMBER) {
        await this._participantRestApiService.joinGroup({id: this.group.id});
      } else {
        await this._participantRestApiService.leaveGroup({id: this.group.id});
      }
    } catch (e) {
    }
    await this.baseInit();
  }

}
