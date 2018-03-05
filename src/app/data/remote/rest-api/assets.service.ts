import { Injectable } from '@angular/core';
import { IRestMethod, Rest, RestAction, RestHandler, RestParams, RestRequestMethod } from 'rest-core';
import { HttpClient } from '@angular/common/http';

export const Path = 'assets/reports';

@Injectable()
@RestParams({
  url: Path
})
export class AssetsService extends Rest {

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/personal_training.mrt',
  })
  getPersonalReport: IRestMethod<void, any>;

  constructor(restHandler: RestHandler,
              private http: HttpClient) {
    super(restHandler);
  }

}
