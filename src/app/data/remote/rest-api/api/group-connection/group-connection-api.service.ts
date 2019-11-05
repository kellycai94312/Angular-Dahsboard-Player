import { Injectable } from '@angular/core';
import { GroupConnection } from 'app/data/remote/model/group/connection';
import { ApiService } from 'app/data/remote/rest-api/api';
import { UtilService } from 'app/services/util/util.service';
import { AppHelper } from 'app/utils/app-helper';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupConnectionApiService {

  private readonly _basePath = `${environment.restUrl}/groupConnection`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService,
              private _appHelper: AppHelper) {
  }

  public issueGroupConnectionCertificate(groupConnection: GroupConnection): Observable<GroupConnection> {
    return this._apiService.createValue(GroupConnection, `${this._basePath}/${groupConnection.id}/issueCertificate`) as Observable<GroupConnection>;
  }

}
