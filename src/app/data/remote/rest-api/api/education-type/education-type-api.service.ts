import { Injectable } from '@angular/core';
import { EducationType } from 'app/data/remote/model/education-type';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationTypeApiService {

  private readonly _basePath = `${environment.restUrl}/educationType`;

  constructor(private _apiService: ApiService) {
  }

  public getEducationTypes(query?: { name?: string }): Observable<EducationType[]> {
    return this._apiService.getValues(EducationType, this._basePath, query);
  }

}
