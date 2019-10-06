import { Component, ComponentFactoryResolver, forwardRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseEditComponent } from '../../../../data/local/component/base/base-edit-component';
import { Application } from '../../../../data/remote/model/application/application';
import { DeviceVersion } from '../../../../data/remote/model/device/device-version';
import {
  ExternalResource,
  ExternalResourceApplication,
  ExternalResourceClass
} from '../../../../data/remote/model/external-resource';
import { FileClass } from '../../../../data/remote/model/file/base';
import { ImageType } from '../../../../data/remote/model/file/image';
import { ParameterVersion } from '../../../../data/remote/model/parameter/parameter-version';
import { IdRequest } from '../../../../data/remote/request/id-request';
import { ListRequest } from '../../../../data/remote/request/list-request';
import { ApplicationApiService } from '../../../../data/remote/rest-api/api/application/application-api.service';
import { ExternalResourceApiService } from '../../../../data/remote/rest-api/api/external-resource/external-resource-api.service';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { ApplicationWindowService } from '../../../../services/windows/application-window/application-window.service';
import { ParameterWindowService } from '../../../../services/windows/parameter-window/parameter-window.service';
import { AppHelper } from '../../../../utils/app-helper';
import { MediaLibraryComponent } from '../../../library/media-library/media-library/media-library.component';
import { NgxInput } from '../../../ngx/ngx-input/model/ngx-input';
import { NgxInputType } from '../../../ngx/ngx-input/model/ngx-input-type';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})
export class EditApplicationComponent extends BaseEditComponent<Application> implements OnInit {

  @ViewChild(MediaLibraryComponent, {static: false})
  public mediaLibraryComponent: MediaLibraryComponent;

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly nameNgxInput = new NgxInput();
  public readonly shortNameNgxInput = new NgxInput();
  public readonly descriptionNgxInput = new NgxInput();
  public readonly manufacturerUrlNgxInput = new NgxInput();
  public readonly videoUrlNgxInput = new NgxInput();
  private readonly _externalResourceClass = ExternalResourceClass.APPLICATION;
  private _urlExternalResource: ExternalResource;

  constructor(private _applicationApiService: ApplicationApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              // TODO: ApplicationWindowService can't inject without forwardRef()
              @Inject(forwardRef(() => ApplicationWindowService))
              private _applicationWindowService: ApplicationWindowService,
              private _externalResourceApiService: ExternalResourceApiService,
              private _parameterWindowService: ParameterWindowService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(application: Application): Promise<boolean> {
    const result = await super.initializeComponent(application);
    if (result) {
      return this.appHelper.tryLoad(async () => {
        this.nameNgxInput.labelTranslation = 'name';
        this.nameNgxInput.required = true;
        this.nameNgxInput.control.setValue(application.name);
        this.nameNgxInput.control.setValidators(Validators.required);

        this.shortNameNgxInput.labelTranslation = 'shortName';
        this.shortNameNgxInput.required = true;
        this.shortNameNgxInput.control.setValue(application.shortName);
        this.shortNameNgxInput.control.setValidators(Validators.required);

        this.descriptionNgxInput.labelTranslation = 'description';
        this.descriptionNgxInput.type = NgxInputType.TEXTAREA;
        this.descriptionNgxInput.control.setValue(application.description);

        this.manufacturerUrlNgxInput.labelTranslation = 'manufacturerUrl';
        this.manufacturerUrlNgxInput.control.setValue(application.manufacturerResource);

        this.videoUrlNgxInput.labelTranslation = 'videoUrl';

        if (!this.isNew) {
          const externalResources = await this._externalResourceApiService.getExternalResources(this._externalResourceClass, application).toPromise();
          if (externalResources.length) {
            this._urlExternalResource = externalResources[0];
            this.videoUrlNgxInput.control.setValue(this._urlExternalResource.url);
          }
        }

        this.data.parameterVersions = this.data.parameterVersions || [];
        this.data.deviceVersions = this.data.deviceVersions || [];
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return this.appHelper.tryRemove(async () => {
      this.data = await this._applicationApiService.removeApplication(this.data).toPromise();
    });
  }

  public async onSave(): Promise<boolean> {
    this.data.name = this.nameNgxInput.control.value;
    this.data.shortName = this.shortNameNgxInput.control.value;
    this.data.description = this.descriptionNgxInput.control.value;
    this.data.manufacturerResource = this.manufacturerUrlNgxInput.control.value;

    return this.appHelper.trySave(async () => {
      const data = await this._applicationApiService.saveApplication(this.data).toPromise();
      const parameterVersions = await this._applicationApiService.updateApplicationParameters(data, new ListRequest<IdRequest>(this.data.parameterVersions.map(x => new IdRequest(x.id)))).toPromise();
      const deviceVersions = await this._applicationApiService.updateApplicationDevices(data, new ListRequest<IdRequest>(this.data.deviceVersions.map(x => new IdRequest(x.id)))).toPromise();
      this.data = data;
      this.data.parameterVersions = parameterVersions;
      this.data.deviceVersions = deviceVersions;

      if (this._urlExternalResource && !this.videoUrlNgxInput.control.value) {
        await this._externalResourceApiService.removeExternalResource(this._externalResourceClass, data, this._urlExternalResource).toPromise();
      } else if (this.videoUrlNgxInput.control.value) {
        this._urlExternalResource = this._urlExternalResource || new ExternalResourceApplication();
        this._urlExternalResource.url = this.videoUrlNgxInput.control.value;

        await this._externalResourceApiService.saveExternalResource(this._externalResourceClass, data, this._urlExternalResource).toPromise();
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

  public async onEditDevices(): Promise<void> {
    const dialogResult = await this._applicationWindowService.openEditDevices(this.data.deviceVersions.map(x => x.device), {
      componentFactoryResolver: this._componentFactoryResolver,
      compare: (first, second) => first.id == second.id
    });
    if (dialogResult.result) {
      this.data.deviceVersions = dialogResult.data.map(x => {
        const deviceVersion = new DeviceVersion();
        Object.assign(deviceVersion, x);
        deviceVersion.device = x;
        deviceVersion.id = x.deviceVersionId;
        return deviceVersion;
      });
    }
  }

  public onRemoveDevice(item: DeviceVersion): void {
    const indexItem = this.data.deviceVersions.findIndex(x => x.device.id == item.device.id);
    if (indexItem > -1) {
      this.data.deviceVersions.splice(indexItem, 1);
    }
  }

}
