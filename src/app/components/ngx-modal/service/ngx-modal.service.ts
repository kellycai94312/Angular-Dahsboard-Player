import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap/modal/modal';
import {NgxModalComponent} from '../ngx-modal/ngx-modal.component';
import {NgxModalRef} from '../bean/ngx-modal-ref';
import {IBaseEditComponent} from '../../../data/local/component/base/ibase-edit-component';
import {SplitButtonItem} from '../../ngx-split-button/bean/split-button-item';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {Tag} from '../../../data/remote/model/tag';
import {NgxSelectionComponent} from '../../ngx-selection/ngx-selection/ngx-selection.component';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {NgxEditableItemComponent} from '../../ngx-editable-item/ngx-editable-item/ngx-editable-item.component';
import {DictionaryType} from '../../../data/remote/misc/dictionary-type';
import {PreviewNamedObjectComponent} from '../../named-object/preview-named-object/preview-named-object.component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {EditTagComponent} from '../../../pages/dictionary/component/edit-tag/edit-tag.component';
import {PermissionService} from '../../../shared/permission.service';
import {AppHelper} from '../../../utils/app-helper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Measure} from '../../../data/remote/model/measure';
import {HtmlContentComponent} from '../../html-content/html-content/html-content.component';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {environment} from '../../../../environments/environment';
import {Image} from '../../../data/remote/model/file/image/image';

@Injectable()
export class NgxModalService {

  constructor(private _ngbModal: NgbModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
  }

  public open(options: NgbModalOptions = {size: 'lg', backdrop: 'static', centered: true}): NgxModalRef {
    return this._ngbModal.open(NgxModalComponent, options);
  }

  public async save(ngxModalRef: NgxModalRef, component: IBaseEditComponent, closeIfSuccess: boolean = true): Promise<boolean> {
    const isSaved = await component.onSave();
    if (isSaved && closeIfSuccess) {
      ngxModalRef.dismiss();
    }
    return isSaved;
  }

  public async remove<T>(ngxModalRef: NgxModalRef, component: IBaseEditComponent, closeIfSuccess: boolean = true): Promise<boolean> {
    const isRemoved = await component.onRemove();
    if (isRemoved && closeIfSuccess) {
      ngxModalRef.dismiss();
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

  public removeSplitItemButton(callback: () => Promise<void>): SplitButtonItem {
    return {
      nameKey: 'remove',
      callback: callback
    };
  }

  public async showModalTag(tags: Tag[], apply: (selectedItems: Tag[], tagFilter: string) => Promise<void>) {
    const modal = this.open();
    modal.componentInstance.titleKey = 'selection';
    await modal.componentInstance.initializeBody(NgxSelectionComponent, async component => {
      const fetchItems = async (query: PageQuery): Promise<PageContainer<Tag>> => {
        return await this._participantRestApiService.getTags(query);
      };

      const initializeComponent = async (componentItem: PreviewNamedObjectComponent<Tag>, data: any) => {
        componentItem.data = data;
      };

      const initializeEditComponent = async (componentItem: NgxEditableItemComponent<PreviewNamedObjectComponent<Tag>, Tag>, data: any) => {
        componentItem.edit = async (editComponent: PreviewNamedObjectComponent<Tag>): Promise<void> => {
          await this.showModalEditTag(editComponent.data, component.ngxVirtualScrollComponent.items, component.selectedItems);
        };
        componentItem.afterInitialize = async (component1) => {
          componentItem.canEdit = await this._permissionService.canEditTag(componentItem.ngxComponentFactoryComponent.component.data, await this._authorizationService.getPerson());
        };
        await componentItem.initialize(PreviewNamedObjectComponent, data, initializeComponent);
      };
      component.add = async () => {
        const tag = new Tag();
        tag.dictionaryType = DictionaryType.USER;
        await this.showModalEditTag(tag, component.ngxVirtualScrollComponent.items);
      };

      await component.initialize(NgxEditableItemComponent, initializeEditComponent, fetchItems, this._appHelper.cloneObject(tags));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            let tagFilter = '';
            for (const item of component.selectedItems) {
              tagFilter += `${item.id}_`;
            }
            await apply(component.selectedItems, tagFilter);
            modal.dismiss();
          }
        }
      ];
    });
  }

  private async showModalEditTag(data: Tag, items: Tag[], selectedItems?: Tag[]) {
    const editModal = this.open();
    editModal.componentInstance.titleKey = 'edit';
    await editModal.componentInstance.initializeBody(EditTagComponent, async component1 => {
      component1.manualInitialization = true;
      await component1.initialize(this._appHelper.cloneObject(data));

      editModal.componentInstance.splitButtonItems = [
        this.saveSplitItemButton(async () => {
          if (await this.save(editModal, component1)) {
            const isNew = this._appHelper.isNewObject(data);
            Object.assign(data, component1.data);

            if (isNew) {
              items.push(data);
            }
          }
        })
      ];

      if (!this._appHelper.isNewObject(data) && items && selectedItems) {
        editModal.componentInstance.splitButtonItems.push(this.removeSplitItemButton(async () => {
          if (await this.remove(editModal, component1)) {
            let itemForRemove = selectedItems.find(x => x.id == component1.data.id);
            if (itemForRemove) {
              this._appHelper.removeItem(selectedItems, itemForRemove);
            } else {
              itemForRemove = items.find(x => x.id == component1.data.id);
              if (itemForRemove) {
                this._appHelper.removeItem(items, itemForRemove);
              }
            }
          }
        }));
      }
    });
  }

  public async showMeasures(measure: Measure[], apply: (selectedItems: Measure[]) => Promise<void>) {
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

      await component.initialize(PreviewNamedObjectComponent, initializeComponent, fetchItems, this._appHelper.cloneObject(measure));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            await apply(component.selectedItems);
            modal.dismiss();
          }
        }
      ];
    });
  }

  public async showFullImage(objectId: number, imageType: ImageType, fileClass: FileClass);
  public async showFullImage(image: Image);
  public async showFullImage(objectIdOrImage: number | Image, imageType?: ImageType, fileClass?: FileClass) {
    const modal = this.open({size: 'lg', backdrop: true, centered: true});
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      let url = `${environment.restUrl}/file/download/image`;
      if (typeof objectIdOrImage !== 'number') {
        url += `/${objectIdOrImage.id}?date=${Date.now() * Math.random()}`;
      } else {
        url += `?clazz=${fileClass}&objectId=${objectIdOrImage}&type=${imageType}&date=${Date.now() * Math.random()}`;
      }
      component.html = `<div class="text-center overflow-content"><img src="${url}"/></div>`;
    });
  }

}
