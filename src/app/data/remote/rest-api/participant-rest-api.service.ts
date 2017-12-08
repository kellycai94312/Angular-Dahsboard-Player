import { Injectable } from '@angular/core';
import {
  IRestMethod, IRestMethodStrict, Rest, RestAction, RestHandler, RestParams,
  RestRequestMethod
} from 'rest-core';
import { Session } from '../model/session';
import { Auth } from '../model/auth';
import { PageContainer } from '../bean/page-container';
import { Country } from '../model/country';
import { Region } from '../model/region';
import { City } from '../model/city';
import { QueryParams } from './query-params';
import { UserRole } from '../model/user-role';
import { Person } from '../model/person';
import { User } from '../model/user';
import { ListRequest } from './list-request';
import { IdentifiedObject } from '../base/identified-object';
import { SportType } from '../model/sport-type';
import { HttpClient } from '@angular/common/http';
import { Picture } from '../model/picture';

export const RestUrl = 'http://localhost:8082';

@Injectable()
@RestParams({
  url: RestUrl
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
    method: RestRequestMethod.Get,
    path: '/country?count={!count}',
    withCredentials: true
  })
  getCountries: IRestMethod<QueryParams, PageContainer<Country>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/region/filter?countryId={!countryId}&count={!count}',
    withCredentials: true
  })
  getRegions: IRestMethod<QueryParams, PageContainer<Region>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/city/filter?regionId={!regionId}&count={!count}',
    withCredentials: true
  })
  getCities: IRestMethod<QueryParams, PageContainer<City>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}',
    withCredentials: true
  })
  getPerson: IRestMethod<QueryParams, Person>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!id}',
    withCredentials: true
  })
  updatePerson: IRestMethodStrict<Person, QueryParams, void, Person>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/role',
    withCredentials: true
  })
  getRoles: IRestMethod<void, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!id}/role',
    withCredentials: true
  })
  getUserRoles: IRestMethod<QueryParams, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user/role',
    withCredentials: true
  })
  changeRoles: IRestMethod<ListRequest<IdentifiedObject>, User>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sporttype',
    withCredentials: true
  })
  getSportTypes: IRestMethod<void, SportType[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}/sporttype',
    withCredentials: true
  })
  getPersonSportTypes: IRestMethod<QueryParams, SportType[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/sporttype',
    withCredentials: true
  })
  changeSportTypes: IRestMethod<ListRequest<IdentifiedObject>, SportType[]>;

  constructor(restHandler: RestHandler,
              private http: HttpClient) {
    super(restHandler);
  }

  uploadPicture(file: File, picture: Picture): Promise<Picture> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('picture', new Blob([JSON.stringify(picture)], {type: 'application/json'}));
    return this.http.post<Picture>(`${RestUrl}/picture/upload`, formData, {withCredentials: true})
      .toPromise();
  }

}
