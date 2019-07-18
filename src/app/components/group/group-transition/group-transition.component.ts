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
import {SubgroupGroup} from '../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {SubgroupTransition} from '../../../data/remote/model/group/subgroup/subgroup/subgroup-transition';
import {SubgroupPerson} from '../../../data/remote/model/group/subgroup/person/subgroup-person';
import {SubgroupPersonTypeEnum} from '../../../data/remote/model/group/subgroup/person/subgroup-person-type-enum';
import {SubgroupTemplateGroupVersion} from '../../../data/remote/model/group/subgroup/template/subgroup-template-group-version';
import {SubgroupTemplateGroup} from '../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {SubgroupVersion} from '../../../data/remote/model/group/subgroup/version/subgroup-version';
import {NgxInput} from '../../../module/ngx/ngx-input/model/ngx-input';
import {NgxDate} from '../../../module/ngx/ngx-date/model/ngx-date';
import {FormControl} from '@angular/forms';

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
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

  @Input()
  public fromSubgroupGroup: SubgroupGroup;

  @Input()
  public persons: Person[];

  public readonly documentNumberNgxInput = new NgxInput();
  public readonly dateNgxDate = new NgxDate();
  public selectedSubgroupGroup: SubgroupGroup;
  public document: Document;
  public selectedSubgroupTemplateGroup: SubgroupTemplateGroup;
  public _rootSubgroupName: string;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService) {
    this.document = new Document();
    this.document.type = DocumentType.ORDER;
  }

  public async initialize(groupPersonTransitionType: PersonTransitionType, group: Group, persons: Person[]) {
    this.groupTransitionType = groupPersonTransitionType;
    this.group = group;
    this.persons = persons;

    this.documentNumberNgxInput.labelTranslation = 'documentNumber';

    this.dateNgxDate.placeholderTranslation = 'date';
    this.dateNgxDate.control = new FormControl();

    if (!this.subgroupTemplateGroupVersion) {
      this.selectedSubgroupTemplateGroup = (await this.fetchSubgroupTemplateGroups(0, '')).list[0];
      this.subgroupTemplateGroupVersion = this.selectedSubgroupTemplateGroup.subgroupTemplateGroupVersion;
    }
    this._rootSubgroupName = await this._translateObjectService.getTranslation('rootSubgroup');

    await this.resetItems();
  }

  public fetchItems = async () => {
    return this._appHelper.arrayToPageContainer(this.persons);
  };

  getKey(subgroupGroup: SubgroupGroup) {
    return subgroupGroup.id;
  }

  getName(subgroupGroup: SubgroupGroup) {
    return subgroupGroup.subgroupVersion.name;
  }

  getSubgroupTemplateGroupKey(subgroupTemplateGroup: SubgroupTemplateGroup) {
    return subgroupTemplateGroup.id;
  }

  getSubgroupTemplateGroupName(subgroupTemplateGroup: SubgroupTemplateGroup) {
    return subgroupTemplateGroup.subgroupTemplateGroupVersion.template.name;
  }

  public fetchSubgroupTemplateGroups = async (from: number, searchText: string) => {
    return await this._participantRestApiService.getSubgroupTemplateGroupsByGroup({}, {from: from, count: PropertyConstant.pageSize, name: searchText}, {groupId: this.group.id});
  };

  public fetchSubgroups = async (from: number, searchText: string) => {
    const items = await this._participantRestApiService.getUnassignedSubgroupGroupsForPersons(
      {
        subgroupTemplateGroupVersionId: this.subgroupTemplateGroupVersion.id,
        personIds: this.persons.map(x => x.id).join('_')
      });
    const defaultSubgroup = items.find(x => (x.subgroupVersion as SubgroupVersion).defaultSubgroup);
    if (defaultSubgroup) {
      defaultSubgroup.subgroupVersion.name = this._rootSubgroupName;
    }
    return this._appHelper.arrayToPageContainer(items);
  };

  public async onSave(): Promise<boolean> {
    this.document.number = this.documentNumberNgxInput.control.value;
    this.document.date = this._appHelper.getGmtDate(this.dateNgxDate.control.value);

    return await this._appHelper.trySave(async () => {
      let transition: GroupTransition | SubgroupTransition;
      switch (this.groupTransitionType) {
        case PersonTransitionType.TRANSFER:
          const personIds = this.persons.map(x => x.id);
          let subgroupPersons: SubgroupPerson[];
          if (this.fromSubgroupGroup) {
            subgroupPersons = await this._participantRestApiService.transferSubgroupPersons(
              {subgroupGroupId: this.selectedSubgroupGroup.id, personIds: personIds},
              {}, {subgroupGroupId: this.fromSubgroupGroup.id});
          } else {
            subgroupPersons = await this._participantRestApiService.createSubgroupPersons({
              personIds: personIds,
              subgroupPersonTypeEnum: SubgroupPersonTypeEnum.PARTICIPANT
            }, {}, {subgroupGroupId: this.selectedSubgroupGroup.id});
          }

          transition = subgroupPersons[0].subgroupTransition;
          this.document.clazz = FileClass.SUBGROUP_TRANSITION;

          // groupTransition = (await this._participantRestApiService.transferPersonsToGroup({
          //   groupJoinId: this.transferToGroup.id,
          //   personIds: this.persons.map(x => x.id)
          // }, {}, {groupId: this.group.id}))[0].groupTransition;
          break;
        case PersonTransitionType.EXPEL:
          this.document.clazz = FileClass.GROUP_TRANSITION;
          transition = (await this._participantRestApiService.expelPersonsFromGroup(new ListRequest(this.persons), {}, {groupId: this.group.id}))[0].groupTransition;
          break;
        case PersonTransitionType.EXPEL_FROM_SUBGROUP:
          this.document.clazz = FileClass.SUBGROUP_TRANSITION;

          transition = (await this._participantRestApiService.removeSubgroupPersons({
            subgroupPersonTypeEnum: SubgroupPersonTypeEnum.PARTICIPANT,
            personIds: this.persons.map(x => x.id)
          }, {}, {subgroupGroupId: this.fromSubgroupGroup.id}))[0].subgroupTransition;
          break;
      }

      this.document.objectId = transition.id;
      await this.attachFileComponent.updateFile();
    });
  };

  public onSelectedSubgroupTemplateGroup(subgroupTemplateGroup: SubgroupTemplateGroup) {
    this.subgroupTemplateGroupVersion = subgroupTemplateGroup.subgroupTemplateGroupVersion;
  }

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
