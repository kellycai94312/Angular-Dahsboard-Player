import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { ImageType } from '../../../../data/remote/model/image-type';
import { GroupPerson } from '../../../../data/remote/model/group/group-person';
import { PersonService } from '../person.service';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { UserRole } from '../../../../data/remote/model/user-role';

// TODO: Remove this component. See app-group-person-new!
@Component({
  selector: 'app-group-person',
  templateUrl: './group-person.component.html',
  styleUrls: ['./group-person.component.scss']
})
export class GroupPersonComponent implements OnChanges {
  @Input()
  public data: GroupPerson;

  @Input()
  public role: UserRole;

  @Input()
  public baseGroup: boolean;

  @Output()
  public change: EventEmitter<GroupPerson>;

  public imageUrl: string;

  public groupUrl: string;

  public isEditAllow: boolean;

  public pageSize = PropertyConstant.pageSize;

  constructor(private  _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    this.change = new EventEmitter<GroupPerson>();
  }

  ngOnChanges(model: any) {
    if (this.data) {
      this.imageUrl = this._participantRestApiService.getImageUrl({
        clazz: 'group',
        id: this.data.group.id,
        type: ImageType.LOGO
      });
      this.groupUrl = `/group/${this.data.group.id}`;
    }
  }

  loadData = async (from: number, searchText: string) => {
    const container = await this._participantRestApiService.getPersonGroups({
      id: this._personService.shared.person.id,
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
      await this._participantRestApiService.saveBaseGroup({
        id: e.current == null ? null : e.current.group.id,
        userRoleId: this.role.id
      });
      this.change.emit(this.data);
    } else {
      if (e.prev) {
        await this._participantRestApiService.removePublicRole({
          id: e.prev.group.id,
          userRoleId: this.role.id
        });
      }
      if (e.current) {
        await this._participantRestApiService.addPublicRole({
          id: e.current.group.id,
          userRoleId: this.role.id
        });
      }
      if (!e.current) {
        this.change.emit(e.prev);
      }
    }
  }

  async onRemove() {
    if (this.baseGroup) {
      await this._participantRestApiService.saveBaseGroup({
        id: null,
        userRoleId: this.role.id
      });
      this.data = null;
    } else {
      if (this.data) {
        await this._participantRestApiService.removePublicRole({
          id: this.data.group.id,
          userRoleId: this.role.id
        });
      }
    }
    this.change.emit(this.data);
  }

}
