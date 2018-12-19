import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {PersonService} from '../../../person/person-page/service/person.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {UserRole} from '../../../../data/remote/model/user-role';
import {GroupPersonLog} from '../../../../data/remote/model/group/group-person-log';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {ActivatedRoute, Router} from '@angular/router';

// TODO: Remove this component. See app-group-person-new!
// @Component({
//   selector: 'app-group-person',
//   templateUrl: './group-person.component.html',
//   styleUrls: ['./group-person.component.scss']
// })
export class GroupPersonComponent implements OnInit {

  @Input()
  public data: GroupPerson;

  @Input()
  public role: UserRole;

  @Input()
  public baseGroup: boolean;

  @Output()
  public change: EventEmitter<GroupPerson>;

  public groupPersonLog: GroupPersonLog;
  public allowEdit: boolean;

  public readonly pageSize: number;
  public readonly dateFormat: string;
  public splitButtonItems: SplitButtonItem[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this.change = new EventEmitter<GroupPerson>();

    this.pageSize = PropertyConstant.pageSize;
    this.dateFormat = PropertyConstant.dateFormat;
  }

  async ngOnInit() {
    this.allowEdit = await this._personService.allowEdit();
    this.splitButtonItems = [];
    if (this.allowEdit) {
      this.splitButtonItems.push({
        nameKey: 'remove',
        default: true,
        callback: async () => {
          if (this.baseGroup) {
            await this._participantRestApiService.updatePersonBaseGroup({id: null}, {}, {personId: this._personService.personViewModel.data.id, userRoleId: this.role.id});
            this.data = null;
          } else {
            if (this.data) {
              await this._participantRestApiService.removePublicRole(this.data.group, {userRoleId: this.role.id}, {personId: this._personService.personViewModel.data.id});
            }
          }
          this.change.emit(this.data);
          await this.refreshGroupPersonLog();
        }
      });
    }
    this.splitButtonItems.push({
      nameKey: 'showHistory',
      callback: async () => {
        await this._router.navigate([this.data.group.id, 'history'], {relativeTo: this._activatedRoute});
      }
    });
    await this.refreshGroupPersonLog();
  }

  loadData = async (from: number, searchText: string) => {
    const container = await this._participantRestApiService.getPersonGroups({
      id: this._personService.personViewModel.data.id,
      from: from,
      count: this.pageSize,
      name: searchText,
      select: true,
      userRoleId: this.role.id,
    });
    if (this.data) {
      container.list.push(this.data);
    }
    return container;
  };

  getKey(item: GroupPerson) {
    return item.id;
  }

  getName(item: GroupPerson) {
    return item.group.name;
  }

  async onGroupChange(e) {
    if (this.baseGroup) {
      await this._participantRestApiService.updatePersonBaseGroup({id: e.current == null ? null : e.current.group.id}, {},
        {personId: this._personService.personViewModel.data.id, userRoleId: this.role.id});
      this.change.emit(this.data);
    } else {
      if (e.prev) {
        await this._participantRestApiService.removePublicRole(e.prev.group, {userRoleId: this.role.id}, {personId: this._personService.personViewModel.data.id});
      }
      if (e.current) {
        await this._participantRestApiService.createPublicRole(e.current.group, {userRoleId: this.role.id}, {personId: this._personService.personViewModel.data.id});
      }
      if (!e.current) {
        this.change.emit(e.prev);
      }
    }
    await this.refreshGroupPersonLog();
  }

  private async refreshGroupPersonLog(): Promise<void> {
    if (this.data) {
      try {
        this.groupPersonLog = await this._participantRestApiService.getLatestGroupPersonLog({personId: this.data.person.id, groupId: this.data.group.id});
      } catch (e) {
        this.groupPersonLog = null;
      }
    } else {
      this.groupPersonLog = null;
    }
  }

}
