import {Component, Input, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PersonTransitionType} from '../../../data/remote/model/group/transition/person-transition-type';
import {NgxGridComponent} from '../../ngx-grid/ngx-grid/ngx-grid.component';
import {AttachFileComponent} from '../../attach-file/attach-file/attach-file.component';
import {Document} from '../../../data/remote/model/file/document/document';
import {Group} from '../../../data/remote/model/group/base/group';
import {Person} from '../../../data/remote/model/person';
import {AppHelper} from '../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {DocumentType} from '../../../data/remote/model/file/document/document-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {GroupTransition} from '../../../data/remote/model/group/transition/group-transition';
import {ListRequest} from '../../../data/remote/request/list-request';

@Component({
  selector: 'app-group-transition',
  templateUrl: './group-transition.component.html',
  styleUrls: ['./group-transition.component.scss']
})
export class GroupTransitionComponent {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTransitionTypeClass = PersonTransitionType;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  @ViewChild(AttachFileComponent)
  public attachFileComponent: AttachFileComponent<Document>;

  @Input()
  public groupTransitionType: PersonTransitionType;

  @Input()
  public group: Group;

  @Input()
  public persons: Person[];

  public transferToGroup: Group;
  public document: Document;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService) {
    this.document = new Document();
    this.document.type = DocumentType.ORDER;
    this.document.clazz = FileClass.GROUP_TRANSITION;
  }

  public async initialize(groupPersonTransitionType: PersonTransitionType, group: Group, persons: Person[]) {
    this.groupTransitionType = groupPersonTransitionType;
    this.group = group;
    this.persons = persons;

    await this.resetItems();
  }

  public fetchItems = async () => {
    return this._appHelper.arrayToPageContainer(this.persons);
  };

  getKey(group: Group) {
    return group.id;
  }

  getName(group: Group) {
    return group.name;
  }

  public fetchGroups = async (from: number, searchText: string) => {
    const pageContainer = await this._participantRestApiService.getGroups({
      from: from,
      count: PropertyConstant.pageSize,
      name: searchText,
      canEdit: true
    });
    if (this.groupTransitionType !== PersonTransitionType.ENROLL) {
      pageContainer.list = pageContainer.list.filter(x => x.id != this.group.id);
    }
    return pageContainer;
  };

  public async onSave(): Promise<boolean> {
    return await this._appHelper.trySave(async () => {
      let groupTransition: GroupTransition;
      switch (this.groupTransitionType) {
        case PersonTransitionType.TRANSFER:
          groupTransition = (await this._participantRestApiService.transferPersonsToGroup({
            groupJoinId: this.transferToGroup.id,
            personIds: this.persons.map(x => x.id)
          }, {}, {groupId: this.group.id}))[0].groupTransition;
          break;
        case PersonTransitionType.EXPEL:
          groupTransition = (await this._participantRestApiService.expelPersonsFromGroup(new ListRequest(this.persons), {}, {groupId: this.group.id}))[0].groupTransition;
          break;
      }

      this.document.objectId = groupTransition.id;
      await this.attachFileComponent.updateFile();
    });
  };

  public onDateChanged(val: Date) {
    this.document.date = this._appHelper.getGmtDate(val);
  }

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
