import {Injectable} from '@angular/core';
import {IRestMethod, IRestMethodStrict, Rest, RestAction, RestHandler, RestParams, RestRequestMethod} from 'rest-core';
import {Session} from '../model/session';
import {Auth} from '../model/auth';
import {PageContainer} from '../bean/page-container';
import {Country} from '../model/country';
import {Region} from '../model/region';
import {City} from '../model/city';
import {User} from '../model/user';
import {VerificationRequest} from '../model/verification-request';
import {IdentifiedObject} from '../base/identified-object';
import {Person} from '../model/person';
import {QueryParams} from './query-params';
import {UserRole} from '../model/user-role';
import {ListRequest} from '../request/list-request';
import {SportType} from '../model/sport-type';
import {HttpClient} from '@angular/common/http';
import {Image} from '../model/image';
import {Address} from '../model/address';
import {PersonAnthropometry} from '../model/person-anthropometry';
import {EmailRequest} from '../request/email-request';
import {environment} from '../../../../environments/environment';
import {AnthropometryRequest} from '../request/anthropometry-request';
import {GroupType} from '../model/group/base/group-type';
import {Group} from '../model/group/base/group';
import {GroupQuery} from './query/group-query';
import {ImageQuery} from './query/image-query';
import {GroupPerson} from '../model/group/group-person';
import {SubGroup} from '../model/group/sub-group';
import {GroupPersonQuery} from './query/group-person-query';
import {RoleQuery} from './query/role-query';
import {TeamType} from '../model/group/team/team-type';
import {League} from '../model/group/team/league';
import {AgeGroup} from '../model/age-group';
import {PersonQuery} from './query/person-query';
import {SportRole} from '../model/sport-role';

export const RestUrl = environment.production ? 'http://80.93.49.48/sp/v2' : 'http://localhost:8082';

@Injectable()
@RestParams({
  url: RestUrl,
  withCredentials: true
})
export class ParticipantRestApiService extends Rest {

  //#region Auth

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

  //#endregion

  //#region User

  //#region GET

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sporttype'
  })
  getSportTypes: IRestMethod<void, SportType[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!id}'
  })
  getUser: IRestMethod<IdentifiedObject, User>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!id}/role'
  })
  getUserRolesByUser: IRestMethod<QueryParams, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/userRole'
  })
  getUserRoles: IRestMethod<void, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!id}/baseRole'
  })
  getBaseUserRoleByUser: IRestMethod<{ id: number }, UserRole>;

  //#endregion

  //#region POST

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user'
  })
  createUser: IRestMethod<User, User>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user/verification'
  })
  verification: IRestMethod<VerificationRequest, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user/password/reset'
  })
  resetPassword: IRestMethod<EmailRequest, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user/role'
  })
  changeRoles: IRestMethod<ListRequest<IdentifiedObject>, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user/baseRole'
  })
  postBaseUserRoleByUser: IRestMethod<{ id?: number }, UserRole>;

  //#endregion

  //#endregion

  //#region Person

  //#region GET

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/filter'
  })
  getPersons: IRestMethod<PersonQuery, PageContainer<Person>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}/sporttype'
  })
  getPersonSportTypes: IRestMethod<QueryParams, SportType[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}'
  })
  getPerson: IRestMethod<QueryParams, Person>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}/address'
  })
  getPersonAddress: IRestMethod<QueryParams, Address>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}/anthropometry'
  })
  getAnthropometry: IRestMethod<QueryParams, PersonAnthropometry[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}/role/{!userRoleId}/baseGroup',
  })
  getBaseGroup: IRestMethod<GroupQuery, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}/role/{!userRoleId}/groups',
  })
  getPersonGroups: IRestMethod<GroupQuery, PageContainer<GroupPerson>>;

  //#endregion

  //#region POST

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person'
  })
  createPerson: IRestMethod<Person, Person>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/sporttype'
  })
  changeSportTypes: IRestMethod<ListRequest<IdentifiedObject>, SportType[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/anthropometry'
  })
  changeAnthropometry: IRestMethod<AnthropometryRequest, PersonAnthropometry[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/role/{!userRoleId}/public',
  })
  addPublicRole: IRestMethod<RoleQuery, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/role/{!userRoleId}/baseGroup',
  })
  saveBaseGroup: IRestMethod<RoleQuery, void>;

  //#endregion

  //#region PUT

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!id}'
  })
  updatePerson: IRestMethodStrict<Person, QueryParams, void, Person>;

  //#endregion

  //#region DELETE

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/role/{!userRoleId}/public',
  })
  removePublicRole: IRestMethod<RoleQuery, void>;

  //#endregion

  //#endregion

  //#region Country

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/country/filter',
  })
  getCountries: IRestMethod<QueryParams, PageContainer<Country>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/region/filter'
  })
  getRegions: IRestMethod<QueryParams, PageContainer<Region>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/city/filter'
  })
  getCities: IRestMethod<QueryParams, PageContainer<City>>;

  //#endregion

  //#region Group

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!id}',
  })
  getGroup: IRestMethod<QueryParams, Group>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/groupType',
  })
  getGroupTypes: IRestMethod<void, GroupType[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/filter',
  })
  getGroups: IRestMethod<GroupQuery, PageContainer<Group>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group',
  })
  postGroup: IRestMethod<Group, Group>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!id}',
  })
  putGroup: IRestMethod<Group, Group>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!id}/person/{!personId}/approve',
  })
  putApprovePersonInGroup: IRestMethod<{ id: number, personId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!id}/person/{!personId}/approve',
  })
  deleteApprovePersonInGroup: IRestMethod<{ id: number, personId: number }, void>;

  //#region GroupPerson

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!id}/currentGroupPerson',
  })
  getCurrentGroupPerson: IRestMethod<QueryParams, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!id}/person/filter',
  })
  getGroupPersonsByGroup: IRestMethod<GroupPersonQuery, PageContainer<GroupPerson>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!id}/join',
  })
  joinGroup: IRestMethod<QueryParams, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!id}/join',
  })
  leaveGroup: IRestMethod<QueryParams, void>;

  //#endregion

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/teamType',
  })
  getTeamTypes: IRestMethod<void, TeamType[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/subgroup',
  })
  postPersonSubgroup: IRestMethodStrict<{ id?: number }, any, { groupId: number, personId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/userRole',
  })
  postPersonUserRole: IRestMethodStrict<{ id?: number }, any, { groupId: number, personId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/mentor',
  })
  postPersonMentor: IRestMethodStrict<{ id?: number }, any, { groupId: number, personId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/sportRole',
  })
  postPersonSportRole: IRestMethodStrict<{ id?: number }, any, { groupId: number, personId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/number',
  })
  postPersonNumber: IRestMethodStrict<{ number?: number }, any, { groupId: number, personId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/admin',
  })
  postPersonAdmin: IRestMethodStrict<{ admin?: boolean }, any, { groupId: number, personId: number }, GroupPerson>;

  //#region Subgroup

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!id}/subgroup',
  })
  getSubGroupsByGroup: IRestMethod<QueryParams, SubGroup[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/subgroup',
  })
  postSubgroup: IRestMethodStrict<SubGroup, any, { groupId: number }, SubGroup>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!groupId}/subgroup/{!subgroupId}',
  })
  putSubgroup: IRestMethodStrict<SubGroup, any, { groupId: number, subgroupId: number }, SubGroup>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/subgroup/{!subgroupId}',
  })
  deleteSubgroup: IRestMethodStrict<any, any, { groupId: number, subgroupId: number }, void>;

  //#endregion

  //#endregion

  //#region Image

  getImageUrl(imageQuery: ImageQuery): string {
    let url = `${RestUrl}/image/download?clazz=${imageQuery.clazz}&id=${imageQuery.id}&type=${imageQuery.type}`;
    if (imageQuery.full != null) {
      url += `&full=${imageQuery.full}`;
    }
    return url;
  }

  uploadImage(file: File, image: Image): Promise<Image> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('image', new Blob([JSON.stringify(image)], {type: 'application/json'}));
    return this.http.post<Image>(`${RestUrl}/image`, formData, {withCredentials: true})
      .toPromise();
  }

  //#endregion

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/{!id}/league',
  })
  getLeaguesBySportType: IRestMethod<QueryParams, League[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/league',
  })
  getLeagues: IRestMethod<void, League[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/{!id}/sportRole',
  })
  getSportRolesBySportType: IRestMethod<QueryParams, SportRole[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/ageGroup',
  })
  getAgeGroups: IRestMethod<void, AgeGroup[]>;

  constructor(restHandler: RestHandler,
              private http: HttpClient) {
    super(restHandler);
  }

}
