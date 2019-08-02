import {Component, forwardRef, Inject, Input, OnDestroy} from '@angular/core';
import {Person} from '../../../../data/remote/model/person';
import {Group} from '../../../../data/remote/model/group/base/group';
import {NgxDate} from '../../../ngx/ngx-date/model/ngx-date';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {Document} from '../../../../data/remote/model/file/document/document';
import {DocumentType} from '../../../../data/remote/model/file/document/document-type';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {ValidationService} from '../../../../service/validation/validation.service';
import {FileApiService} from '../../../../data/remote/rest-api/api/file/file-api.service';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {EMPTY, from, merge, NEVER, Observable, of} from 'rxjs';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {UtilService} from '../../../../services/util/util.service';
import {User} from '../../../../data/remote/model/user';
import {ModalBuilderService} from '../../../../service/modal-builder/modal-builder.service';
import {PreviewNamedObjectComponent} from '../../../../components/named-object/preview-named-object/preview-named-object.component';
import {Position} from '../../../../data/remote/model/person-position/position';
import {GroupPersonPositionQuery} from '../../../../data/remote/rest-api/query/group-person-position-query';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {UserRole} from '../../../../data/remote/model/user-role';
import {filter, flatMap, map, takeWhile} from 'rxjs/operators';
import {ContactPhone} from '../../../../data/remote/model/contact/contact-phone';
import {ContactType} from '../../../../data/remote/model/contact/base/contact-type';
import {ContactPrivacyEnum} from '../../../../data/remote/model/contact/base/contact-privacy-enum';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnDestroy {

  @Input()
  public person: Person;

  @Input()
  public group: Group;

  public readonly formGroup = new FormGroup({});
  public readonly documentFormGroup = new FormGroup({});
  public readonly personalDataProcessingDocumentFormGroup = new FormGroup({});
  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;
  public emailForActivationNgxInput: NgxInput;
  public contactPhoneNumberNgxInput: NgxInput;

  public personalDataProcessingNumberNgxInput: NgxInput;
  public personalDataProcessingDateNgxDate: NgxDate;

  public documentTypeNgxSelect: NgxSelect;
  public documentSeriesNgxInput: NgxInput;
  public documentNumberNgxInput: NgxInput;
  public documentDateNgxInput: NgxDate;
  public documentIssuedByNgxInput: NgxInput;

  public groupPerson: GroupPerson;
  public positions: Position[] = [];

  private _personalDataProcessingDocument: Document;
  private _document: Document;
  private _contactPhone = new ContactPhone();
  private _notDestroyed = true;

  constructor(private _translateObjectService: TranslateObjectService,
              // TODO: TemplateModalService can't inject without forwardRef()
              @Inject(forwardRef(() => TemplateModalService))
              private _templateModalService: TemplateModalService,
              private _personApiService: PersonApiService,
              private _appHelper: AppHelper,
              private _utilService: UtilService,
              private _modalBuilderService: ModalBuilderService,
              private _validationService: ValidationService,
              private _participantRestApiService: ParticipantRestApiService,
              private _fileApiService: FileApiService) {
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public async initialize(person: Person, group?: Group): Promise<void> {
    person.user = person.user || new User();

    this.person = person;
    this.group = group;

    this.firstNgxInput = this._getNgxInput('firstName', person.firstName, true);
    this.lastNgxInput = this._getNgxInput('lastName', person.lastName, true);
    this.patronymicNgxInput = this._getNgxInput('patronymic', person.patronymic);

    this.birthDateNgxDate = new NgxDate();
    this.birthDateNgxDate.placeholderTranslation = 'birthDate';
    this.birthDateNgxDate.format = PropertyConstant.dateFormat;
    this.birthDateNgxDate.required = true;
    this.birthDateNgxDate.min = this._validationService.getBirthDateMin();
    this.birthDateNgxDate.max = this._validationService.getBirthDateMax();
    this.birthDateNgxDate.control = new FormControl('', [Validators.required]);
    this.birthDateNgxDate.control.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        filter(value => value)
      )
      .subscribe(async (value) => {
        this.person.birthDate = this._appHelper.dateByFormat(value, PropertyConstant.dateTimeServerFormat);
        await this.initializeDocument(this.person);
      });
    this.birthDateNgxDate.control.setValue(person.birthDate);

    this.sexNgxSelect = new NgxSelect();
    this.sexNgxSelect.labelTranslation = 'sex';
    this.sexNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.sexNgxSelect.required = true;
    this.sexNgxSelect.display = 'name';
    this.sexNgxSelect.control.setValidators(Validators.required);
    this.sexNgxSelect.control.setValue(this.sexNgxSelect.items.find(x => x.data === person.sex));

    this.emailForActivationNgxInput = this._getNgxInput('emailForActivation', person.user.email);
    this.emailForActivationNgxInput.control.setValidators(ValidationService.emailValidator);

    this.contactPhoneNumberNgxInput = this._getNgxInput('contactPhoneNumber', '');

    if (!this._appHelper.isNewObject(person)) {
      this._contactPhone = (await this._personApiService.getContacts(person).toPromise()).find(x => x.discriminator === ContactType.PHONE) || new ContactPhone();
      this.contactPhoneNumberNgxInput.control.setValue(this._contactPhone.value);
    }
    this._contactPhone.contactPrivacyEnum = this._contactPhone.contactPrivacyEnum || ContactPrivacyEnum.GROUP_MANAGEMENT;

    this.formGroup.setControl('firstName', this.firstNgxInput.control);
    this.formGroup.setControl('lastName', this.lastNgxInput.control);
    this.formGroup.setControl('patronymic', this.patronymicNgxInput.control);
    this.formGroup.setControl('birthDate', this.birthDateNgxDate.control);
    this.formGroup.setControl('sex', this.sexNgxSelect.control);

    if (group && !this._appHelper.isNewObject(person)) {
      this.groupPerson = await this._participantRestApiService.getGroupPerson({groupId: group.id, personId: person.id});
      this.positions = (await this._participantRestApiService.getGroupPersonPositions({}, {unassigned: false}, {
        groupId: group.id,
        personId: person.id
      })).list.map(x => x.position);
    }
    await this.initializePersonalDataProcessingDocument();
  }

  private async initializePersonalDataProcessingDocument(): Promise<void> {
    this._personalDataProcessingDocument = new Document();
    this._personalDataProcessingDocument.clazz = FileClass.PERSONAL_DATA_PROCESSING;
    this._personalDataProcessingDocument.type = DocumentType.ORDER;
    if (!this._appHelper.isNewObject(this.person)) {
      try {
        const documentPageContainer = await this._fileApiService
          .getDocuments(
            {
              clazz: this._personalDataProcessingDocument.clazz,
              count: 1,
              objectId: this.person.id,
              type: this._personalDataProcessingDocument.type
            })
          .toPromise();
        if (documentPageContainer.list.length) {
          this._personalDataProcessingDocument = documentPageContainer.list[0];
        }
      } catch (e) {
      }
    }
    this.personalDataProcessingNumberNgxInput = this._getNgxInput('number', (this._personalDataProcessingDocument.number || '') as string, true);

    this.personalDataProcessingDateNgxDate = new NgxDate();
    this.personalDataProcessingDateNgxDate.placeholderTranslation = 'date';
    this.personalDataProcessingDateNgxDate.format = PropertyConstant.dateFormat;
    this.personalDataProcessingDateNgxDate.required = true;
    this.personalDataProcessingDateNgxDate.control = new FormControl(this._personalDataProcessingDocument.date, [Validators.required]);

    this.personalDataProcessingDocumentFormGroup.setControl('number', this.personalDataProcessingNumberNgxInput.control);
    this.personalDataProcessingDocumentFormGroup.setControl('date', this.personalDataProcessingDateNgxDate.control);
  }

  private async initializeDocument(person: Person) {
    const age = this._utilService.getAge(new Date(this.person.birthDate));

    this._document = new Document();
    this._document.type = age >= 14 ? DocumentType.PASSPORT : DocumentType.BIRTH_CERTIFICATE;
    this._document.clazz = FileClass.PERSON;
    if (!this._appHelper.isNewObject(person)) {
      try {
        const documentPageContainer = await this._fileApiService
          .getDocuments(
            {
              clazz: this._document.clazz,
              count: 1,
              objectId: person.id,
              type: this._document.type
            })
          .toPromise();
        if (documentPageContainer.list.length) {
          this._document = documentPageContainer.list[0];
        }
      } catch (e) {
      }
    }

    this.documentTypeNgxSelect = new NgxSelect();
    this.documentTypeNgxSelect.labelTranslation = 'documentType';
    this.documentTypeNgxSelect.items = (await this._translateObjectService
      .getTranslatedEnumCollection<DocumentType>(DocumentType, 'DocumentTypeEnum'))
      .filter(value => value.data === this._document.type);
    this.documentTypeNgxSelect.required = true;
    this.documentTypeNgxSelect.display = 'name';
    this.documentTypeNgxSelect.control.setValidators(Validators.required);
    this.documentTypeNgxSelect.control.setValue(this.documentTypeNgxSelect.items.find(x => x.data === this._document.type));
    this.documentTypeNgxSelect.control.disable();

    this.documentSeriesNgxInput = this._getNgxInput('series', (this._document.series || '') as string, true);
    this.documentNumberNgxInput = this._getNgxInput('number', (this._document.number || '') as string, true);

    this.documentDateNgxInput = new NgxDate();
    this.documentDateNgxInput.placeholderTranslation = 'date';
    this.documentDateNgxInput.format = PropertyConstant.dateFormat;
    this.documentDateNgxInput.required = true;
    this.documentDateNgxInput.control = new FormControl(this._document.date, [Validators.required]);

    this.documentIssuedByNgxInput = this._getNgxInput('issuedBy', this._document.issuedBy, true);
    this.documentIssuedByNgxInput.type = NgxInputType.TEXTAREA;

    this.documentFormGroup.setControl('documentType', this.documentTypeNgxSelect.control);
    this.documentFormGroup.setControl('documentSeries', this.documentSeriesNgxInput.control);
    this.documentFormGroup.setControl('documentNumber', this.documentNumberNgxInput.control);
    this.documentFormGroup.setControl('documentDate', this.documentDateNgxInput.control);
    this.documentFormGroup.setControl('documentIssuedBy', this.documentIssuedByNgxInput.control);
  }

  public onSave(): Observable<boolean> {
    this._document.type = this.documentTypeNgxSelect.control.value.data;
    this._document.series = this.documentSeriesNgxInput.control.value;
    this._document.number = this.documentNumberNgxInput.control.value;
    this._document.date = this._appHelper.getGmtDate(this.documentDateNgxInput.control.value);
    this._document.issuedBy = this.documentIssuedByNgxInput.control.value;
    this._contactPhone.value = this.contactPhoneNumberNgxInput.control.value;

    const addOrUpdateDocument = !!(this._document.id || this.documentSeriesNgxInput.control.value || this.documentNumberNgxInput.control.value || this.documentDateNgxInput.control.value || this.documentIssuedByNgxInput.control.value);
    const addOrUpdatePersonalDataProcessingDocument: boolean = this._personalDataProcessingDocument.id || this.personalDataProcessingNumberNgxInput.control.value || this.personalDataProcessingDateNgxDate.control.value;

    this.personalDataProcessingDocumentFormGroup.updateValueAndValidity();
    if (addOrUpdatePersonalDataProcessingDocument && this.personalDataProcessingDocumentFormGroup.invalid) {
      const dialog$ = from(this._templateModalService.showQuestionModal('documentDataIsIncorrect', modal => {
        return [{nameKey: 'apply', callback: async () => modal.close(true)}];
      }));
      dialog$.subscribe();
      return;
    }

    return of(addOrUpdateDocument)
      .pipe(
        flatMap(value => {
          if (value) {
            this.documentFormGroup.updateValueAndValidity();
            if (this.documentFormGroup.valid) {
              return this._fileApiService.getDocumentAvailable(this._document, this._document.series, this._document.number, this._document.type as any).pipe(map(value1 => value1.value));
            } else {
              const dialog = this._templateModalService.showQuestionModal('documentDataIsIncorrect', modal => {
                return [{
                  nameKey: 'apply',
                  callback: async () => {
                    modal.close(true);
                  }
                }];
              });
              return from(dialog).pipe(flatMap(() => NEVER));
            }
          }
          return of(true);
        }),
        flatMap(value => {
          if (value) {
            this.person.firstName = this.firstNgxInput.control.value;
            this.person.lastName = this.lastNgxInput.control.value;
            this.person.patronymic = this.patronymicNgxInput.control.value;
            this.person.birthDate = this._appHelper.dateByFormat(this.birthDateNgxDate.control.value, PropertyConstant.dateTimeServerFormat);
            this.person.sex = this.sexNgxSelect.control.value.data;
            this.person.user.email = this.emailForActivationNgxInput.control.value;
            // TODO: Save contact phone number contactPhoneNumberNgxInput

            if (this._appHelper.isNewObject(this.person)) {
              return this._createPerson(this.person, this.positions);
            }
            return this._personApiService.updatePerson(this.person)
              .pipe(
                flatMap(person => {
                  return from(this._participantRestApiService.updateGroupPersonPositions(new ListRequest(this.positions), {}, {
                    groupId: this.group.id,
                    personId: this.person.id
                  }))
                    .pipe(map(() => person));
                })
              );
          } else {
            const dialog = this._templateModalService.showQuestionModal('documentDataIsNotUnique', modal => {
              return [{
                nameKey: 'apply',
                callback: async () => {
                  modal.close(true);
                }
              }];
            });
            return from(dialog).pipe(flatMap(() => NEVER));
          }
        }),
        flatMap(person => this._personApiService.updateContacts(person, [this._contactPhone]).pipe(map(() => person))),
        flatMap(person => {
          if (person) {
            this.person = person;

            let personalDataProcessingDocument$ = of(void 0);
            if (addOrUpdatePersonalDataProcessingDocument) {
              this._personalDataProcessingDocument.objectId = person.id;
              this._personalDataProcessingDocument.number = this.personalDataProcessingNumberNgxInput.control.value;
              this._personalDataProcessingDocument.date = this._appHelper.getGmtDate(this.personalDataProcessingDateNgxDate.control.value);

              personalDataProcessingDocument$ = this._fileApiService.saveFile(this._personalDataProcessingDocument);
            }

            let document$ = of(void 0);
            if (addOrUpdateDocument) {
              this._document.objectId = person.id;
              document$ = this._fileApiService.saveFile(this._document);
            }
            return merge(personalDataProcessingDocument$, document$);
          }
          return EMPTY;
        }),
        flatMap(value => {
          return of(true);
        })
      );
  }

  private _createPerson(person1: Person, positions: Position[]): Observable<Person> {
    return this._personApiService.createPerson(person1)
      .pipe(flatMap(value => {
        let athleteUserRole: UserRole;
        positions.forEach(position => {
          const athletePosition = position.positionUserRoles.find(x => x.userRole.userRoleEnum === UserRoleEnum.ATHLETE);
          if (athletePosition) {
            athleteUserRole = athletePosition.userRole;
          }
        });

        let updateUserRole$: Observable<any> = of(void 0);
        if (athleteUserRole) {
          updateUserRole$ = from(this._participantRestApiService.updateUserUserRoles({list: [athleteUserRole]}, {}, {userId: value.user.id}));
        }
        return updateUserRole$
          .pipe(
            flatMap(() => from(this._participantRestApiService.enrollPerson({personId: value.id, positionIds: this.positions.map(x => x.id)}, {}, {groupId: this.group.id}))),
            map(() => value)
          );
      }));
  }

  public async onEditGroupPersonPositions(): Promise<void> {
    const result = await this._modalBuilderService.showSelectionItemsModal(this.positions, async (query: GroupPersonPositionQuery) => {
        return await this._participantRestApiService.getGroupVacancies({}, query, {groupId: this.group.id});
      }, PreviewNamedObjectComponent,
      async (component, data) => {
        component.data = data;
      },
      {
        minCount: 1,
        compare: (first, second) => {
          return first.id == second.id;
        }
      });
    if (result.result) {
      this.positions = result.data;
    }
  }

  public onRemovePosition(value: Position): void {
    this.positions.splice(this.positions.indexOf(value), 1);
  }

  private _getNgxInput(labelTranslation: string, value: string, required = false): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = required;
    ngxInput.control.setValue(value);
    if (required) {
      ngxInput.control.setValidators(Validators.required);
    }
    return ngxInput;
  }

}
