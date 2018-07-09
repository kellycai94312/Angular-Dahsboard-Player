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
import {Address} from '../model/address';
import {PersonAnthropometry} from '../model/person-anthropometry';
import {EmailRequest} from '../request/email-request';
import {GroupType} from '../model/group/base/group-type';
import {Group} from '../model/group/base/group';
import {GroupQuery} from './query/group-query';
import {GroupPerson} from '../model/group/group-person';
import {SubGroup} from '../model/group/sub-group';
import {GroupPersonQuery} from './query/group-person-query';
import {RoleQuery} from './query/role-query';
import {TeamType} from '../model/group/team/team-type';
import {League} from '../model/group/team/league';
import {AgeGroup} from '../model/age-group';
import {PersonQuery} from './query/person-query';
import {SportRole} from '../model/sport-role';
import {MeasureTemplateQuery} from './query/measure-template-query';
import {ExerciseResult} from '../bean/exercise-result';
import {ExerciseExecMeasureValue} from '../model/training/exercise-exec-measure-value';
import {ExerciseMeasure} from '../model/exercise/exercise-measure';
import {Location} from '../model/location';
import {TrainingQuery} from './query/training-query';
import {TrainingPerson} from '../model/training/training-person';
import {TrainingGroup} from '../model/training-group';
import {TrainingAccess} from '../misc/training-access';
import {NoteQuery} from './query/note-query';
import {Note} from '../model/note/base/note';
import {TestingPersonalReport} from '../bean/testing-personal-report';
import {NamedQuery} from './named-query';
import {PersonRank} from '../model/person-rank';
import {Measure} from '../model/measure';
import {AnthropometryQuery} from './query/anthropometry-query';
import {BaseTrainingQuery} from './query/base-training-query';
import {BaseTraining} from '../model/training/base/base-training';
import {TrainingPart} from '../model/training/training-part';
import {TrainingPersonQuery} from './query/training-person-query';
import {GameReport} from '../bean/game/game-report';
import {PersonMeasure} from '../bean/person-measure';
import {PersonMeasureValue} from '../bean/person-measure-value';
import {PageQuery} from './page-query';
import {PropertyConstant} from '../../local/property-constant';
import {BaseNotification} from '../model/notification/base/base-notification';
import {IntegerWrapper} from '../bean/wrapper/integer-wrapper';
import {DateWrapper} from '../bean/wrapper/date-wrapper';
import {TrainingStateRequest} from '../request/training-state-request';
import {BooleanWrapper} from '../bean/wrapper/boolean-wrapper';
import {Dialogue} from '../model/chat/conversation/dialogue';
import {Chat} from '../model/chat/conversation/chat';
import {MessageWrapper} from '../bean/wrapper/message-wrapper';
import {Message} from '../model/chat/message/message';
import {MessageContent} from '../model/chat/message/message-content';
import {BaseConversation} from '../model/chat/conversation/base/base-conversation';
import {Participant} from '../model/chat/participant';
import {ConversationQuery} from './query/conversation-query';
import {ChatRequest} from '../request/chat-request';
import {IdRequest} from '../request/id-request';
import {PersonRefereeCategory} from '../model/referee-category/person-referee-category';
import {BaseFile} from '../model/file/base/base-file';
import {ImageQuery} from './query/file/image-query';
import {DocumentQuery} from './query/file/document-query';
import {Image} from '../model/file/image/image';
import {Document} from '../model/file/document/document';

@Injectable()
@RestParams({
  url: PropertyConstant.restUrl,
  withCredentials: true
})
export class ParticipantRestApiService extends Rest {

  constructor(restHandler: RestHandler,
              private http: HttpClient) {
    super(restHandler);
  }

  //#region Auth

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/auth'
  })
  getSession: IRestMethod<void, Session>;

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
    path: '/sportType'
  })
  getSportTypes: IRestMethod<NamedQuery, PageContainer<SportType>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!id}'
  })
  getUser: IRestMethod<{ id: number }, User>;

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

  //#region Dialogue

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/dialogue'
  })
  getDialogue: IRestMethod<{ personId: number }, Dialogue>;

  //#endregion

  //#region RefereeCategory

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/refereeCategory/{!sportTypeId}'
  })
  getPersonRefereeCategories: IRestMethod<{ personId: number, sportTypeId: number }, PersonRefereeCategory[]>;


  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!personId}/refereeCategory/{!sportTypeId}'
  })
  updatePersonRefereeCategory: IRestMethodStrict<PersonRefereeCategory, any, { personId: number, sportTypeId: number }, PersonRefereeCategory>;

  //#endregion

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
    path: '/person/{!id}/anthropometry/{!sportTypeId}'
  })
  getAnthropometry: IRestMethod<{ id: number, sportTypeId: number }, PersonAnthropometry[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!id}/rank'
  })
  getRanks: IRestMethod<{ id: number }, PersonRank[]>;

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

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/note',
  })
  getNotes: IRestMethod<NoteQuery, PageContainer<Note>>;


  //#region MeasureTemplate

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/measureTemplate',
  })
  getGroupsMeasureTemplate: IRestMethod<MeasureTemplateQuery, PageContainer<ExerciseResult>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/exerciseValue',
  })
  getExerciseValue: IRestMethod<MeasureTemplateQuery, PageContainer<ExerciseExecMeasureValue>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/exerciseValue/{!exerciseMeasureId}/history',
  })
  getExerciseValueHistory: IRestMethod<MeasureTemplateQuery, PageContainer<ExerciseExecMeasureValue>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/anthropometry/{!measureId}/history',
  })
  getAnthropometryHistory: IRestMethod<AnthropometryQuery, PageContainer<PersonAnthropometry>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/training',
  })
  getPersonTrainings: IRestMethod<TrainingQuery, PageContainer<TrainingPerson>>;

  //#endregion

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
    path: '/person/anthropometry/{!sportTypeId}'
  })
  updateAnthropometry: IRestMethodStrict<ListRequest<PersonAnthropometry>, any, { sportTypeId: number }, PersonAnthropometry[]>;

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

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/training/{!trainingId}/visible',
  })
  addTrainingVisible: IRestMethod<{ trainingId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/note',
  })
  addNote: IRestMethod<Note, Note>;

  //#region MeasureTemplate

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/measureTemplate',
  })
  getPersonMeasureTemplate: IRestMethod<void, ExerciseMeasure[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/measureTemplate',
  })
  updatePersonMeasureTemplate: IRestMethod<ListRequest<ExerciseMeasure>, ExerciseMeasure[]>;

  //#endregion

  //#endregion

  //#region PUT

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!id}'
  })
  updatePerson: IRestMethodStrict<Person, QueryParams, void, Person>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/note/{!id}',
  })
  updateNote: IRestMethodStrict<Note, void, { id: number }, Note>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/rank/{!rankId}'
  })
  updateRank: IRestMethodStrict<PersonRank, any, { rankId: number }, PersonRank>;

  //#endregion

  //#region DELETE

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/role/{!userRoleId}/public',
  })
  removePublicRole: IRestMethod<RoleQuery, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/training/{!trainingId}/visible',
  })
  removeTrainingVisible: IRestMethod<{ trainingId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/note/{!id}',
  })
  removeNote: IRestMethod<{ id: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/rank/{!rankId}'
  })
  removeRank: IRestMethod<{ rankId: number }, void>;

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

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/measureTemplate',
  })
  getGroupMeasureTemplate: IRestMethod<{ groupId: number }, ExerciseMeasure[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/measureTemplate',
  })
  updateGroupMeasureTemplate: IRestMethodStrict<ListRequest<ExerciseMeasure>, any, { groupId: number }, ExerciseMeasure[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/training',
  })
  getGroupTrainings: IRestMethod<TrainingQuery, PageContainer<TrainingGroup>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/training/{!trainingId}/visible',
  })
  updateTrainingVisible: IRestMethodStrict<{ access?: TrainingAccess }, any, { groupId: number, trainingId: number }, PageContainer<TrainingGroup>>;

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

  //#region File

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/download/image',
  })
  downloadImage: IRestMethod<ImageQuery, void>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/download/document',
  })
  downloadDocument: IRestMethod<DocumentQuery, void>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/image',
  })
  getImages: IRestMethod<ImageQuery, PageContainer<Image>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/document',
  })
  getDocuments: IRestMethod<DocumentQuery, PageContainer<Document>>;

  uploadFile<T extends BaseFile>(baseFile: T, files: File[] = null): Promise<T[]> {
    const formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        if (!item) {
          continue;
        }
        formData.append('file', item, item.name);
      }
    }

    formData.append('requestObj', new Blob([JSON.stringify(baseFile)], {type: 'application/json'}));
    return this.http.post<T[]>(`${PropertyConstant.restUrl}/file`, formData, {withCredentials: true}).toPromise();
  }

  updateFile<T extends BaseFile>(baseFile: T, file: File = null): Promise<T> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    formData.append('requestObj', new Blob([JSON.stringify(baseFile)], {type: 'application/json'}));
    return this.http.put<T>(`${PropertyConstant.restUrl}/file/${baseFile.id}`, formData, {withCredentials: true}).toPromise();
  }

  getFileUrl(documentQuery: DocumentQuery): string {
    return `${PropertyConstant.restUrl}/file/download/document?clazz=${documentQuery.clazz}&objectId=${documentQuery.objectId}&type=${documentQuery.type}`;
  }

  //#endregion

  //#region BaseTraining

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining'
  })
  getBaseTrainings: IRestMethod<BaseTrainingQuery, PageContainer<BaseTraining>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!id}'
  })
  getBaseTraining: IRestMethod<{ id: number }, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining'
  })
  createBaseTraining: IRestMethod<BaseTraining, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/baseTraining/{!id}'
  })
  updateBaseTraining: IRestMethodStrict<BaseTraining, void, { id: number }, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/{!id}/state'
  })
  updateBaseTrainingState: IRestMethodStrict<TrainingStateRequest, any, { id: number }, BaseTraining>;

  //#region Group

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!baseTrainingId}/group'
  })
  getTrainingGroupsByBaseTraining: IRestMethod<{ baseTrainingId: number }, TrainingGroup[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/{!baseTrainingId}/group'
  })
  updateGroupsByBaseTraining: IRestMethodStrict<ListRequest<Group>, any, { baseTrainingId: number }, TrainingGroup[]>;

  //#endregion

  //#region TrainingPart

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!id}/part'
  })
  getTrainingParts: IRestMethod<{ id: number }, TrainingPart[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/{!baseTrainingId}/part'
  })
  createTrainingPart: IRestMethodStrict<TrainingPart, any, { baseTrainingId: number }, TrainingPart>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/baseTraining/{!baseTrainingId}/part/{!trainingPartId}'
  })
  updateTrainingPart: IRestMethodStrict<TrainingPart, any, { baseTrainingId: number, trainingPartId: number }, TrainingPart>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/baseTraining/{!baseTrainingId}/part/{!trainingPartId}'
  })
  removeTrainingPart: IRestMethod<{ baseTrainingId: number, trainingPartId: number }, TrainingPart>;

  //#endregion

  //#region ExerciseExecMeasureValue

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/{!baseTrainingId}/exerciseExecMeasureValue'
  })
  createExerciseExecMeasureValue: IRestMethodStrict<ExerciseExecMeasureValue, any, { baseTrainingId: number }, ExerciseExecMeasureValue>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/baseTraining/{!baseTrainingId}/exerciseExecMeasureValue/{!exerciseExecMeasureValueId}'
  })
  updateExerciseExecMeasureValue: IRestMethodStrict<ExerciseExecMeasureValue, any, { baseTrainingId: number, exerciseExecMeasureValueId: number }, ExerciseExecMeasureValue>;

  //#endregion

  //#region Testing

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/testing/{!testingId}/report/personal/{!trainingPersonId}'
  })
  getPersonalReport: IRestMethod<{ testingId: number, trainingPersonId: number }, TestingPersonalReport>;

  //#endregion

  //#region Game

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/game/{!gameId}/group/{!trainingGroupId}/report?measureParameter={!measureParameter}',
  })
  getGameReport: IRestMethod<{ gameId: number, trainingGroupId: number, measureParameter: string }, GameReport>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/game/{!gameId}/group/{!trainingGroupId}/part/{!trainingPartId}/personMeasure',
  })
  getPersonMeasures: IRestMethod<{ gameId: number, trainingGroupId: number, trainingPartId: number }, PersonMeasure<ExerciseExecMeasureValue>[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/game/{!gameId}/group/{!trainingGroupId}/personMeasure',
  })
  getTotalPersonMeasures: IRestMethod<{ gameId: number, trainingGroupId: number }, PersonMeasure<PersonMeasureValue>[]>;

  //#endregion

  //#region TrainingPerson

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!baseTrainingId}/person'
  })
  getTrainingPersons: IRestMethodStrict<any, TrainingPersonQuery, { baseTrainingId: number }, PageContainer<TrainingPerson>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/{!baseTrainingId}/person'
  })
  createTrainingPerson: IRestMethodStrict<TrainingPerson, any, { baseTrainingId: number }, TrainingPerson>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/baseTraining/{!baseTrainingId}/person/{!trainingPersonId}'
  })
  updateTrainingPerson: IRestMethodStrict<TrainingPerson, any, { baseTrainingId: number, trainingPersonId: number }, TrainingPerson>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/baseTraining/{!baseTrainingId}/person/{!trainingPersonId}'
  })
  removeTrainingPerson: IRestMethod<{ baseTrainingId: number, trainingPersonId: number }, TrainingPerson>;

  //#endregion

  //#endregion

  //#region Notification

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/notification'
  })
  getNotifications: IRestMethod<PageQuery, PageContainer<BaseNotification>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/notification/unread'
  })
  getUnreadCountNotifications: IRestMethod<void, IntegerWrapper>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/notification/read'
  })
  createReadNotifications: IRestMethod<DateWrapper, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/notification/{!id}/approve'
  })
  approveNotification: IRestMethod<{ id: number }, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/notification/{!id}/refuse'
  })
  refuseNotification: IRestMethod<{ id: number }, void>;

  //#endregion

  //#region Connection

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/connection'
  })
  getPersonConnections: IRestMethod<PersonQuery, PageContainer<Person>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/connection'
  })
  createConnection: IRestMethodStrict<{ id: number }, any, any, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/connection'
  })
  removeConnection: IRestMethodStrict<{ id: number }, any, any, void>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/connection/{!id}'
  })
  hasConnection: IRestMethod<{ id: number }, BooleanWrapper>;

  //#endregion

  //#region Conversation

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/conversation/{!conversationId}'
  })
  getConversation: IRestMethod<{ conversationId: number }, BaseConversation>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/conversation/{!conversationId}/messageContent'
  })
  createMessage: IRestMethodStrict<MessageContent, any, { conversationId: number }, Message>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/conversation/{!conversationId}/messageContent/{!messageContentId}'
  })
  updateMessage: IRestMethodStrict<MessageContent, any, { conversationId: number, messageContentId: number }, MessageContent>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/conversation/message/active'
  })
  getActiveMessages: IRestMethod<PageQuery, PageContainer<MessageWrapper>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/conversation/{!conversationId}/message'
  })
  getMessages: IRestMethodStrict<any, PageQuery, { conversationId: number }, PageContainer<Message>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/conversation/unread'
  })
  getUnreadTotalMessages: IRestMethod<void, IntegerWrapper>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/conversation/{!conversationId}/messageContent'
  })
  removeMessages: IRestMethodStrict<ListRequest<IdRequest>, { deleteForReceiver?: boolean }, { conversationId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/conversation/{!conversationId}/message/all'
  })
  removeAllMessages: IRestMethod<{ conversationId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/conversation/{!conversationId}/notifications'
  })
  getMessageNotificationsStatus: IRestMethod<{ conversationId: number }, BooleanWrapper>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/conversation/{!conversationId}/notifications/disable'
  })
  disableMessageNotifications: IRestMethod<{ conversationId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/conversation/{!conversationId}/notifications/enable'
  })
  enableMessageNotifications: IRestMethod<{ conversationId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/conversation/{!id}'
  })
  removeConversation: IRestMethod<{ id: number }, void>;

  //#region Chat

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/conversation'
  })
  createChat: IRestMethod<ChatRequest, Chat>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/conversation/{!conversationId}'
  })
  updateChat: IRestMethodStrict<Chat, any, { conversationId: number }, Chat>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/conversation/{!conversationId}/participant'
  })
  getParticipants: IRestMethod<ConversationQuery, PageContainer<Participant>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/conversation/{!conversationId}/participant'
  })
  updateParticipants: IRestMethodStrict<ListRequest<IdRequest>, any, { conversationId: number }, Person[]>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/conversation/{!conversationId}/quit'
  })
  quitChat: IRestMethod<{ conversationId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/conversation/{!conversationId}'
  })
  deleteChat: IRestMethod<{ conversationId: number }, void>;

  //#endregion


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
  getAgeGroups: IRestMethod<PageQuery, PageContainer<AgeGroup>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/exerciseMeasure',
  })
  getExerciseMeasure: IRestMethod<MeasureTemplateQuery, PageContainer<ExerciseMeasure>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/exerciseMeasure/{!exerciseMeasureId}',
  })
  getExerciseMeasureById: IRestMethod<{ exerciseMeasureId: number }, ExerciseMeasure>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/measure/{!id}',
  })
  getMeasureById: IRestMethod<{ id: number }, Measure>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/location/filter',
  })
  getLocations: IRestMethod<QueryParams, PageContainer<Location>>;

}
