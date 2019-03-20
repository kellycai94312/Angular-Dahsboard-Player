import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {GroupPersonQuery} from '../../../../../../data/remote/rest-api/query/group-person-query';
import {GroupTypeEnum} from '../../../../../../data/remote/model/group/base/group-type-enum';
import {UserRoleEnum} from '../../../../../../data/remote/model/user-role-enum';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {Person} from '../../../../../../data/remote/model/person';
import {GroupPerson} from '../../../../../../data/remote/model/group/group-person';
import {PersonQuery} from '../../../../../../data/remote/rest-api/query/person-query';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {TemplateModalService} from '../../../../../../service/template-modal.service';
import {NgxGridComponent} from '../../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {SelectionType} from '../../../../../../components/ngx-grid/bean/selection-type';
import {PersonTransitionType} from '../../../../../../data/remote/model/group/transition/person-transition-type';
import {SplitButtonItem} from '../../../../../../components/ngx-split-button/bean/split-button-item';

@Component({
  selector: 'app-group-members-page',
  templateUrl: './group-members-page.component.html',
  styleUrls: ['./group-members-page.component.scss']
})
export class GroupMembersPageComponent extends BaseGroupComponent<Group> {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTypeEnumClass = GroupTypeEnum;
  public readonly selectionTypeClass = SelectionType;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly splitButtonsItems: SplitButtonItem[];
  public personQuery: PersonQuery;
  public selectedGroupPersons: GroupPerson[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.personQuery = new PersonQuery();
    this.personQuery.name = '';
    this.personQuery.count = PropertyConstant.pageSize;
    this.selectedGroupPersons = [];

    this.splitButtonsItems = [
      this.groupTransitionModalSplitButtonItem(PersonTransitionType.EXPEL),
      this.groupTransitionModalSplitButtonItem(PersonTransitionType.TRANSFER, () => {
        return this.group && (this.group.discriminator === GroupTypeEnum.PREPARATION_GROUP || this.group.discriminator === GroupTypeEnum.TEAM);
      })
    ];
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    await super.initializeGroupPerson(groupPerson);
    await this.resetItems();
  }

  public fetchItems = async (query: GroupPersonQuery) => {
    query.id = this.group.id;
    if (this.group.discriminator === GroupTypeEnum.TEAM || this.group.discriminator === GroupTypeEnum.PREPARATION_GROUP) {
      query.userRoleEnum = UserRoleEnum.ATHLETE;
    }
    const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(query);
    // Group owner hidden in list
    const groupOwnerIndex = pageContainer.list.findIndex(x => x.person.user.id == this.group.owner.id);
    if (groupOwnerIndex > -1) {
      pageContainer.list.splice(groupOwnerIndex, 1);
    }
    return pageContainer;
  };

  public onAddGroupPerson = async () => {
    await this.showEditGroupPerson();
  };

  public onEditGroupPerson = async (obj: GroupPerson) => {
    await this.showEditGroupPerson(obj);
  };

  public async showEditGroupPerson(groupPerson?: GroupPerson) {
    let person = new Person();
    if (groupPerson) {
      person = groupPerson.person;
    }
    if (await this._templateModalService.showEditPersonModal(person, {group: this.group}, {componentFactoryResolver: this._componentFactoryResolver})) {
      // TODO: Update only edited item!
      await this.resetItems();
    }
  }

  public async onSortChange(val: string) {
    if (val) {
      this.personQuery.sort = val;
    } else {
      delete this.personQuery.sort;
    }
    await this.resetItems();
  }

  public onSelectedItemsChange(items: GroupPerson[]) {
    this.selectedGroupPersons = items;
  }

  private groupTransitionModalSplitButtonItem(type: PersonTransitionType, visible?: () => boolean): SplitButtonItem {
    return {
      nameKey: `groupTransitionTypeEnum.${type}`,
      callback: async () => {
        // if (await this._templateModalService.showGroupPersonTransitionModal(type, this.group, this.selectedGroupPersons.map(x => x.person))) {
        //   await this.resetItems();
        // }
      },
      visible: visible
    };
  }

  private async resetItems() {
    await this.appHelper.delay();
    await this.ngxGridComponent.reset();
    this.groupService.refreshMembers.next();
  }

}
