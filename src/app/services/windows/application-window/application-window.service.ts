import {ComponentFactoryResolver, forwardRef, Inject, Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {ModalBuilderService} from '../../../service/modal-builder/modal-builder.service';
import {ExternalResourceApiService} from '../../../data/remote/rest-api/api/external-resource/external-resource-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {UtilService} from '../../util/util.service';
import {DialogResult} from '../../../data/local/dialog-result';
import {ItemDetailComponent} from '../../../module/common/item-detail/item-detail/item-detail.component';
import {ImageField} from '../../../module/common/item-detail/model/image-field';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {ImageFormat} from '../../../data/local/image-format';
import {TextField} from '../../../module/common/item-detail/model/text-field';
import {UrlField} from '../../../module/common/item-detail/model/url-field';
import {ChipsField} from '../../../module/common/item-detail/model/chips-field';
import {CarouselField} from '../../../module/common/item-detail/model/carousel-field';
import {VideoField} from '../../../module/common/item-detail/model/video-field';
import {ApplicationApiService} from '../../../data/remote/rest-api/api/application/application-api.service';
import {Application} from '../../../data/remote/model/application/application';
import {EditApplicationComponent} from '../../../module/application/edit-application/edit-application/edit-application.component';
import {NgxSelectionConfig} from '../../../components/ngx-selection/model/ngx-selection-config';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {Device} from '../../../data/remote/model/device/device';
import {DeviceApiService} from '../../../data/remote/rest-api/api/device/device-api.service';
import {DeviceItemComponent} from '../../../module/device/device-item/device-item/device-item.component';

@Injectable()
export class ApplicationWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _modalBuilderService: ModalBuilderService,
              private _externalResourceApiService: ExternalResourceApiService,
              private _applicationApiService: ApplicationApiService,
              // TODO: DeviceApiService can't inject without forwardRef()
              @Inject(forwardRef(() => DeviceApiService))
              private _deviceApiService: DeviceApiService,
              private _appHelper: AppHelper,
              private _utilService: UtilService) {
  }

  public async openEditApplication<T extends Application>(application: T): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'application';
    let editApplicationComponent: EditApplicationComponent;
    await modal.componentInstance.initializeBody(EditApplicationComponent, async component => {
      editApplicationComponent = component;

      await component.initialize(this._utilService.clone(application));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});

    const dialogResult = new DialogResult<T>();
    dialogResult.result = await this._ngxModalService.awaitModalResult(modal);
    dialogResult.data = editApplicationComponent.data as T;
    return dialogResult;
  }

  public async openApplicationDetail(application: Application): Promise<void> {
    const model = this._ngxModalService.open();
    model.componentInstance.title = `${application.name}`;
    model.componentInstance.useContentPadding = false;
    await model.componentInstance.initializeBody(ItemDetailComponent, async component => {
      component.leftTopLeftFields = [
        new ImageField('', application, ImageType.LOGO, FileClass.APPLICATION, ImageFormat.CIRCLE)
      ];
      component.leftTopRightFields = [
        new TextField('shortName', application.shortName),
        new UrlField('manufacturer', application.manufacturerResource)
      ];
      component.leftFields = [
        new TextField('description', application.description),
        new ChipsField('parameters', application.parameterVersions.map(x => x.parameter.name))
      ];

      component.rightFields = [
        new CarouselField(application, FileClass.DEVICE, '')
      ];

      const externalResources = await this._externalResourceApiService.getExternalResources({clazz: FileClass.APPLICATION, objectId: application.id}).toPromise();
      if (externalResources.length && externalResources[0].url) {
        component.rightFields.push(new VideoField('', externalResources[0].url));
      }
    });
    await this._ngxModalService.awaitModalResult(model);
  }

  public async openEditDevices<T extends Device>(devices: T[], config: NgxSelectionConfig<T>): Promise<DialogResult<T[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(devices, async (query: PageQuery) => {
      return await this._deviceApiService.getDevices(query).toPromise();
    }, DeviceItemComponent, async (component, data) => {
      await component.initialize(data);
    }, config) as DialogResult<T[]>;
  }

}
