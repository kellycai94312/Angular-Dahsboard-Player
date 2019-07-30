import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PersonTransitionType} from '../../../data/remote/model/group/transition/person-transition-type';
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
import {SubgroupTemplateGroup} from '../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {SubgroupVersion} from '../../../data/remote/model/group/subgroup/version/subgroup-version';
import {NgxInput} from '../../../module/ngx/ngx-input/model/ngx-input';
import {NgxDate} from '../../../module/ngx/ngx-date/model/ngx-date';
import {FormControl, Validators} from '@angular/forms';
import {SubgroupGroupApiService} from '../../../data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';
import {NgxSelect} from '../../../module/ngx/ngx-select/model/ngx-select';
import {GroupApiService} from '../../../data/remote/rest-api/api/group/group-api.service';
import {takeWhile, tap} from 'rxjs/operators';
import {SubgroupTemplateGroupVersionApiService} from '../../../data/remote/rest-api/api/subgroup-template-group-version/subgroup-template-group-version-api.service';
import {SubgroupTemplateGroupVersion} from '../../../data/remote/model/group/subgroup/template/subgroup-template-group-version';
import {PersonTransitionModalConfig} from '../../../service/template-modal.service';

@Component({
  selector: 'app-group-transition',
  templateUrl: './group-transition.component.html',
  styleUrls: ['./group-transition.component.scss']
})
export class GroupTransitionComponent implements OnDestroy {

  @ViewChild(AttachFileComponent)
  public attachFileComponent: AttachFileComponent<Document>;

  @Input()
  public groupTransitionType: PersonTransitionType;

  @Input()
  public group: Group;

  @Input()
  public persons: Person[] = [];

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTransitionTypeClass = PersonTransitionType;
  public readonly documentNumberNgxInput = new NgxInput();
  public readonly documentDateNgxDate = new NgxDate();
  public readonly subgroupPersonTypeNgxSelect = new NgxSelect();
  public readonly subgroupTemplateGroupNgxSelect = new NgxSelect();
  public readonly subgroupGroupNgxSelect = new NgxSelect();
  public document: Document;
  private _rootSubgroupName: string;
  private _personTransitionModalConfig: PersonTransitionModalConfig;
  private _notDestroyed = true;

  constructor(private _appHelper: AppHelper,
              private _groupApiService: GroupApiService,
              private _subgroupTemplateGroupVersionApiService: SubgroupTemplateGroupVersionApiService,
              private _subgroupGroupApiService: SubgroupGroupApiService,
              private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService) {
    this.document = new Document();
    this.document.type = DocumentType.ORDER;
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public async initialize(groupPersonTransitionType: PersonTransitionType,
                          group: Group,
                          persons: Person[],
                          personTransitionModalConfig?: PersonTransitionModalConfig) {
    this.groupTransitionType = groupPersonTransitionType;
    this.group = group;
    this.persons = persons;
    this._personTransitionModalConfig = personTransitionModalConfig;

    this._rootSubgroupName = await this._translateObjectService.getTranslation('rootSubgroup');

    this.documentNumberNgxInput.labelTranslation = 'documentNumber';

    this.documentDateNgxDate.placeholderTranslation = 'date';
    this.documentDateNgxDate.format = PropertyConstant.dateTimeFormat;
    this.documentDateNgxDate.control = new FormControl();

    this.subgroupPersonTypeNgxSelect.labelTranslation = 'subgroupPersonType';
    this.subgroupPersonTypeNgxSelect.required = true;
    this.subgroupPersonTypeNgxSelect.display = 'name';
    this.subgroupPersonTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SubgroupPersonTypeEnum>(SubgroupPersonTypeEnum, 'SubgroupPersonTypeEnum');
    this.subgroupPersonTypeNgxSelect.control.setValidators([Validators.required]);
    this.subgroupPersonTypeNgxSelect.control.setValue(this.subgroupPersonTypeNgxSelect.items[0]);

    this.subgroupTemplateGroupNgxSelect.labelTranslation = 'templates';
    this.subgroupTemplateGroupNgxSelect.required = true;
    this.subgroupTemplateGroupNgxSelect.display = (item: SubgroupTemplateGroup) => item.subgroupTemplateGroupVersion.template.name;
    this.subgroupTemplateGroupNgxSelect.items = (await this._groupApiService.getSubgroupTemplateGroups(this.group, {count: PropertyConstant.pageSizeMax}).toPromise()).list;
    this.subgroupTemplateGroupNgxSelect.control.setValidators([Validators.required]);

    this.subgroupGroupNgxSelect.labelTranslation = 'subgroup';
    this.subgroupGroupNgxSelect.required = true;
    this.subgroupGroupNgxSelect.display = (item: SubgroupGroup) => item.subgroupVersion.name;
    this.subgroupGroupNgxSelect.control.setValidators([Validators.required]);
    if (this.groupTransitionType === PersonTransitionType.TRANSFER) {
      this.subgroupGroupNgxSelect.control.disable();
    }

    this.subgroupTemplateGroupNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async (subgroupTemplateGroup: SubgroupTemplateGroup) => {
        await this._updateSubgroupGroupList(subgroupTemplateGroup.subgroupTemplateGroupVersion);
      });

    if (personTransitionModalConfig && personTransitionModalConfig.subgroupTemplateGroupVersion) {
      this.subgroupTemplateGroupNgxSelect.control.setValue(personTransitionModalConfig);
    }
  }

  private async _updateSubgroupGroupList(subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion): Promise<void> {
    this.subgroupGroupNgxSelect.items = await this._subgroupTemplateGroupVersionApiService.getUnassignedSubgroupGroupsForPersons(subgroupTemplateGroupVersion, this.persons).pipe(tap(value => {
      const rootSubgroup = value.find(x => (x.subgroupVersion as SubgroupVersion).defaultSubgroup);
      if (rootSubgroup) {
        rootSubgroup.subgroupVersion.name = this._rootSubgroupName;
      }
    })).toPromise();
    this.subgroupGroupNgxSelect.control.enable();
  }

  public fetchItems = async () => {
    return this._appHelper.arrayToPageContainer(this.persons);
  };

  public async onSave(): Promise<boolean> {
    this.document.number = this.documentNumberNgxInput.control.value;
    this.document.date = this._appHelper.getGmtDate(this.documentDateNgxDate.control.value);

    return await this._appHelper.trySave(async () => {
      const personIds = this.persons.map(x => x.id);
      const subgroupPersonTypeEnum = this.subgroupPersonTypeNgxSelect.control.value.data as SubgroupPersonTypeEnum;
      const subgroupGroup = this.subgroupGroupNgxSelect.control.value as SubgroupGroup;

      let transition: GroupTransition | SubgroupTransition;
      switch (this.groupTransitionType) {
        case PersonTransitionType.TRANSFER:
          let subgroupPersons: SubgroupPerson[];
          if (this._personTransitionModalConfig && this._personTransitionModalConfig.subgroupGroup) {
            subgroupPersons = await this._subgroupGroupApiService.transferSubgroupPersons(this._personTransitionModalConfig.subgroupGroup, {
              subgroupGroupId: subgroupGroup.id,
              personIds: personIds
            }).toPromise();
          } else {
            subgroupPersons = await this._subgroupGroupApiService.createSubgroupPersons(subgroupGroup, {
              personIds: personIds,
              subgroupPersonTypeEnum: subgroupPersonTypeEnum
            }).toPromise();
          }

          transition = subgroupPersons[0].subgroupTransition;
          this.document.clazz = FileClass.SUBGROUP_TRANSITION;
          break;
        case PersonTransitionType.EXPEL:
          this.document.clazz = FileClass.GROUP_TRANSITION;
          transition = (await this._participantRestApiService.expelPersonsFromGroup(new ListRequest(this.persons), {}, {groupId: this.group.id}))[0].groupTransition;
          break;
        case PersonTransitionType.ENROLL_IN_SUBGROUP:
          this.document.clazz = FileClass.SUBGROUP_TRANSITION;

          transition = (await this._subgroupGroupApiService.createSubgroupPersons(subgroupGroup, {
            personIds: personIds,
            subgroupPersonTypeEnum: subgroupPersonTypeEnum
          }).toPromise())[0].subgroupTransition;
          break;
        case PersonTransitionType.EXPEL_FROM_SUBGROUP:
          this.document.clazz = FileClass.SUBGROUP_TRANSITION;

          transition = (await this._subgroupGroupApiService.removeSubgroupPersons(this._personTransitionModalConfig.subgroupGroup, this._personTransitionModalConfig.subgroupPerson).toPromise())[0].subgroupTransition;
          break;
      }

      this.document.objectId = transition.id;
      await this.attachFileComponent.updateFile();
    });
  };

}
