import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../data/remote/model/person';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AttachFileComponent} from '../../../../components/attach-file/attach-file/attach-file.component';
import {Document} from '../../../../data/remote/model/file/document/document';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {UserRole} from '../../../../data/remote/model/user-role';
import {GroupTransitionType} from '../../../../data/remote/model/group/transition/group-transition-type';
import {DocumentQuery} from '../../../../data/remote/rest-api/query/file/document-query';
import {GroupTransition} from '../../../../data/remote/model/group/transition/group-transition';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {EditPersonRankComponent} from '../../../../components/person/edit-person-rank/edit-person-rank.component';
import {EditMedicalExaminationComponent} from '../../../../components/person/edit-medical-examination/edit-medical-examination.component';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {MedicalExamination} from '../../../../data/remote/model/person/medical-examination';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {Router} from '@angular/router';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {PersonContant} from '../../../../data/local/person-contant';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {DocumentType} from '../../../../data/remote/model/file/document/document-type';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {ComponentWithAttach} from '../../../../data/local/component/base/component-with-attach';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent extends BaseEditComponent<Person> implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(AttachFileComponent)
  public attachFileComponent: AttachFileComponent<Document>;

  @ViewChild('sportRanks')
  public sportRankNgxGridComponent: NgxGridComponent;

  @ViewChild('medicalExaminations')
  public medicalExaminationNgxGridComponent: NgxGridComponent;

  @Input()
  public group: Group;

  public readonly dateMin: Date;
  public readonly dateMax: Date;
  public sexEnums: NameWrapper<SexEnum>[];
  public selectedSexEnum: NameWrapper<SexEnum>;
  public groupPersonUserRoles: UserRole[];
  public joinGroupPersonTransitionTypes: NameWrapper<GroupTransitionType>[];
  public selectedJoinGroupPersonTransitionType: NameWrapper<GroupTransitionType>;
  public document: Document;
  public documentQuery: DocumentQuery;
  public joinGroupTransition: GroupTransition;
  public stageTypes: StageType[];
  public selectedStageType: StageType;

  private readonly _personRankComponents: EditPersonRankComponent[];
  private readonly _medicalExaminationComponents: EditMedicalExaminationComponent[];
  private _initialPersonRanks: PersonRank[];
  private _initialMedicalExaminations: MedicalExamination[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService,
              private _router: Router,
              private _translateObjectService: TranslateObjectService) {
    super(participantRestApiService, appHelper);
    this.dateMin = PersonContant.getBirthDateMin();
    this.dateMax = PersonContant.getBirthDateMax();
    this.document = new Document();
    this.document.clazz = FileClass.GROUP_TRANSITION;
    this.document.type = DocumentType.ORDER;
    this.documentQuery = new DocumentQuery();
    this.documentQuery.clazz = this.document.clazz;
    this.documentQuery.type = this.document.type;

    this._personRankComponents = [];
    this._medicalExaminationComponents = [];
    this.groupPersonUserRoles = [];
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.stageTypes = await this.participantRestApiService.getStageTypes();
  }

  async initialize(obj: Person): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);

      this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
      if (this.data.sex) {
        this.selectedSexEnum = this.sexEnums.find(x => x.data === this.data.sex);
      } else {
        this.selectedSexEnum = this.sexEnums[0];
      }
      this.joinGroupPersonTransitionTypes = await this._translateObjectService.getTranslatedEnumCollection<GroupTransitionType>(GroupTransitionType, 'GroupTransitionTypeEnum');
      this.selectedJoinGroupPersonTransitionType = this.joinGroupPersonTransitionTypes.find(x => x.data === GroupTransitionType.ENROLL);

      if (this.appHelper.isNewObject(obj)) {
        const userRoles = await this.participantRestApiService.getUserRoles();
        this.groupPersonUserRoles = [userRoles.find(x => x.userRoleEnum === UserRoleEnum.ATHLETE)];
      } else {
        if (this.group) {
          try {
            this.groupPersonUserRoles = await this.participantRestApiService.getGroupPersonUserRoles({
              groupId: this.group.id,
              personId: obj.id
            });
          } catch (e) {
          }

          const groupPerson = await this.getGroupPerson();
          if (groupPerson) {
            this.selectedStageType = groupPerson.stageType;
            this.joinGroupTransition = groupPerson.groupTransition;
            this.documentQuery.objectId = this.joinGroupTransition.id;
            this.selectedJoinGroupPersonTransitionType = this.joinGroupPersonTransitionTypes.find(x => x.data === this.joinGroupTransition.groupTransitionType);

            await this.attachFileComponent.initialize();
          }
        }

        await this.sportRankNgxGridComponent.reset();
        await this.medicalExaminationNgxGridComponent.reset();
      }

      this._initialPersonRanks = this.sportRankNgxGridComponent.items.slice(0);
      this._initialMedicalExaminations = this.medicalExaminationNgxGridComponent.items.slice(0);
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removePerson({personId: this.data.id});
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      let groupTransition = this.joinGroupTransition;
      if (this.appHelper.isNewObject(this.data)) {
        let personFullName = `${this.data.firstName} ${this.data.lastName}`;
        if (this.data.patronymic) {
          personFullName += ` ${this.data.patronymic}`;
        }
        const query: PersonQuery = {
          name: personFullName,
          dateBirth: this.appHelper.dateByFormat(this.data.birthDate, this.propertyConstantClass.dateFormat),
          sex: this.data.sex,
          count: 1
        };
        let selectedPerson: Person;
        if ((await this.participantRestApiService.getPersons(query)).list.length && await this._ngxModalService.showMatchWasFoundDialogModal()) {
          await this._ngxModalService.showSelectionPersonsModal(query, async selectedItems => {
            if (selectedItems.length) {
              selectedPerson = selectedItems[0];
              this.appHelper.updateObject(this.data, selectedPerson);
            }
          });
        }
        if (selectedPerson) {
          groupTransition = (await this.participantRestApiService.enrollPersonsToGroup(new ListRequest([selectedPerson]), {}, {groupId: this.group.id}))[0].groupTransition;
        } else {
          const groupPersonTransition = await this.participantRestApiService.createAndEnrollToGroup(this.data, {}, {groupId: this.group.id});
          groupTransition = groupPersonTransition.groupTransition;
          this.appHelper.updateObject(this.data, groupPersonTransition.person);
        }
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.updatePerson(this.data, {}, {personId: this.data.id}));
      }
      await this.participantRestApiService.updateGroupPersonUserRoles(new ListRequest(this.groupPersonUserRoles), {}, {
        groupId: this.group.id,
        personId: this.data.id
      });
      await this.participantRestApiService.updateGroupPersonStageType({id: this.selectedStageType ? this.selectedStageType.id : null}, {}, {
        groupId: this.group.id,
        personId: this.data.id
      });

      this.document.objectId = groupTransition.id;
      await this.attachFileComponent.updateFile();

      await this.applyComponentsData(this._initialPersonRanks, this.sportRankNgxGridComponent.items, this._personRankComponents,
        async (obj: PersonRank) => {
          return await this.participantRestApiService.removePersonRank({personId: this.data.id, personRankId: obj.id});
        });
      await this.applyComponentsData(this._initialMedicalExaminations, this.medicalExaminationNgxGridComponent.items, this._medicalExaminationComponents,
        async (obj: MedicalExamination) => {
          return await this.participantRestApiService.removeMedicalExamination({personId: this.data.id, medicalExaminationId: obj.id});
        });
    });
  }

  public async navigateToPage(): Promise<void> {
    if (this.data && this.data.id) {
      await this._router.navigate(['/person', this.data.id]);
    }
  }

  public onEditGroupPersonUserRoles = async () => {
    await this._ngxModalService.showSelectionUserRolesModal(this.groupPersonUserRoles, async selectedItems => {
      this.groupPersonUserRoles = selectedItems;
    });
  };

  public fetchPersonRanks = async (query: PageQuery) => {
    if (!this.data) {
      return;
    }
    const items = await this.participantRestApiService.getPersonRanks({personId: this.data.id});
    return this.appHelper.arrayToPageContainer(items);
  };

  public fetchMedicalExaminations = async (query: PageQuery) => {
    if (!this.data) {
      return;
    }
    const items = (await this.participantRestApiService.getMedicalExaminations({}, {count: PropertyConstant.pageSizeMax}, {personId: this.data.id})).list;
    return this.appHelper.arrayToPageContainer(items);
  };

  getKey(group: Group) {
    return group.id;
  }

  getName(group: any): string {
    return group.name;
  }

  public fetchGroups = async (from: number, searchText: string) => {
    return await this.participantRestApiService.getGroups({
      from: from,
      count: PropertyConstant.pageSize,
      name: searchText,
      canEdit: true
    });
  };

  //#region Person ranks

  public onAddSportRank = async () => {
    await this.onShowSportRankModel(new PersonRank());
  };

  public onEditSportRank = async (obj: PersonRank) => {
    await this.onShowSportRankModel(obj);
  };


  private async onShowSportRankModel(personRank: PersonRank) {
    const tempFile = this.getFileFromTempComponent(personRank, this._personRankComponents);

    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    let editRankComponent: EditPersonRankComponent = null;
    await modal.componentInstance.initializeBody(EditPersonRankComponent, async component => {
      editRankComponent = component;
      component.manualInitialization = true;
      component.person = this.data;
      await component.initialize(personRank);

      if (tempFile) {
        component.initializeTempFile(tempFile);
      }
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            if (!(await component.validWithNotify())) {
              return;
            }
            this.updateComponentData(component, this.sportRankNgxGridComponent.items, this._personRankComponents);
            modal.close();
          }
        },
        {
          nameKey: 'remove',
          callback: async () => {
            this.removeComponentData(component, this.sportRankNgxGridComponent.items, this._personRankComponents);
            modal.close();
          }
        }
      ];
    });

    if (!await this._ngxModalService.awaitModalResult(modal)) {
      editRankComponent.changeWatcher.reset();
    }
  }

  //#endregion

  //#region Medical examinations

  public onAddMedicalExamination = async () => {
    await this.onShowMedicalExaminationModel(new MedicalExamination());
  };

  public onEditMedicalExamination = async (obj: MedicalExamination) => {
    await this.onShowMedicalExaminationModel(obj);
  };

  private async onShowMedicalExaminationModel(medicalExamination: MedicalExamination) {
    const tempFile = this.getFileFromTempComponent(medicalExamination, this._medicalExaminationComponents);

    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    let editMedicalExaminationComponent: EditMedicalExaminationComponent = null;
    await modal.componentInstance.initializeBody(EditMedicalExaminationComponent, async component => {
      editMedicalExaminationComponent = component;
      component.manualInitialization = true;
      component.person = this.data;
      await component.initialize(medicalExamination);

      if (tempFile) {
        component.initializeTempFile(tempFile);
      }
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            if (!(await component.validWithNotify())) {
              return;
            }
            this.updateComponentData(component, this.medicalExaminationNgxGridComponent.items, this._medicalExaminationComponents);
            modal.close();
          }
        },
        {
          nameKey: 'remove',
          callback: async () => {
            this.removeComponentData(component, this.medicalExaminationNgxGridComponent.items, this._medicalExaminationComponents);
            modal.close();
          }
        }
      ];
    });
    if (!await this._ngxModalService.awaitModalResult(modal)) {
      editMedicalExaminationComponent.changeWatcher.reset();
    }
  }

  //#endregion

  //#region Other

  public onSexChanged(val: NameWrapper<SexEnum>) {
    this.data.sex = val.data;
  }

  public onJoinDateChanged(val: Date) {
    this.document.date = this.appHelper.getGmtDate(val);
  }

  private getFileFromTempComponent<T extends IdentifiedObject>(obj: T, components: ComponentWithAttach<T>[]) {
    const tempComponent = components.find(x => x.data === obj);
    if (tempComponent) {
      return tempComponent.document;
    }
    return null;
  }

  private updateComponentData<T extends IdentifiedObject>(component: ComponentWithAttach<T>, items: T[], components: ComponentWithAttach<T>[]) {
    let itemIndex = components.findIndex(x => x.data === component.data);
    if (itemIndex < 0) {
      components.push(component);
    } else {
      components[itemIndex] = component;
    }

    itemIndex = items.findIndex((x: T) => x === component.data);
    if (itemIndex < 0) {
      items.push(component.data);
    } else {
      items[itemIndex] = component.data;
    }
  }

  private removeComponentData<T extends IdentifiedObject>(component: ComponentWithAttach<T>, items: T[], components: ComponentWithAttach<T>[]) {
    let itemIndex = components.findIndex(x => x.data === component.data);
    if (itemIndex > -1) {
      components.splice(itemIndex, 1);
    }
    itemIndex = items.findIndex((x: T) => x === component.data);
    if (itemIndex > -1) {
      items.splice(itemIndex, 1);
    }
  }

  private async applyComponentsData<T extends IdentifiedObject>(initialItems: T[], items: T[], components: ComponentWithAttach<T>[], remove: (obj: T) => Promise<T>) {
    const forRemove: T[] = [];
    for (const item of initialItems) {
      if (!items.find(x => x === item)) {
        forRemove.push(item);
      }
    }
    for (const item of forRemove) {
      await remove(item);
    }

    for (const item of components) {
      if (forRemove.find(x => x === item.data)) {
        continue;
      }
      await item.onSave();
    }
  }

  private async getGroupPerson(): Promise<GroupPerson> {
    try {
      return await this.participantRestApiService.getGroupPerson({groupId: this.group.id, personId: this.data.id});
    } catch (e) {
    }
    return null;
  }

  //#endregion

}
