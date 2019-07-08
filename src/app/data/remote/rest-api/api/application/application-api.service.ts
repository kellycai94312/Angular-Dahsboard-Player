import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {Application} from '../../../model/application/application';
import {ApplicationQuery} from '../../query/application-query';
import {ParameterVersion} from '../../../model/parameter/parameter-version';
import {ListRequest} from '../../../request/list-request';
import {IdRequest} from '../../../request/id-request';

@Injectable()
export class ApplicationApiService {
  private readonly _basePath = `${environment.restUrl}/application`;

  constructor(private _apiService: ApiService) {
  }

  public getApplications<T extends Application>(query: ApplicationQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(Application, this._basePath, query) as Observable<PageContainer<T>>;
  }

  public getApplication<T extends Application>(applicationId: number): Observable<T> {
    return this._apiService.getValue(Application, `${this._basePath}/${applicationId}`) as Observable<T>;
  }

  public saveApplication<T extends Application>(value: T): Observable<T> {
    return this._apiService.saveValue(Application, this._basePath, value) as Observable<T>;
  }

  public removeApplication<T extends Application>(value: T): Observable<T> {
    return this._apiService.removeValue(Application, `${this._basePath}/${value.id}`) as Observable<T>;
  }

  //#region Application parameter

  public getApplicationParameters<T extends ParameterVersion>(application: Application): Observable<T[]> {
    return this._apiService.getValues(ParameterVersion, `${this._basePath}/${application.id}/parameter`, {deviceVersionId: application.applicationVersionId}) as Observable<T[]>;
  }

  public updateApplicationParameters<T extends ParameterVersion>(application: Application, listRequest: ListRequest<IdRequest>): Observable<T[]> {
    return this._apiService.createValue(ParameterVersion, `${this._basePath}/${application.id}/parameter`, listRequest) as Observable<T[]>;
  }

  //#endregion

}
