import {Component, ComponentFactoryResolver, forwardRef, Inject, OnInit, ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Validators} from '@angular/forms';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {Device} from '../../../../data/remote/model/device/device';
import {DeviceApiService} from '../../../../data/remote/rest-api/api/device/device-api.service';
import {ParameterVersion} from '../../../../data/remote/model/parameter/parameter-version';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ExternalResourceApiService} from '../../../../data/remote/rest-api/api/external-resource/external-resource-api.service';
import {ExternalResource} from '../../../../data/remote/model/external-resource';
import {MediaLibraryComponent} from '../../../library/media-library/media-library/media-library.component';
import {ApplicationVersion} from '../../../../data/remote/model/application/application-version';
import {DeviceWindowService} from '../../../../services/windows/device-window/device-window.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent extends BaseEditComponent<Device> implements OnInit {

  @ViewChild(MediaLibraryComponent)
  public mediaLibraryComponent: MediaLibraryComponent;

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly nameNgxInput = new NgxInput();
  public readonly shortNameNgxInput = new NgxInput();
  public readonly descriptionNgxInput = new NgxInput();
  public readonly manufacturerUrlNgxInput = new NgxInput();
  public readonly videoUrlNgxInput = new NgxInput();
  private _urlExternalResource: ExternalResource;

  constructor(private _deviceApiService: DeviceApiService,
              // TODO: DeviceWindowService can't inject without forwardRef()
              @Inject(forwardRef(() => DeviceWindowService))
              private _deviceWindowService: DeviceWindowService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _externalResourceApiService: ExternalResourceApiService,
              private _parameterWindowService: ParameterWindowService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: Device): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.nameNgxInput.labelTranslation = 'name';
        this.nameNgxInput.required = true;
        this.nameNgxInput.control.setValue(data.name);
        this.nameNgxInput.control.setValidators(Validators.required);

        this.shortNameNgxInput.labelTranslation = 'shortName';
        this.shortNameNgxInput.required = true;
        this.shortNameNgxInput.control.setValue(data.shortName);
        this.shortNameNgxInput.control.setValidators(Validators.required);

        this.descriptionNgxInput.labelTranslation = 'description';
        this.descriptionNgxInput.type = NgxInputType.TEXTAREA;
        this.descriptionNgxInput.control.setValue(data.description);

        this.manufacturerUrlNgxInput.labelTranslation = 'manufacturerUrl';
        this.manufacturerUrlNgxInput.control.setValue(data.manufacturerResource);

        this.videoUrlNgxInput.labelTranslation = 'videoUrl';

        if (!this.isNew) {
          const externalResources = await this._externalResourceApiService.getExternalResources({clazz: FileClass.DEVICE, objectId: data.id}).toPromise();
          if (externalResources.length) {
            this._urlExternalResource = externalResources[0];
            this.videoUrlNgxInput.control.setValue(this._urlExternalResource.url);
          }
        }

        this.data.parameterVersions = this.data.parameterVersions || [];
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._deviceApiService.removeDevice(this.data).toPromise();
    });
  }

  async onSave(): Promise<boolean> {
    this.data.name = this.nameNgxInput.control.value;
    this.data.shortName = this.shortNameNgxInput.control.value;
    this.data.description = this.descriptionNgxInput.control.value;
    this.data.manufacturerResource = this.manufacturerUrlNgxInput.control.value;

    return await this.appHelper.trySave(async () => {
      const data = await this._deviceApiService.saveDevice(this.data).toPromise();
      const parameterVersions = await this._deviceApiService.updateDeviceParameters(data, new ListRequest<IdRequest>(this.data.parameterVersions.map(x => new IdRequest(x.id)))).toPromise();
      const applicationVersions = await this._deviceApiService.updateDeviceApplications(data, new ListRequest<IdRequest>(this.data.applicationVersions.map(x => new IdRequest(x.id)))).toPromise();

      this.data = data;
      this.data.parameterVersions = parameterVersions;
      this.data.applicationVersions = applicationVersions;

      if (this._urlExternalResource && !this.videoUrlNgxInput.control.value) {
        await this._externalResourceApiService.removeExternalResource(this._urlExternalResource).toPromise();
      } else if (this.videoUrlNgxInput.control.value) {
        if (!this._urlExternalResource) {
          this._urlExternalResource = new ExternalResource();
          this._urlExternalResource.objectId = this.data.id;
          this._urlExternalResource.clazz = FileClass.DEVICE;
        }
        this._urlExternalResource.url = this.videoUrlNgxInput.control.value;

        await this._externalResourceApiService.saveExternalResource(this._urlExternalResource).toPromise();
      }

      this.mediaLibraryComponent.ngxImageComponent.object = this.data;
      await this.mediaLibraryComponent.ngxImageComponent.save(null, false);
    });
  }

  public async onEditParameters(): Promise<void> {
    const dialogResult = await this._parameterWindowService.openEditParameters(this.data.parameterVersions.map(x => x.parameter), {
      componentFactoryResolver: this._componentFactoryResolver,
      compare: (first, second) => first.id == second.id
    });
    if (dialogResult.result) {
      this.data.parameterVersions = dialogResult.data.map(x => {
        const parameterVersion = new ParameterVersion();
        Object.assign(parameterVersion, x);
        parameterVersion.parameter = x;
        parameterVersion.id = x.parameterVersionId;
        return parameterVersion;
      });
    }
  }

  public onRemoveParameter(item: ParameterVersion): void {
    const indexItem = this.data.parameterVersions.findIndex(x => x.parameter.id == item.parameter.id);
    if (indexItem > -1) {
      this.data.parameterVersions.splice(indexItem, 1);
    }
  }

  public async onEditApplications(): Promise<void> {
    const dialogResult = await this._deviceWindowService.openEditApplications(this.data.applicationVersions.map(x => x.application), {
      componentFactoryResolver: this._componentFactoryResolver,
      compare: (first, second) => first.id == second.id
    });
    if (dialogResult.result) {
      this.data.applicationVersions = dialogResult.data.map(x => {
        const applicationVersion = new ApplicationVersion();
        Object.assign(applicationVersion, x);
        applicationVersion.application = x;
        applicationVersion.id = x.applicationVersionId;
        return applicationVersion;
      });
    }
  }

  public onRemoveApplication(item: ApplicationVersion): void {
    const indexItem = this.data.applicationVersions.findIndex(x => x.application.id == item.application.id);
    if (indexItem > -1) {
      this.data.applicationVersions.splice(indexItem, 1);
    }
  }

}
