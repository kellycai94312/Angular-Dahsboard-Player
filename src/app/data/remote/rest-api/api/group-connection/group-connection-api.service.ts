import { Injectable } from '@angular/core';
import { ApiService } from 'app/data/remote/rest-api/api';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupConnectionApiService {

  private readonly _basePath = `${environment.restUrl}/groupConnection`;

  constructor(private _apiService: ApiService) {
  }

}
