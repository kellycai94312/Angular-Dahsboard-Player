import { Injectable } from '@angular/core';
import { IRestMethod, Rest, RestAction, RestHandler, RestParams, RestRequestMethod } from 'rest-core';
import { Session } from '../model/session';
import { Auth } from '../model/auth';
import { PageContainer } from '../bean/page-container';
import { Country } from '../model/country';
import { Region } from '../model/region';
import { City } from '../model/city';
import { Person } from '../model/person';
import { User } from '../model/user';
import { IdentifiedObject } from '../base/identified-object';

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
    path: '/auth',
    withCredentials: true
  })
  logout: IRestMethod<void, void>;


  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user',
    withCredentials: true
  })
  createUser: IRestMethod<User, User>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!id}',
    withCredentials: true
  })
  getUser: IRestMethod<IdentifiedObject, User>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person',
    withCredentials: true
  })
  createPerson: IRestMethod<Person, Person>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/country?count=2147483647',
    withCredentials: true
  })
  getCountries: IRestMethod<void, PageContainer<Country>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/region?countryId={!countryId}&count=2147483647',
    withCredentials: true
  })
  getRegions: IRestMethod<{ countryId: number }, PageContainer<Region>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/city?regionId={!regionId}&count=2147483647',
    withCredentials: true
  })
  getCities: IRestMethod<{ regionId: number }, PageContainer<City>>;

  constructor(restHandler: RestHandler) {
    super(restHandler);
  }

}
