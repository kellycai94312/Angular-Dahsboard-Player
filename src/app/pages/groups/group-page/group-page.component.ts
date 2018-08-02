import {Component, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {GroupPersonState} from '../../../data/local/group-person-state';
import {SubGroup} from '../../../data/remote/model/group/sub-group';
import {Tab} from '../../../data/local/tab';
import {GroupService} from '../group.service';
import {ImageComponent} from '../../../components/image/image.component';
import {Image} from '../../../data/remote/model/file/image/image';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxModalComponent} from '../../../components/ngx-modal/ngx-modal/ngx-modal.component';
import {AppHelper} from '../../../utils/app-helper';
import {HtmlContentComponent} from '../../../components/html-content/html-content/html-content.component';
import {TranslateService} from '@ngx-translate/core';

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
              private _modalService: NgbModal,
              private _appHelper: AppHelper,
              private _translateService: TranslateService,
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
    // TODO: Upload in image component
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = FileClass.GROUP;
      image.objectId = this.group.id;
      image.type = ImageType.LOGO;
      await this._participantRestApiService.uploadFile(image, [file]);

      this.logo.refresh();
    }
  }

  public onGroupPersonState = async () => {
    if (this.groupService.getGroupPersonState() === GroupPersonState.MEMBER) {
      const modal = this._modalService.open(NgxModalComponent, {size: 'lg'});
      const componentInstance = modal.componentInstance as NgxModalComponent;
      componentInstance.titleKey = 'confirmation';
      await componentInstance.initializeBody(HtmlContentComponent, async component => {
        component.html = await this._translateService.get('areYouSureYouWantToLeaveTheGroup').toPromise();

        componentInstance.splitButtonItems = [
          {
            nameKey: 'approve',
            default: true,
            callback: async () => {
              if (await this.changePersonStateInGroup()) {
                await this.baseInit();
                modal.dismiss();
              }
            }
          },
          {
            nameKey: 'cancel',
            callback: async () => {
              modal.dismiss();
            }
          }
        ];
      });
    } else {
      if (await this.changePersonStateInGroup()) {
        await this.baseInit();
      }
    }
  };

  private async changePersonStateInGroup(): Promise<boolean> {
    try {
      if (this.groupService.getGroupPersonState() === GroupPersonState.NOT_MEMBER) {
        await this._participantRestApiService.joinGroup({id: this.group.id});
      } else {
        await this._participantRestApiService.leaveGroup({id: this.group.id});
      }
      return true;
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
    }
    return false;
  }

}
