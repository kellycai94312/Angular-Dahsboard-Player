import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {Device} from '../../../model/device/device';
import {PageQuery} from '../../page-query';
import {ParameterVersion} from '../../../model/parameter/parameter-version';
import {ListRequest} from '../../../request/list-request';
import {IdRequest} from '../../../request/id-request';
import {ApplicationVersion} from '../../../model/application/application-version';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  private readonly _basePath = `${environment.restUrl}/device`;

  constructor(private _apiService: ApiService) {
  }

  public getDevices<T extends Device>(query: PageQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(Device, this._basePath, query) as Observable<PageContainer<T>>;
  }

  public getDevice<T extends Device>(deviceId: number): Observable<T> {
    return this._apiService.getValue(Device, `${this._basePath}/${deviceId}`) as Observable<T>;
  }

  public saveDevice<T extends Device>(value: T): Observable<T> {
    return this._apiService.saveValue(Device, this._basePath, value) as Observable<T>;
  }

  public removeDevice<T extends Device>(value: T): Observable<T> {
    return this._apiService.removeValue(Device, `${this._basePath}/${value.id}`) as Observable<T>;
  }

  //#region Device parameter

  public getDeviceParameters<T extends ParameterVersion>(device: Device): Observable<T[]> {
    return this._apiService.getValues(ParameterVersion, `${this._basePath}/${device.id}/parameter`, {deviceVersionId: device.deviceVersionId}) as Observable<T[]>;
  }

  public updateDeviceParameters<T extends ParameterVersion>(device: Device, listRequest: ListRequest<IdRequest>): Observable<T[]> {
    return this._apiService.createValue(ParameterVersion, `${this._basePath}/${device.id}/parameter`, listRequest) as Observable<T[]>;
  }

  //#endregion

  //#region Application

  public getDeviceApplications<T extends ApplicationVersion>(device: Device): Observable<T[]> {
    return this._apiService.getValues(ApplicationVersion, `${this._basePath}/${device.id}/application`, {deviceVersionId: device.deviceVersionId}) as Observable<T[]>;
  }

  public updateDeviceApplications<T extends ApplicationVersion>(device: Device, listRequest: ListRequest<IdRequest>): Observable<T[]> {
    return this._apiService.createValue(ApplicationVersion, `${this._basePath}/${device.id}/application`, listRequest) as Observable<T[]>;
  }

  //#endregion

}


