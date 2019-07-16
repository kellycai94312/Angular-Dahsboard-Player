import {Injectable} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgxModalComponent} from '../ngx-modal/ngx-modal.component';
import {NgxModalRef} from '../bean/ngx-modal-ref';
import {IBaseEditComponent} from '../../../data/local/component/base/ibase-edit-component';
import {SplitButtonItem} from '../../ngx-split-button/bean/split-button-item';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {NgxSelectionComponent} from '../../ngx-selection/ngx-selection/ngx-selection.component';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {PreviewNamedObjectComponent} from '../../named-object/preview-named-object/preview-named-object.component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {PermissionService} from '../../../shared/permission.service';
import {AppHelper} from '../../../utils/app-helper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Measure} from '../../../data/remote/model/measure';
import {HtmlContentComponent} from '../../html-content/html-content/html-content.component';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {environment} from '../../../../environments/environment';
import {Image} from '../../../data/remote/model/file/image/image';
import {SportType} from '../../../data/remote/model/sport-type';
import {SportRole} from '../../../data/remote/model/sport-role';
import {QueryParams} from '../../../data/remote/rest-api/query-params';
import {Group} from '../../../data/remote/model/group/base/group';
import {GroupQuery} from '../../../data/remote/rest-api/query/group-query';
import {TranslateService} from '@ngx-translate/core';
import {ChangeWatcher} from '../../../data/local/util/change-watcher';
import {UserRole} from '../../../data/remote/model/user-role';
import {Person} from '../../../data/remote/model/person';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {OrganizationTrainer} from '../../../data/remote/model/group/organization-trainer';

@Injectable()
export class NgxModalService {

  constructor(private _ngbModal: NgbModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService,
              private _translateService: TranslateService) {
  }

  public open(options: NgbModalOptions = {size: 'lg', backdrop: 'static', centered: true}): NgxModalRef {
    return this._ngbModal.open(NgxModalComponent, options);
  }

  public async awaitModalResult(modal: NgxModalRef): Promise<boolean> {
    let loadResolve: (val: boolean) => void;
    const result = new Promise<boolean>(resolve => {
      loadResolve = resolve;
    });
    modal.result.then(async x => {
      loadResolve(true);
    }, async reason => {
      loadResolve(false);
    });
    return await result;
  }

  public async save(ngxModalRef: NgxModalRef, component: IBaseEditComponent, closeIfSuccess: boolean = true): Promise<boolean> {
    const isSaved = await component.onSave();
    if (isSaved && closeIfSuccess) {
      ngxModalRef.close();
    }
    return isSaved;
  }

  public async remove<T>(ngxModalRef: NgxModalRef, component: IBaseEditComponent, closeIfSuccess: boolean = true): Promise<boolean> {
    const isRemoved = await component.onRemove();
    if (isRemoved && closeIfSuccess) {
      ngxModalRef.close();
    }
    return isRemoved;
  }

  public saveSplitItemButton(callback: () => Promise<void>): SplitButtonItem {
    return {
      default: true,
      nameKey: 'save',
      callback: callback
    };
  }

  public removeSplitItemButton(callback: () => Promise<void>, visible: () => boolean = null): SplitButtonItem {
    return {
      nameKey: 'remove',
      callback: callback,
      visible: visible
    };
  }

  public async showMeasures(measures: Measure[], apply: (selectedItems: Measure[]) => Promise<void>) {
    const modal = this.open();
    modal.componentInstance.titleKey = 'selection';
    await modal.componentInstance.initializeBody(NgxSelectionComponent, async component => {
      const fetchItems = async (query: PageQuery): Promise<PageContainer<Measure>> => {
        return await this._participantRestApiService.getMeasures(query);
      };

      const initializeComponent = async (componentItem: PreviewNamedObjectComponent<Measure>, data: Measure) => {
        componentItem.data = data;
        componentItem.name = `${data.measureParameter.name} (${data.measureUnit.shortName})`;
      };

      await component.initialize(PreviewNamedObjectComponent, initializeComponent, fetchItems, this._appHelper.cloneObject(measures));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            await apply(component.selectedItems);
            modal.close();
          }
        }
      ];
    });
  }

  public async showSelectionPersonsModal(personQuery: PersonQuery, apply: (selectedItems: Person[]) => Promise<void>) {
    await this.showSelectionNameObjectsModal<Person>(async (query: PersonQuery) => {
        return await this._participantRestApiService.getPersons(this._appHelper.updatePageQuery(query, personQuery));
      },
      data => {
        let personFullName = `${data.lastName} ${data.firstName}`;
        if (data.patronymic) {
          personFullName += ` ${data.patronymic}`;
        }
        return personFullName;
      },
      [], apply, 1);
  }

  public async showSelectionOrganizationTrainersModal<T extends OrganizationTrainer>(group: Group, selectedItems: T[], apply: (selectedItems: T[]) => Promise<void>) {
    await this.showSelectionNameObjectsModal(async query => {
        const items = await this._participantRestApiService.getOrganizationTrainers(query, {unassigned: true}, {groupId: group.id});
        return this._appHelper.arrayToPageContainer(items);
      },
      data => {
        const person = data.groupPerson.person;
        return `${person.firstName} ${person.lastName}`;
      },
      selectedItems, apply);
  }


  public async showSelectionGroupsModal<T extends Group>(selectedItems: T[],
                                                         apply: (selectedItems: T[]) => Promise<void>,
                                                         groupQuery: GroupQuery = null) {
    await this.showSelectionNameObjectsModal(async (query: GroupQuery) => {
        return await this._participantRestApiService.getGroups(this._appHelper.updatePageQuery(query, groupQuery));
      },
      data => {
        return data.name;
      },
      selectedItems, apply);
  }

  public async showSelectionSportTypesModal<T extends SportType>(selectedItems: T[], apply: (selectedItems: T[]) => Promise<void>) {
    await this.showSelectionNameObjectsModal(async query => {
        return await this._participantRestApiService.getSportTypes(query);
      },
      data => {
        return data.name;
      },
      selectedItems, apply);
  }

  public async showSelectionSportRolesModal<T extends SportRole>(sportTypeId: number, selectedItems: T[], apply: (selectedItems: T[]) => Promise<void>) {
    await this.showSelectionNameObjectsModal(async (query: QueryParams) => {
        query.id = sportTypeId;
        const items = await this._participantRestApiService.getSportRolesBySportType(query);
        return this._appHelper.arrayToPageContainer(items);
      },
      data => {
        return `${data.name} (${data.shortName})`;
      },
      selectedItems, apply);
  }

  public async showSelectionUserRolesModal<T extends UserRole>(selectedItems: T[], apply: (selectedItems: T[]) => Promise<void>) {
    await this.showSelectionNameObjectsModal(async query => {
        const items = await this._participantRestApiService.getUserRoles();
        return this._appHelper.arrayToPageContainer(items);
      },
      data => {
        return data.name;
      },
      selectedItems, apply);
  }

  public async showSelectionNameObjectsModal<T>(fetchItems: <Q extends PageQuery>(query: Q) => Promise<PageContainer<T>>,
                                                displayName: (data: T) => string,
                                                selectedItems: T[],
                                                apply: (selectedItems: T[]) => Promise<void>, maxCount: number = null, compare: (first: T, second: T) => boolean = null): Promise<boolean> {
    const modal = this.open();
    modal.componentInstance.titleKey = 'selection';
    await modal.componentInstance.initializeBody(NgxSelectionComponent, async component => {
      component.maxCount = maxCount;
      if (compare) {
        component.compare = compare;
      }
      const initializeComponent = async (componentItem: PreviewNamedObjectComponent<T>, data: T) => {
        componentItem.data = data;
        componentItem.name = displayName(data);
      };
      await component.initialize(PreviewNamedObjectComponent, initializeComponent, fetchItems, this._appHelper.cloneObject(selectedItems));
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            await apply(component.selectedItems);
            modal.close();
          }
        }
      ];
    });
    return await this.awaitModalResult(modal);
  }

  public async showFullImage(objectId: number, imageType: ImageType, fileClass: FileClass);
  public async showFullImage(image: Image);
  public async showFullImage(objectIdOrImage: number | Image, imageType?: ImageType, fileClass?: FileClass) {
    const modal = this.open({size: 'lg', backdrop: true, centered: true});
    modal.componentInstance.titleKey = 'image';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      let url = `${environment.restUrl}/file/download/image`;
      if (typeof objectIdOrImage !== 'number') {
        url += `/${objectIdOrImage.id}?date=${Date.now() * Math.random()}`;
      } else {
        url += `?clazz=${fileClass}&objectId=${objectIdOrImage}&type=${imageType}&date=${Date.now() * Math.random()}`;
      }
      component.html = `<div class="text-center"><img class="img-fluid" src="${url}"/></div>`;
    });
  }

  public async showUnsavedDialogModal(): Promise<boolean> {
    const modal = this.open();
    modal.componentInstance.titleKey = 'attention';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      component.html = await this._translateService.get('unsavedChangesOnThisPageQuestion').toPromise();

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'discard',
          callback: async () => {
            modal.close();
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
    return await this.awaitModalResult(modal);
  }

  public async showMatchWasFoundDialogModal(): Promise<boolean> {
    const modal = this.open();
    modal.componentInstance.titleKey = 'attention';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      component.html = await this._translateService.get('matchWasFoundQuestion').toPromise();

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'chooseExisting',
          callback: async () => {
            modal.close();
          }
        },
        {
          nameKey: 'createNew',
          callback: async () => {
            modal.dismiss();
          }
        }
      ];
    });
    return await this.awaitModalResult(modal);
  }

  public async showCanDeactivateModal(changeWatcher: ChangeWatcher): Promise<boolean> {
    if (changeWatcher.hasChanges()) {
      if (await this.showUnsavedDialogModal()) {
        changeWatcher.reset();
      } else {
        return false;
      }
    }
    return true;
  }

}
