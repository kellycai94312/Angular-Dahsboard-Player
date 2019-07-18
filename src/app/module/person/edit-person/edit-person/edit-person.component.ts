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
import {PersonTransitionType} from '../../../../data/remote/model/group/transition/person-transition-type';
import {DocumentQuery} from '../../../../data/remote/rest-api/query/file/document-query';
import {GroupTransition} from '../../../../data/remote/model/group/transition/group-transition';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {EditPersonRankComponent} from '../../edit-person-rank/edit-person-rank/edit-person-rank.component';
import {EditMedicalExaminationComponent} from '../../edit-medical-examination/edit-medical-examination/edit-medical-examination.component';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {MedicalExamination} from '../../../../data/remote/model/person/medical-examination';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {Router} from '@angular/router';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {DocumentType} from '../../../../data/remote/model/file/document/document-type';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {ComponentWithAttach} from '../../../../data/local/component/base/component-with-attach';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {EditPersonService} from '../service/edit-person.service';
import {GroupPersonPosition} from '../../../../data/remote/model/group/position/group-person-position';
import {BaseFile} from '../../../../data/remote/model/file/base/base-file';
import {ValidationService} from '../../../../service/validation/validation.service';

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
  public groupPersonPositions: GroupPersonPosition[];
  public joinGroupPersonTransitionTypes: NameWrapper<PersonTransitionType>[];
  public selectedJoinGroupPersonTransitionType: NameWrapper<PersonTransitionType>;
  public document: Document;
  public documentQuery: DocumentQuery;
  public joinGroupTransition: GroupTransition;
  public stageTypes: StageType[];
  public selectedStageType: StageType;
  public passportDocument: Document;
  public personalDataProcessingDocument: Document;
  public serviceAgreementDocument: Document;

  private readonly _personRankComponents: EditPersonRankComponent[];
  private readonly _medicalExaminationComponents: EditMedicalExaminationComponent[];
  private _initialPersonRanks: PersonRank[];
  private _initialMedicalExaminations: MedicalExamination[];

  constructor(private _ngxModalService: NgxModalService,
              private _editPersonService: EditPersonService,
              private _router: Router,
              private _validationService: ValidationService,
              private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.dateMin = this._validationService.getBirthDateMin();
    this.dateMax = this._validationService.getBirthDateMax();
    this.document = new Document();
    this.document.clazz = FileClass.GROUP_TRANSITION;
    this.document.type = DocumentType.ORDER;
    this.documentQuery = new DocumentQuery();
    this.documentQuery.clazz = this.document.clazz;
    this.documentQuery.type = this.document.type;

    this.personalDataProcessingDocument = new Document();
    this.personalDataProcessingDocument.clazz = FileClass.PERSONAL_DATA_PROCESSING;
    this.personalDataProcessingDocument.type = DocumentType.ORDER;

    this.serviceAgreementDocument = new Document();
    this.serviceAgreementDocument.clazz = FileClass.GROUP_PERSON;
    this.serviceAgreementDocument.type = DocumentType.ORDER;

    this.passportDocument = new Document();
    this.passportDocument.clazz = FileClass.PERSON;
    this.passportDocument.type = DocumentType.PASSPORT;

    this._personRankComponents = [];
    this._medicalExaminationComponents = [];
    this.groupPersonPositions = [];
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
        this.data.sex = this.selectedSexEnum.data;
      }
      this.joinGroupPersonTransitionTypes = await this._translateObjectService.getTranslatedEnumCollection<PersonTransitionType>(PersonTransitionType, 'GroupTransitionTypeEnum');
      this.selectedJoinGroupPersonTransitionType = this.joinGroupPersonTransitionTypes.find(x => x.data === PersonTransitionType.ENROLL);

      if (!this.appHelper.isNewObject(obj)) {
        if (this.group) {
          try {
            this.groupPersonPositions = (await this.participantRestApiService.getGroupPersonPositions({}, {unassigned: false}, {
              groupId: this.group.id,
              personId: obj.id
            })).list;
          } catch (e) {
          }

          const groupPerson = await this.getGroupPerson();
          if (groupPerson) {
            this.selectedStageType = groupPerson.stageType;
            // this.joinGroupTransition = groupPerson.groupTransition;
            // this.documentQuery.objectId = this.joinGroupTransition.id;
            // this.selectedJoinGroupPersonTransitionType = this.joinGroupPersonTransitionTypes.find(x => x.data === this.joinGroupTransition.type);

            // await this.attachFileComponent.initialize();

            try {
              const serviceAgreementDocuments = (await this.participantRestApiService.getDocuments({clazz: FileClass.GROUP_PERSON, count: 1, objectId: groupPerson.id})).list;
              if (serviceAgreementDocuments.length) {
                this.serviceAgreementDocument = serviceAgreementDocuments[0];
              }
            } catch (e) {
            }
          }
        }

        await this.sportRankNgxGridComponent.reset();
        await this.medicalExaminationNgxGridComponent.reset();
        try {
          const personalDataProcessingDocuments = (await this.participantRestApiService.getDocuments({clazz: FileClass.PERSONAL_DATA_PROCESSING, count: 1, objectId: this.data.id})).list;
          if (personalDataProcessingDocuments.length) {
            this.personalDataProcessingDocument = personalDataProcessingDocuments[0];
          }
        } catch (e) {
        }

        try {
          const passportDocuments = (await this.participantRestApiService.getDocuments({clazz: FileClass.PERSON, count: 1, objectId: this.data.id, type: DocumentType.PASSPORT})).list;
          if (passportDocuments.length) {
            this.passportDocument = passportDocuments[0];
          }
        } catch (e) {
        }
      }

      this._initialPersonRanks = this.sportRankNgxGridComponent.items.slice();
      this._initialMedicalExaminations = this.medicalExaminationNgxGridComponent.items.slice();
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

        if (this.group) {
          if (selectedPerson) {
            groupTransition = (await this.participantRestApiService.enrollPersonsToGroup(new ListRequest([selectedPerson]), {}, {groupId: this.group.id}))[0].groupTransition;
          } else {
            const groupPersonTransition = await this.participantRestApiService.createAndEnrollToGroup(this.data, {}, {groupId: this.group.id});
            groupTransition = groupPersonTransition.groupTransition;
            this.appHelper.updateObject(this.data, groupPersonTransition.person);
          }
        } else {
          this.appHelper.updateObject(this.data, await this.participantRestApiService.createPerson(this.data));
        }
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.updatePerson(this.data, {}, {personId: this.data.id}));
      }

      if (this.group) {
        // TODO: Fix this expression because you can't empty array
        if (this.groupPersonPositions.length) {
          await this.participantRestApiService.updateGroupPersonPositions(new ListRequest(this.groupPersonPositions.map(x => x.position)), {}, {
            groupId: this.group.id,
            personId: this.data.id
          });
        }

        await this.participantRestApiService.updateGroupPersonStageType({id: this.selectedStageType ? this.selectedStageType.id : null}, {}, {
          groupId: this.group.id,
          personId: this.data.id
        });

        this.serviceAgreementDocument.objectId = (await this.getGroupPerson()).id;
        this.serviceAgreementDocument.date = this.appHelper.dateByFormat(this.serviceAgreementDocument.date, PropertyConstant.dateTimeServerFormat);
        await this.uploadOrUpdateFile(this.serviceAgreementDocument);
      }
      // this.document.objectId = groupTransition.id;
      // await this.attachFileComponent.updateFile();
      this.personalDataProcessingDocument.objectId = this.data.id;
      this.personalDataProcessingDocument.date = this.appHelper.dateByFormat(this.personalDataProcessingDocument.date, PropertyConstant.dateTimeServerFormat);
      await this.uploadOrUpdateFile(this.personalDataProcessingDocument);


      this.passportDocument.objectId = this.data.id;
      this.passportDocument.date = this.appHelper.dateByFormat(this.passportDocument.date, PropertyConstant.dateTimeServerFormat);
      await this.uploadOrUpdateFile(this.passportDocument);

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

  private async uploadOrUpdateFile<T extends BaseFile>(obj: T, file: File = null): Promise<T> {
    if (this.appHelper.isNewObject(obj)) {
      return (await this.participantRestApiService.uploadFile(obj, file));
    } else {
      return await this.participantRestApiService.updateFile(obj, file);
    }
  }

  public async navigateToPage(): Promise<void> {
    if (this.data && this.data.id) {
      await this._router.navigate(['/person', this.data.id]);
    }
  }

  public onEditGroupPersonPositions = async () => {
    const result = await this._editPersonService.showSelectionGroupPersonPositions(this.groupPersonPositions, {groupId: this.group.id, personId: this.data.id});
    if (result.result) {
      this.groupPersonPositions = result.data;
    }
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
    }, {componentFactoryResolver: this._editPersonService.componentFactoryResolver});

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
    }, {componentFactoryResolver: this._editPersonService.componentFactoryResolver});
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
    component.updateData();
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
