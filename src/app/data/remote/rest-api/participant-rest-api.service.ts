import { Injectable } from '@angular/core';
import { IRestMethod, Rest, RestAction, RestHandler, RestParams, RestRequestMethod } from 'rest-core';
import { Session } from '../model/session';
import { Auth } from '../model/auth';

@Injectable()
@RestParams({
  url: 'http://localhost:8082'
})
export class ParticipantRestApiService extends Rest {

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/auth'
  })
  login: IRestMethod<Auth, Session>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/auth'
  })
  logout: IRestMethod<void, void>;

  constructor(restHandler: RestHandler) {
    super(restHandler);
  }

}
