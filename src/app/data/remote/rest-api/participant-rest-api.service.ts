import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import {
  IRestMethod,
  IRestMethodStrict,
  Rest,
  RestAction,
  RestHandler,
  RestParams,
  RestRequestMethod
} from 'rest-core';
import { environment } from '../../../../environments/environment';
import { IdentifiedObject } from '../base';
import { AbstractVersionObject } from '../base/version';
import { ExerciseResult } from '../bean/exercise-result';
import { PageContainer } from '../bean/page-container';
import { SportTypePerson } from '../bean/sport-type-person';
import { BooleanWrapper } from '../bean/wrapper/boolean-wrapper';
import { DateWrapper } from '../bean/wrapper/date-wrapper';
import { IntegerWrapper } from '../bean/wrapper/integer-wrapper';
import { MessageWrapper } from '../bean/wrapper/message-wrapper';
import { StringWrapper } from '../bean/wrapper/string-wrapper';
import { Activity } from '../model/activity/activity';
import { Address } from '../model/address';
import { AgeGroup } from '../model/age-group';
import { Auth } from '../model/auth';
import { Participant } from '../model/chat';
import { Chat } from '../model/chat/conversation';
import { BaseConversation } from '../model/chat/conversation/base';
import { Message } from '../model/chat/message';
import { BaseMessageContent } from '../model/chat/message/base';
import { City } from '../model/city';
import { Country } from '../model/country';
import { Document } from '../model/document/document';
import { BaseExercise } from '../model/exercise/base/base-exercise';
import { ExerciseMeasure } from '../model/exercise/exercise-measure';
import { Group } from '../model/group/base/group';
import { GroupCluster } from '../model/group/connection/group-cluster';
import { GroupClusterRank } from '../model/group/connection/group-cluster-rank';
import { GroupConnection } from '../model/group/connection/group-connection';
import { GroupConnectionRequest } from '../model/group/connection/group-connection-request';
import { OrganizationType } from '../model/group/organization/organization-type';
import { GroupPerson } from '../model/group/person/group-person';
import { SubgroupPersonType } from '../model/group/subgroup/person/subgroup-person-type';
import { SubgroupTemplatePersonType } from '../model/group/subgroup/person/subgroup-template-person-type';
import { SubgroupBookmark } from '../model/group/subgroup/subgroup-bookmark';
import { Subgroup } from '../model/group/subgroup/subgroup/subgroup';
import { SubgroupGroup } from '../model/group/subgroup/subgroup/subgroup-group';
import { SubgroupTemplate } from '../model/group/subgroup/template/subgroup-template';
import { SubgroupTemplateGroup } from '../model/group/subgroup/template/subgroup-template-group';
import { SubgroupTemplateGroupVersion } from '../model/group/subgroup/template/subgroup-template-group-version';
import { SubgroupTemplateVersion } from '../model/group/subgroup/template/subgroup-template-version';
import { League } from '../model/group/team/league';
import { TeamType } from '../model/group/team/team-type';
import { GroupPersonTransition } from '../model/group/transition/group-person-transition';
import { GroupTransition } from '../model/group/transition/group-transition';
import { Location } from '../model/location';
import { Measure } from '../model/measure';
import { Person } from '../model/person';
import { PersonAnthropometry } from '../model/person-anthropometry';
import { AthleteState } from '../model/person/athlete-state';
import { PersonRank } from '../model/person/rank/person-rank';
import { AnswerTypeEnum } from '../model/poll/answer-type-enum';
import { PollPerson } from '../model/poll/poll-person';
import { PollPersonAnswer } from '../model/poll/poll-person-answer';
import { PollQuestion } from '../model/poll/poll-question';
import { PollQuestionAnswer } from '../model/poll/poll-question-answer';
import { PersonRefereeCategory } from '../model/referee-category/person-referee-category';
import { Region } from '../model/region';
import { Requisites } from '../model/requisites';
import { Session } from '../model/session';
import { SportRole } from '../model/sport-role';
import { SportType } from '../model/sport-type';
import { Stage } from '../model/stage/stage';
import { StageType } from '../model/stage/stage-type';
import { Tag } from '../model/tag';
import { ExerciseExecMeasureValue } from '../model/training/exercise-exec-measure-value';
import { User } from '../model/user';
import { UserRole } from '../model/user-role';
import { VerificationRequest } from '../model/verification-request';
import { ChatRequest } from '../request/chat-request';
import { EmailRequest } from '../request/email-request';
import { GroupInviteRequest } from '../request/group-invite-request';
import { GroupPersonsTransferRequest } from '../request/group-persons-transfer-request';
import { IdRequest } from '../request/id-request';
import { ListRequest } from '../request/list-request';
import { VersionObjectRequest } from '../request/version-object-request';
import { NamedQuery } from './named-query';
import { PageQuery } from './page-query';
import { QueryParams } from './query-params';
import { ActivityQuery } from './query/activity-query';
import { AnthropometryQuery } from './query/anthropometry-query';
import { ConversationQuery } from './query/conversation-query';
import { DocumentQuery } from './query/file/document-query';
import { GroupPersonQuery } from './query/group-person-query';
import { GroupQuery } from './query/group-query';
import { GroupClusterQuery } from './query/group/group-cluster-query';
import { MeasureTemplateQuery } from './query/measure-template-query';
import { PersonQuery } from './query/person-query';
import { SubgroupBookmarkQuery } from './query/subgroup-bookmark-query';

@Injectable({
  providedIn: 'root'
})
@RestParams({
  url: environment.restUrl,
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

  //#region UserRole

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/userRole'
  })
  getUserRoles: IRestMethodStrict<any, { global?: boolean }, any, UserRole[]>;

  //#endregion

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user/{!userId}/enable'
  })
  enableTemplatePerson: IRestMethodStrict<EmailRequest, any, { userId: number }, void>;

  //#region GET

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!id}'
  })
  getUser: IRestMethod<{ id: number }, User>;

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

  //#endregion

  //#endregion

  //#region Person

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/canEdit'
  })
  canEditPerson: IRestMethod<{ personId: number }, BooleanWrapper>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/{!personId}'
  })
  removePerson: IRestMethod<{ personId: number }, Person>;

  //#region Personal

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/requisites'
  })
  getPersonRequisites: IRestMethod<{ personId: number }, Requisites>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!personId}/requisites'
  })
  updatePersonRequisites: IRestMethodStrict<Requisites, any, { personId: number }, Requisites>;

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

  //#region Group

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/group'
  })
  getGroupPersons: IRestMethod<{ personId: number }, GroupPerson[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/{!personId}/group'
  })
  updateGroupPersons: IRestMethodStrict<ListRequest<GroupPerson>, any, { personId: number }, GroupPerson[]>;

  //#endregion

  //#region Person rank

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/rank'
  })
  getPersonRanks: IRestMethodStrict<any, { sportTypeId?: number }, { personId: number }, PersonRank[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/{!personId}/rank'
  })
  createPersonRank: IRestMethodStrict<PersonRank, any, { personId: number }, PersonRank>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!personId}/rank/{!personRankId}'
  })
  updatePersonRank: IRestMethodStrict<PersonRank, any, { personId: number, personRankId: number }, PersonRank>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/{!personId}/rank/{!personRankId}'
  })
  removePersonRank: IRestMethod<{ personId: number, personRankId: number }, PersonRank>;

  //#endregion

  //#region GET

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person'
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
    path: '/person/{!personId}/role/{!userRoleId}/baseGroup',
  })
  getPersonBaseGroup: IRestMethod<{ personId: number, userRoleId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/role/{!userRoleId}/groups',
  })
  getPersonGroups: IRestMethodStrict<any, { personId: number, userRoleId: number }, GroupQuery, PageContainer<GroupPerson>>;

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
    path: '/person/{!personId}/sportType'
  })
  updatePersonSportTypes: IRestMethodStrict<ListRequest<IdentifiedObject>, any, { personId: number }, SportType[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/{!personId}/anthropometry/{!sportTypeId}'
  })
  updateAnthropometry: IRestMethodStrict<ListRequest<PersonAnthropometry>, any, { personId: number, sportTypeId: number }, PersonAnthropometry[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/{!personId}/role/{!userRoleId}/baseGroup',
  })
  updatePersonBaseGroup: IRestMethodStrict<IdRequest, any, { personId: number, userRoleId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/training/{!trainingId}/visible',
  })
  addTrainingVisible: IRestMethod<{ trainingId: number }, void>;

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
    path: '/person/{!personId}'
  })
  updatePerson: IRestMethodStrict<Person, any, { personId: number }, Person>;

  //#endregion

  //#region DELETE

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/training/{!trainingId}/visible',
  })
  removeTrainingVisible: IRestMethod<{ trainingId: number }, void>;

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
    path: '/group',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<Group>(Group), item);
    }
  })
  getGroups: IRestMethod<GroupQuery, PageContainer<Group>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group',
    resultFactory: (item, options) => {
      return plainToClass(Group, item);
    }
  })
  createGroup: IRestMethod<Group, Group>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!id}',
    resultFactory: (item, options) => {
      return plainToClass(Group, item);
    }
  })
  putGroup: IRestMethod<Group, Group>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}',
    resultFactory: (item, options) => {
      return plainToClass(Group, item);
    }
  })
  removeGroup: IRestMethod<{ groupId: number }, Group>;

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

  //#region GroupPerson

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/person/{!personId}',
  })
  getGroupPerson: IRestMethod<{ groupId: number, personId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/join',
  })
  joinGroup: IRestMethodStrict<ListRequest<IdRequest>, any, { groupId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/follow',
  })
  followGroup: IRestMethod<{ groupId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/join',
  })
  leaveGroup: IRestMethod<{ groupId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/invite',
  })
  inviteIntoGroup: IRestMethodStrict<GroupInviteRequest, any, { groupId: number }, GroupPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/stageType',
  })
  updateGroupPersonStageType: IRestMethodStrict<IdRequest, any, { groupId: number, personId: number }, GroupPerson>;

  //#endregion

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/teamType',
  })
  getTeamTypes: IRestMethod<void, TeamType[]>;

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

  //#region LeadTrainer

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/leadTrainer',
  })
  setGroupPersonLeadTrainer: IRestMethod<{ groupId: number, personId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/person/{!personId}/leadTrainer',
  })
  unsetGroupPersonLeadTrainer: IRestMethod<{ groupId: number, personId: number }, void>;

  //#endregion

  //#region GroupTransition

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/person/{!personId}/transition',
  })
  getGroupTransitions: IRestMethodStrict<any, { from?: number, count?: number }, { groupId: number, personId: number }, PageContainer<GroupTransition>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/new',
  })
  createAndEnrollToGroup: IRestMethodStrict<Person, any, { groupId: number }, GroupPersonTransition>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person',
  })
  enrollPerson: IRestMethodStrict<{ personId: number, positionIds: number[] }, any, { groupId: number }, GroupPersonTransition[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person',
  })
  enrollPersonsToGroup: IRestMethodStrict<ListRequest<Person>, any, { groupId: number }, GroupPersonTransition[]>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/person',
  })
  expelPersonsFromGroup: IRestMethodStrict<ListRequest<Person>, any, { groupId: number }, GroupPersonTransition[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/transfer',
  })
  transferPersonsToGroup: IRestMethodStrict<GroupPersonsTransferRequest, any, { groupId: number }, GroupPersonTransition[]>;

  //#endregion

  //#region Group cluster

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/cluster',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<GroupCluster>(GroupCluster), item);
    }
  })
  getGroupClusters: IRestMethodStrict<any, GroupClusterQuery, { groupId: number }, PageContainer<GroupCluster>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/cluster/{!clusterId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupCluster, item);
    }
  })
  getGroupCluster: IRestMethod<{ groupId: number, clusterId: number }, GroupCluster>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/cluster/{!clusterId}/connection',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnection, item);
    }
  })
  getGroupConnections: IRestMethod<{ groupId: number, clusterId: number }, GroupConnection[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/unassignedGroupCluster',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<GroupCluster>(GroupCluster), item);
    }
  })
  getUnassignedGroupClusters: IRestMethodStrict<any, PageQuery, { groupId: number }, PageContainer<GroupCluster>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/unassignedGroup',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<Group>(Group), item);
    }
  })
  getUnassignedClusterGroups: IRestMethodStrict<any, GroupClusterQuery, { groupId: number }, PageContainer<Group>>;

  //#endregion

  //#endregion

  //#region File

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/download/document'
  })
  downloadDocument: IRestMethod<DocumentQuery, void>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/document'
  })
  getDocuments: IRestMethod<DocumentQuery, PageContainer<Document>>;

  //#endregion

  //#region Version object

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/versionObject'
  })
  getVersionObjects: IRestMethod<PageQuery, PageContainer<AbstractVersionObject>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/versionObject'
  })
  approveVersionObject: IRestMethod<VersionObjectRequest, AbstractVersionObject>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/versionObject'
  })
  disapproveVersionObject: IRestMethod<VersionObjectRequest, AbstractVersionObject>;

  //#endregion

  //#region Activity

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/activity'
  })
  getActivities: IRestMethod<void, Activity[]>;

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

  //#region Event poll

  //#region Poll question

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPoll/{!eventPollId}/question',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestion, item);
    }
  })
  getPollQuestions: IRestMethodStrict<any, { name?: string, answerTypeEnum?: AnswerTypeEnum }, { eventPollId: number }, PollQuestion[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPoll/{!eventPollId}/question',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestion, item);
    }
  })
  createPollQuestion: IRestMethodStrict<PollQuestion, any, { eventPollId: number }, PollQuestion>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/eventPoll/{!eventPollId}/question/{!pollQuestionId}',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestion, item);
    }
  })
  updatePollQuestion: IRestMethodStrict<PollQuestion, any, { eventPollId: number, pollQuestionId: number }, PollQuestion>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/eventPoll/{!eventPollId}/question/{!pollQuestionId}',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestion, item);
    }
  })
  removePollQuestion: IRestMethod<{ eventPollId: number, pollQuestionId: number }, PollQuestion>;

  //#endregion

  //#region Event person poll

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPoll/{!eventPollId}/person',
    resultFactory: (item, options) => {
      return plainToClass(PollPerson, item);
    }
  })
  getPollPersonPolls: IRestMethodStrict<any, { approved?: boolean }, { eventPollId: number }, PollPerson[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPoll/{!eventPollId}/currentPollPerson',
    resultFactory: (item, options) => {
      return plainToClass(PollPerson, item);
    }
  })
  getCurrentPollPerson: IRestMethod<{ eventPollId: number }, PollPerson>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPoll/{!eventPollId}/approvePollPerson',
    resultFactory: (item, options) => {
      return plainToClass(PollPerson, item);
    }
  })
  approvePollPerson: IRestMethod<{ eventPollId: number }, PollPerson>;

  //#endregion

  //#endregion

  //#region Poll question

  //#region poll question answer

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/pollQuestion/{!pollQuestionId}/answer',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestionAnswer, item);
    }
  })
  getPollQuestionAnswers: IRestMethod<{ pollQuestionId: number }, PollQuestionAnswer[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/pollQuestion/{!pollQuestionId}/answer',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestionAnswer, item);
    }
  })
  createPollQuestionAnswer: IRestMethodStrict<PollQuestionAnswer, any, { pollQuestionId: number }, PollQuestionAnswer>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/pollQuestion/{!pollQuestionId}/answer/{!pollQuestionAnswerId}',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestionAnswer, item);
    }
  })
  updatePollQuestionAnswer: IRestMethodStrict<PollQuestionAnswer, any, { pollQuestionId: number, pollQuestionAnswerId: number }, PollQuestionAnswer>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/pollQuestion/{!pollQuestionId}/answer/{!pollQuestionAnswerId}',
    resultFactory: (item, options) => {
      return plainToClass(PollQuestionAnswer, item);
    }
  })
  removePollQuestionAnswer: IRestMethod<{ pollQuestionId: number, pollQuestionAnswerId: number }, PollQuestionAnswer>;

  //#endregion

  //#region Poll person answer

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/pollQuestion/{!pollQuestionId}/person/{!personId}',
    resultFactory: (item, options) => {
      return plainToClass(PollPersonAnswer, item);
    }
  })
  getPollPersonAnswers: IRestMethod<{ pollQuestionId: number, personId: number }, PollPersonAnswer[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/pollQuestion/{!pollQuestionId}/personAnswer',
    resultFactory: (item, options) => {
      return plainToClass(PollPersonAnswer, item);
    }
  })
  createPollPersonAnswer: IRestMethodStrict<PollPersonAnswer, any, { pollQuestionId: number }, PollPersonAnswer>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/pollQuestion/{!pollQuestionId}/personAnswer/{!pollPersonAnswerId}',
    resultFactory: (item, options) => {
      return plainToClass(PollPersonAnswer, item);
    }
  })
  updatePollPersonAnswer: IRestMethodStrict<PollPersonAnswer, any, { pollQuestionId: number, pollPersonAnswerId: number }, PollPersonAnswer>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/pollQuestion/{!pollQuestionId}/personAnswer/{!pollPersonAnswerId}/score',
    resultFactory: (item, options) => {
      return plainToClass(PollPersonAnswer, item);
    }
  })
  updatePollPersonAnswerScore: IRestMethodStrict<IntegerWrapper, any, { pollQuestionId: number, pollPersonAnswerId: number }, PollPersonAnswer>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/pollQuestion/{!pollQuestionId}/personAnswer/{!pollPersonAnswerId}',
    resultFactory: (item, options) => {
      return plainToClass(PollPersonAnswer, item);
    }
  })
  removePollPersonAnswer: IRestMethod<{ pollQuestionId: number, pollPersonAnswerId: number }, PollPersonAnswer>;

  //#endregion

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
  createMessage: IRestMethodStrict<BaseMessageContent, any, { conversationId: number }, Message>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/conversation/{!conversationId}/messageContent/{!messageContentId}'
  })
  updateMessage: IRestMethodStrict<BaseMessageContent, any, { conversationId: number, messageContentId: number }, BaseMessageContent>;

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
    path: '/conversation/participant'
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

  //#region Stage

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/stage'
  })
  getStages: IRestMethod<void, Stage[]>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/stage/{!stageId}/shortName'
  })
  updateStageShortName: IRestMethodStrict<StringWrapper, any, { stageId: number }, Stage>;

  //#endregion

  //#region StageType

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/stageType'
  })
  getStageTypes: IRestMethod<void, StageType[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/stageType/{!stageTypeId}'
  })
  getStageType: IRestMethod<{ stageTypeId: number }, StageType>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/stageType/{!stageTypeId}/shortName'
  })
  updateStageTypeShortName: IRestMethodStrict<StringWrapper, any, { stageTypeId: number }, StageType>;

  //#endregion

  //#region AthleteState

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/athleteState'
  })
  getAthleteStates: IRestMethod<void, AthleteState[]>;

  //#endregion

  //#region SportType

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType'
  })
  getSportTypes: IRestMethod<NamedQuery, PageContainer<SportType>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/{!sportTypeId}'
  })
  getSportType: IRestMethod<{ sportTypeId: number }, SportType>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/{!sportTypeId}/league',
  })
  getLeaguesBySportType: IRestMethod<{ sportTypeId: number }, League[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/{!id}/sportRole',
  })
  getSportRolesBySportType: IRestMethod<QueryParams, SportRole[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/person',
  })
  getSportTypePersons: IRestMethod<void, SportTypePerson[]>;

  //#endregion

  //#region Activity

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseExercise'
  })
  getBaseExercise: IRestMethod<ActivityQuery, PageContainer<BaseExercise>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseExercise/{!activityId}'
  })
  getActivity: IRestMethod<{ activityId: number }, BaseExercise>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseExercise'
  })
  createActivity: IRestMethod<BaseExercise, BaseExercise>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/baseExercise/{!activityId}'
  })
  updateActivity: IRestMethodStrict<BaseExercise, any, { activityId: number }, BaseExercise>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/baseExercise/{!activityId}'
  })
  removeActivity: IRestMethod<{ activityId: number }, BaseExercise>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseExercise/{!activityId}/measure'
  })
  getActivityMeasures: IRestMethod<{ activityId: number }, Measure[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseExercise/{!activityId}/measure'
  })
  updateActivityMeasures: IRestMethodStrict<ListRequest<IdRequest>, any, { activityId: number }, Measure[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseExercise/{!activityId}/tag'
  })
  getActivityTags: IRestMethod<{ activityId: number }, Tag[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseExercise/{!activityId}/tag'
  })
  updateActivityTags: IRestMethodStrict<ListRequest<StringWrapper>, any, { activityId: number }, Tag[]>;

  //#endregion

  //#region Tag

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/tag'
  })
  getTags: IRestMethod<PageQuery, PageContainer<Tag>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/tag'
  })
  createTag: IRestMethod<Tag, Tag>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/tag/{!tagId}'
  })
  updateTag: IRestMethodStrict<Tag, any, { tagId: number }, Tag>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/tag/{!tagId}'
  })
  removeTag: IRestMethod<{ tagId: number }, Tag>;

  //#endregion

  //#region Testing

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/testing/{!testingId}/sportRole'
  })
  getTestingSportRoles: IRestMethod<{ testingId: number }, SportRole[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/testing/{!testingId}/sportRole'
  })
  updateTestingSportRoles: IRestMethodStrict<ListRequest<SportRole>, {}, { testingId: number }, SportRole[]>;

  //#endregion

  //#region Organization Type

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/organizationType',
  })
  getOrganizationTypes: IRestMethod<void, OrganizationType[]>;

  //#endregion

  //#region SubgroupBookmark

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupBookmark'
  })
  getSubgroupBookmarks: IRestMethod<SubgroupBookmarkQuery, PageContainer<SubgroupBookmark>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupBookmark/{!subgroupBookmarkId}'
  })
  getSubgroupBookmark: IRestMethod<{ subgroupBookmarkId: number }, SubgroupBookmark>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupBookmark'
  })
  createSubgroupBookmark: IRestMethod<SubgroupBookmark, SubgroupBookmark>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/subgroupBookmark/{!subgroupBookmarkId}'
  })
  updateSubgroupBookmark: IRestMethodStrict<SubgroupBookmark, any, { subgroupBookmarkId: number }, SubgroupBookmark>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupBookmark/{!subgroupBookmarkId}'
  })
  removeSubgroupBookmark: IRestMethod<{ subgroupBookmarkId: number }, SubgroupBookmark>;

  //#endregion

  //#region SubgroupTemplate

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplate, item);
    }
  })
  getSubgroupTemplate: IRestMethod<{ subgroupTemplateId: number }, SubgroupTemplate>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplate',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplate, item);
    }
  })
  createSubgroupTemplate: IRestMethod<SubgroupTemplate, SubgroupTemplate>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/subgroupTemplate/{!subgroupTemplateId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplate, item);
    }
  })
  updateSubgroupTemplate: IRestMethodStrict<SubgroupTemplate, any, { subgroupTemplateId: number }, SubgroupTemplate>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplate/{!subgroupTemplateId}/approve',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplate, item);
    }
  })
  approveSubgroupTemplate: IRestMethodStrict<DateWrapper, any, { subgroupTemplateId: number }, SubgroupTemplate>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupTemplate/{!subgroupTemplateId}/approve',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplate, item);
    }
  })
  disapproveSubgroupTemplate: IRestMethod<{ subgroupTemplateId: number }, SubgroupTemplate>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupTemplate/{!subgroupTemplateId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplate, item);
    }
  })
  removeSubgroupTemplate: IRestMethod<{ subgroupTemplateId: number }, SubgroupTemplate>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplate/{!subgroupTemplateId}/version',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateVersion, item);
    }
  })
  createUnapprovedSubgroupTemplateVersion: IRestMethodStrict<any, any, { subgroupTemplateId: number }, SubgroupTemplateVersion>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplate/{!subgroupTemplateId}/group/{!subgroupTemplateGroupId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateGroupVersion, item);
    }
  })
  updateSubgroupTemplateGroupVersion: IRestMethodStrict<DateWrapper, any, { subgroupTemplateId: number, subgroupTemplateGroupId: number }, SubgroupTemplateGroupVersion>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupTemplate/{!subgroupTemplateId}/group/{!subgroupTemplateGroupId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateGroupVersion, item);
    }
  })
  removeSubgroupTemplateGroupByTemplateOwner: IRestMethod<{ subgroupTemplateId: number, subgroupTemplateGroupId: number }, SubgroupTemplateGroupVersion>;

  //#region SubgroupTemplatePersonType

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}/personType'
  })
  getSubgroupTemplatePersonTypes: IRestMethod<{ subgroupTemplateId: number }, SubgroupTemplatePersonType[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}/personType/{!subgroupTemplatePersonTypeId}'
  })
  getSubgroupTemplatePersonType: IRestMethod<{ subgroupTemplateId: number, subgroupTemplatePersonTypeId: number }, SubgroupTemplatePersonType>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/subgroupTemplate/{!subgroupTemplateId}/personType'
  })
  updateSubgroupTemplatePersonTypes: IRestMethodStrict<ListRequest<SubgroupTemplatePersonType>, any, { subgroupTemplateId: number }, SubgroupTemplatePersonType[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}/version',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateVersion, item);
    }
  })
  getSubgroupTemplateVersions: IRestMethod<{ subgroupTemplateId: number }, SubgroupTemplateVersion[]>;

  //#endregion

  //#region Subgroup

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}/subgroup'
  })
  getSubgroupTemplateSubgroups: IRestMethodStrict<any, { subgroupTemplateVersionId?: number }, { subgroupTemplateId: number }, Subgroup[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}/subgroup/{!subgroupId}'
  })
  getSubgroupTemplateSubgroup: IRestMethod<{ subgroupTemplateId: number, subgroupId: number }, Subgroup>;

  // Подгруппы, к которым можно привязать в дереве указанную подгруппу
  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}/subgroup/{!subgroupId}/parentSubgroup'
  })
  getSubgroupTemplateSubgroupParentSubgroups: IRestMethod<{ subgroupTemplateId: number, subgroupId: number }, Subgroup[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplate/{!subgroupTemplateId}/subgroup',
    resultFactory: (item, options) => {
      return plainToClass(Subgroup, item);
    }
  })
  createSubgroupTemplateSubgroup: IRestMethodStrict<Subgroup, any, { subgroupTemplateId: number }, Subgroup>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/subgroupTemplate/{!subgroupTemplateId}/subgroup/{!subgroupId}',
    resultFactory: (item, options) => {
      return plainToClass(Subgroup, item);
    }
  })
  updateSubgroupTemplateSubgroup: IRestMethodStrict<Subgroup, any, { subgroupTemplateId: number, subgroupId: number }, Subgroup>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupTemplate/{!subgroupTemplateId}/subgroup/{!subgroupId}',
    resultFactory: (item, options) => {
      return plainToClass(Subgroup, item);
    }
  })
  removeSubgroupTemplateSubgroup: IRestMethod<{ subgroupTemplateId: number, subgroupId: number }, Subgroup>;

  //#endregion

  //#region SubgroupTemplateGroup

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplate/{!subgroupTemplateId}/group'
  })
  getSubgroupTemplateGroups: IRestMethod<{ subgroupTemplateId: number, apply?: boolean }, SubgroupTemplateGroup[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplate/{!subgroupTemplateId}/group'
  })
  createSubgroupTemplateGroup: IRestMethodStrict<SubgroupTemplateGroup, any, { subgroupTemplateId: number }, SubgroupTemplateGroup>;

  //#endregion

  //#endregion

  //#region SubgroupTemplateGroup

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplateGroup/{!subgroupTemplateGroupId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateGroup, item);
    }
  })
  getSubgroupTemplateGroup: IRestMethod<{ subgroupTemplateGroupId: number }, SubgroupTemplateGroup>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplateGroup/{!subgroupTemplateGroupId}/approve',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateGroup, item);
    }
  })
  approveSubgroupTemplateGroup: IRestMethod<{ subgroupTemplateGroupId: number }, SubgroupTemplateGroup>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/subgroupTemplateGroup/{!subgroupTemplateGroupId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateGroup, item);
    }
  })
  updateSubgroupTemplateGroup: IRestMethodStrict<SubgroupTemplateGroup, any, { subgroupTemplateGroupId: number }, SubgroupTemplateGroup>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupTemplateGroup/{!subgroupTemplateGroupId}',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateGroup, item);
    }
  })
  removeSubgroupTemplateGroup: IRestMethod<{ subgroupTemplateGroupId: number }, SubgroupTemplateGroup>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplateGroup/{!subgroupTemplateGroupId}/version',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupTemplateGroupVersion, item);
    }
  })
  getSubgroupTemplateGroupVersions: IRestMethod<{ subgroupTemplateGroupId: number }, SubgroupTemplateGroupVersion[]>;

  //#endregion

  //#region SubgroupPersonType

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupPersonType',
  })
  getSubgroupPersonTypes: IRestMethod<void, SubgroupPersonType[]>;

  //#endregion

  //#region Subgroup template version

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplateVersion/{!subgroupTemplateVersionId}/childrenSubgroup',
    resultFactory: (item, options) => {
      return plainToClass(Subgroup, item);
    }
  })
  getSubgroupTemplateVersionChildrenSubgroups: IRestMethodStrict<{}, { subgroupId?: number }, { subgroupTemplateVersionId: number }, Subgroup[]>;

  //#endregion

  //#region SubgroupGroup

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplateGroupVersion/{!subgroupTemplateGroupVersionId}/subgroup'
  })
  getSubgroupTemplateGroupSubgroups: IRestMethod<{ subgroupTemplateGroupVersionId: number }, SubgroupGroup[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplateGroupVersion/{!subgroupTemplateGroupVersionId}/subgroup/{!subgroupGroupId}/parentSubgroup'
  })
  getSubgroupTemplateGroupSubgroupGroupParentSubgroupGroups: IRestMethod<{ subgroupTemplateGroupVersionId: number, subgroupGroupId: number }, SubgroupGroup[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupTemplateGroupVersion/{!subgroupTemplateGroupVersionId}/childrenSubgroup',
    resultFactory: (item, options) => {
      return plainToClass(SubgroupGroup, item);
    }
  })
  getSubgroupTemplateGroupChildrenSubgroupGroups: IRestMethodStrict<{}, { subgroupGroupId?: number }, { subgroupTemplateGroupVersionId: number }, SubgroupGroup[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupTemplateGroupVersion/{!subgroupTemplateGroupVersionId}/subgroup'
  })
  createSubgroupTemplateGroupSubgroupGroup: IRestMethodStrict<SubgroupGroup, {}, { subgroupTemplateGroupVersionId: number }, SubgroupGroup>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/subgroupTemplateGroupVersion/{!subgroupTemplateGroupVersionId}/subgroup/{!subgroupGroupId}'
  })
  updateSubgroupTemplateGroupSubgroupGroup: IRestMethodStrict<SubgroupGroup, any, { subgroupTemplateGroupVersionId: number, subgroupGroupId: number }, SubgroupGroup>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupTemplateGroupVersion/{!subgroupTemplateGroupVersionId}/subgroup/{!subgroupGroupId}'
  })
  removeSubgroupTemplateGroupSubgroupGroup: IRestMethod<{ subgroupTemplateGroupVersionId: number, subgroupGroupId: number }, SubgroupGroup>;

  //#endregion

  //#region Group cluster

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/groupCluster/{!groupClusterId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupCluster, item);
    }
  })
  updateGroupCluster: IRestMethodStrict<GroupCluster, any, { groupClusterId: number }, GroupCluster>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/groupCluster/{!groupClusterId}/group',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<Group>(Group), item);
    }
  })
  getClusterGroups: IRestMethodStrict<any, PageQuery, { groupClusterId: number }, PageContainer<Group>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/groupCluster/{!groupClusterId}/group/{!groupId}/unassignedParentGroup',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<Group>(Group), item);
    }
  })
  getUnassignedParentGroups: IRestMethodStrict<any, PageQuery, { groupClusterId: number, groupId: number }, PageContainer<Group>>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/groupCluster/{!groupClusterId}/group/{!groupId}',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<Group>(Group), item);
    }
  })
  removeGroupFromGroupCluster: IRestMethodStrict<any, any, { groupClusterId: number, groupId: number }, PageContainer<Group>>;

  //#endregion

  //#region Group cluster rank

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/groupCluster/{!groupClusterId}/rank',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<GroupClusterRank>(GroupClusterRank), item);
    }
  })
  getGroupClusterRanks: IRestMethodStrict<any, PageQuery, { groupClusterId: number }, PageContainer<GroupClusterRank>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/groupCluster/{!groupClusterId}/rank/{!groupClusterRankId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupClusterRank, item);
    }
  })
  getGroupClusterRank: IRestMethod<{ groupClusterId: number, groupClusterRankId: number }, GroupClusterRank>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/groupCluster/{!groupClusterId}/rank',
    resultFactory: (item, options) => {
      return plainToClass(GroupClusterRank, item);
    }
  })
  createGroupClusterRank: IRestMethodStrict<GroupClusterRank, any, { groupClusterId: number }, GroupClusterRank>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/groupCluster/{!groupClusterId}/rank/{!groupClusterRankId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupClusterRank, item);
    }
  })
  removeGroupClusterRank: IRestMethod<{ groupClusterId: number, groupClusterRankId: number }, GroupClusterRank>;

  //#endregion

  //#region Group connection request

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/groupConnectionRequest',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnectionRequest, item);
    }
  })
  createGroupConnectionRequest: IRestMethod<GroupConnectionRequest, GroupConnectionRequest>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/groupConnectionRequest/{!groupConnectionRequestId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnectionRequest, item);
    }
  })
  updateGroupConnectionRequest: IRestMethodStrict<GroupConnectionRequest, any, { groupConnectionRequestId: number }, GroupConnectionRequest>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/groupConnectionRequest/{!groupConnectionRequestId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnectionRequest, item);
    }
  })
  removeGroupConnectionRequest: IRestMethod<{ groupConnectionRequestId: number }, GroupConnectionRequest>;

  //#endregion

  //#region Group connection

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/groupConnection/{!groupConnectionId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnection, item);
    }
  })
  updateGroupConnection: IRestMethodStrict<GroupConnection, any, { groupConnectionId: number }, GroupConnection>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/groupConnection/{!groupConnectionId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnection, item);
    }
  })
  removeGroupConnection: IRestMethod<{ groupConnectionId: number }, GroupConnection>;

  //#endregion

  //#region Group cluster rank

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/groupClusterRank/{!groupClusterRankId}/group',
    resultFactory: (item, options) => {
      return plainToClass(Group, item);
    }
  })
  getRankConnections: IRestMethodStrict<any, { unassigned: boolean }, { groupClusterRankId: number }, Group[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/groupClusterRank/{!groupClusterRankId}/group',
    resultFactory: (item, options) => {
      return plainToClass(Group, item);
    }
  })
  updateRankConnections: IRestMethodStrict<ListRequest<IdRequest>, any, { groupClusterRankId: number }, Group[]>;

  //#endregion

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/league',
  })
  getLeagues: IRestMethod<void, League[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/ageGroup',
  })
  getAgeGroups: IRestMethod<PageQuery, PageContainer<AgeGroup>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/exerciseMeasure',
  })
  getExerciseMeasures: IRestMethod<MeasureTemplateQuery, PageContainer<ExerciseMeasure>>;

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
    path: '/measure',
  })
  getMeasures: IRestMethod<PageQuery, PageContainer<Measure>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/location/filter',
  })
  getLocations: IRestMethod<QueryParams, PageContainer<Location>>;

  public async getGroupPersonsByGroup(query: GroupPersonQuery): Promise<PageContainer<GroupPerson>> {
    let queryStr = '';
    const keys = Object.keys(query).filter(x => x !== 'id');
    if (keys.length) {
      queryStr = '?';
      for (let i = 0; i < keys.length; i++) {
        const item = keys[i];
        queryStr += `${item}=${query[item]}`;
        if (i < keys.length - 1) {
          queryStr += '&';
        }
      }
    }

    return <PageContainer<GroupPerson>> (await this.http.get(`${environment.restUrl}/group/${query.id}/person${queryStr}`, {withCredentials: true}).toPromise());
  }

  getDocument(documentId: number): string {
    if (!documentId) {
      return null;
    }

    return `${environment.restUrl}/file/download/document/${documentId}`;
  }

}
