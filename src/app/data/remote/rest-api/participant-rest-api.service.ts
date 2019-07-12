import {Injectable} from '@angular/core';
import {IRestMethod, IRestMethodStrict, Rest, RestAction, RestHandler, RestParams, RestRequestMethod, RestResponseBodyType} from 'rest-core';
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
import {Group} from '../model/group/base/group';
import {GroupQuery} from './query/group-query';
import {GroupPerson} from '../model/group/group-person';
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
import {NoteQuery} from './query/note-query';
import {Note} from '../model/note/base/note';
import {NamedQuery} from './named-query';
import {PersonRank} from '../model/person-rank';
import {Measure} from '../model/measure';
import {AnthropometryQuery} from './query/anthropometry-query';
import {PageQuery} from './page-query';
import {BaseNotification} from '../model/notification/base/base-notification';
import {IntegerWrapper} from '../bean/wrapper/integer-wrapper';
import {DateWrapper} from '../bean/wrapper/date-wrapper';
import {BooleanWrapper} from '../bean/wrapper/boolean-wrapper';
import {Dialogue} from '../model/chat/conversation/dialogue';
import {Chat} from '../model/chat/conversation/chat';
import {MessageWrapper} from '../bean/wrapper/message-wrapper';
import {Message} from '../model/chat/message/message';
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
import {BaseContact} from '../model/contact/base/base-contact';
import {Requisites} from '../model/requisites';
import {environment} from '../../../../environments/environment';
import {GroupPersonLog} from '../model/group/group-person-log';
import {MedicalExamination} from '../model/person/medical-examination';
import {StringWrapper} from '../bean/wrapper/string-wrapper';
import {AthleteState} from '../model/person/athlete-state';
import {PublicUserRole} from '../model/group/public-user-role';
import {SportTypePerson} from '../bean/sport-type-person';
import {ActivityQuery} from './query/activity-query';
import {BaseExercise} from '../model/exercise/base/base-exercise';
import {Tag} from '../model/tag';
import {Rank} from '../model/rank';
import {Position} from '../model/person-position/position';
import {GroupPersonTransition} from '../model/group/transition/group-person-transition';
import {GroupPersonsTransferRequest} from '../request/group-persons-transfer-request';
import {GroupTransition} from '../model/group/transition/group-transition';
import {OrganizationType} from '../model/group/organization/organization-type';
import {OrganizationTrainer} from '../model/group/organization-trainer';
import {GroupPersonQuery} from './query/group-person-query';
import {VersionObject} from '../base/version/version-object';
import {VersionObjectRequest} from '../request/version-object-request';
import {BaseMessageContent} from '../model/chat/message/base/base-message-content';
import {Activity} from '../model/activity/activity';
import {GroupInviteRequest} from '../request/group-invite-request';
import {GroupPersonPosition} from '../model/group/position/group-person-position';
import {GroupPersonPositionQuery} from './query/group-person-position-query';
import {SubgroupTemplate} from '../model/group/subgroup/template/subgroup-template';
import {SubgroupBookmark} from '../model/group/subgroup/subgroup-bookmark';
import {SubgroupBookmarkQuery} from './query/subgroup-bookmark-query';
import {SubgroupPerson} from '../model/group/subgroup/person/subgroup-person';
import {SubgroupPersonRequest} from '../request/subgroup-person-request';
import {SubgroupTemplatePersonType} from '../model/group/subgroup/person/subgroup-template-person-type';
import {SubgroupTemplateVersion} from '../model/group/subgroup/template/subgroup-template-version';
import {Subgroup} from '../model/group/subgroup/subgroup/subgroup';
import {SubgroupTemplateGroup} from '../model/group/subgroup/template/subgroup-template-group';
import {SubgroupGroup} from '../model/group/subgroup/subgroup/subgroup-group';
import {SubgroupPersonType} from '../model/group/subgroup/person/subgroup-person-type';
import {SubgroupPersonListRequest} from '../request/subgroup-person-list-request';
import {SubgroupPersonQuery} from './query/subgroup-person-query';
import {SubgroupTemplateGroupVersion} from '../model/group/subgroup/template/subgroup-template-group-version';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {GroupCluster} from '../model/group/connection/group-cluster';
import {GroupClusterQuery} from './query/group/group-cluster-query';
import {GroupConnection} from '../model/group/connection/group-connection';
import {GroupConnectionRequest} from '../model/group/connection/group-connection-request';
import {GroupConnectionRequestQuery} from './query/group/group-connection-request-query';
import {GroupClusterRank} from '../model/group/connection/group-cluster-rank';
import {ImageCropRequest} from '../request/image-crop-request';
import {EventPoll} from '../model/training/poll/event-poll';
import {AnswerTypeEnum} from '../model/training/poll/answer-type-enum';
import {PollQuestion} from '../model/training/poll/poll-question';
import {PollPerson} from '../model/training/poll/poll-person';
import {PollQuestionAnswer} from '../model/training/poll/poll-question-answer';
import {PollPersonAnswer} from '../model/training/poll/poll-person-answer';
import {GroupNews} from '../model/group/news/group-news';
import {Stage} from '../model/stage/stage';
import {StageType} from '../model/stage/stage-type';

@Injectable()
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

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!userId}/role'
  })
  getUserUserRoles: IRestMethod<{ userId: number }, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/user/{!userId}/role'
  })
  updateUserUserRoles: IRestMethodStrict<ListRequest<IdentifiedObject>, any, { userId: number }, UserRole[]>;

  //#region Base

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!userId}/baseRole'
  })
  getBaseUserRoleByUser: IRestMethod<{ userId: number }, UserRole>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/user/{!userId}/baseRole'
  })
  updateUserBaseUserRole: IRestMethodStrict<UserRole, any, { userId: number }, void>;

  //#endregion

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

  //#region Contact

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/contact'
  })
  getPersonContacts: IRestMethod<{ personId: number }, BaseContact[]>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!personId}/contact'
  })
  updatePersonContacts: IRestMethodStrict<ListRequest<BaseContact>, any, { personId: number }, BaseContact[]>;

  //#endregion

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
    path: '/person/{!personId}/publicUserRole',
  })
  createPublicRole: IRestMethodStrict<Group, { userRoleId: number }, { personId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/{!personId}/publicUserRole',
  })
  removePublicRole: IRestMethodStrict<Group, { userRoleId: number }, { personId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/publicUserRole',
  })
  getPublicUserRoles: IRestMethodStrict<any, { userRoleId: number, sportTypeId: number }, { personId: number }, PublicUserRole[]>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!personId}/publicUserRole/{!publicUserRoleId}',
  })
  updatePublicUserRole: IRestMethodStrict<PublicUserRole, any, { personId: number, publicUserRoleId: number }, PublicUserRole>;

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
    path: '/person/{!personId}'
  })
  updatePerson: IRestMethodStrict<Person, any, { personId: number }, Person>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/note/{!id}',
  })
  updateNote: IRestMethodStrict<Note, void, { id: number }, Note>;

  //#endregion

  //#region DELETE

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

  //#endregion

  //#region Medical examination

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/medicalExamination'
  })
  getMedicalExaminations: IRestMethodStrict<any, { sportTypeId?: number, from?: number, count?: number }, { personId: number }, PageContainer<MedicalExamination>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/person/{!personId}/medicalExamination'
  })
  createMedicalExamination: IRestMethodStrict<MedicalExamination, any, { personId: number }, MedicalExamination>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/person/{!personId}/medicalExamination/{!medicalExaminationId}'
  })
  updateMedicalExamination: IRestMethodStrict<MedicalExamination, any, { personId: number, medicalExaminationId: number }, MedicalExamination>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/person/{!personId}/medicalExamination/{!medicalExaminationId}'
  })
  removeMedicalExamination: IRestMethod<{ personId: number, medicalExaminationId: number }, MedicalExamination>;

  //#endregion

  //#region News

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/news'
  })
  getPersonNewsItems: IRestMethod<PageQuery, PageContainer<GroupNews>>;

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
    resultFactory: (item, options) => {
      return plainToClass(Group, item);
    }
  })
  getGroup: IRestMethod<QueryParams, Group>;

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
    path: '/group/{!id}/currentGroupPerson',
  })
  getCurrentGroupPerson: IRestMethod<QueryParams, GroupPerson>;

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

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/person/{!personId}/position',
  })
  getGroupPersonPositions: IRestMethodStrict<any, GroupPersonPositionQuery, { groupId: number, personId: number }, PageContainer<GroupPersonPosition>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/position',
  })
  updateGroupPersonPositions: IRestMethodStrict<ListRequest<Position>, any, { groupId: number, personId: number }, GroupPersonPosition[]>;

  //#region Organization trainer

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/organizationTrainer',
  })
  getOrganizationTrainers: IRestMethodStrict<any, { unassigned?: boolean }, { groupId: number }, OrganizationTrainer[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/organizationTrainer',
  })
  updateOrganizationTrainers: IRestMethodStrict<ListRequest<GroupPerson>, {}, { groupId: number }, OrganizationTrainer[]>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!groupId}/organizationTrainer/{!organizationTrainerId}',
  })
  updateOrganizationTrainer: IRestMethodStrict<OrganizationTrainer, {}, { groupId: number, organizationTrainerId: number }, OrganizationTrainer>;

  //#endregion

  //#region Vacancy

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/vacancy',
  })
  getGroupVacancies: IRestMethodStrict<any, GroupPersonPositionQuery, { groupId: number }, PageContainer<Position>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/vacancy',
  })
  updateGroupVacancies: IRestMethodStrict<ListRequest<IdRequest>, GroupPersonPositionQuery, { groupId: number }, Position[]>;

  //#endregion

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

  //#region GroupPersonLog

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/person/{!personId}/log',
  })
  getGroupPersonLogs: IRestMethodStrict<any, PageQuery, { groupId: number, personId: number }, PageContainer<GroupPersonLog>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/person/{!personId}/log/latest',
  })
  getLatestGroupPersonLog: IRestMethod<{ groupId: number, personId: number }, GroupPersonLog>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/log',
  })
  createGroupPersonLog: IRestMethodStrict<GroupPersonLog, any, { groupId: number, personId: number }, GroupPersonLog>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!groupId}/person/{!personId}/log/{!groupPersonLogId}',
  })
  updateGroupPersonLog: IRestMethodStrict<GroupPersonLog, any, { groupId: number, personId: number, groupPersonLogId: number }, GroupPersonLog>;

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

  //#region Group news

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/news',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<GroupNews>(GroupNews), item);
    }
  })
  getGroupNewsItems: IRestMethodStrict<any, PageQuery, { groupId: number }, PageContainer<GroupNews>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/news/{!groupNewsId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupNews, item);
    }
  })
  getGroupNews: IRestMethodStrict<any, PageQuery, { groupId: number, groupNewsId: number }, GroupNews>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/news',
    resultFactory: (item, options) => {
      return plainToClass(GroupNews, item);
    }
  })
  createGroupNews: IRestMethodStrict<GroupNews, any, { groupId: number }, GroupNews>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!groupId}/news/{!groupNewsId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupNews, item);
    }
  })
  updateGroupNews: IRestMethodStrict<GroupNews, any, { groupId: number, groupNewsId: number }, GroupNews>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/news/{!groupNewsId}',
    resultFactory: (item, options) => {
      return plainToClass(GroupNews, item);
    }
  })
  removeGroupNews: IRestMethod<{ groupId: number, groupNewsId: number }, GroupNews>;

  //#endregion

  //#region Subgroup

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/subgroupTemplate',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<SubgroupTemplate>(SubgroupTemplate), item);
    }
  })
  getSubgroupTemplates: IRestMethodStrict<any, PageQuery, { groupId: number }, PageContainer<SubgroupTemplate>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/subgroupTemplateGroup',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<SubgroupTemplateGroup>(SubgroupTemplateGroup), item);
    }
  })
  getSubgroupTemplateGroupsByGroup: IRestMethodStrict<any, PageQuery, { groupId: number }, PageContainer<SubgroupTemplateGroup>>;

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

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/connectionRequest',
    resultFactory: (item, options) => {
      return plainToClassFromExist(new PageContainer<GroupConnectionRequest>(GroupConnectionRequest), item);
    }
  })
  getGroupConnectionRequests: IRestMethodStrict<any, GroupConnectionRequestQuery, { groupId: number }, PageContainer<GroupConnectionRequest>>;

  //#endregion

  //#endregion

  //#region File

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/download/image',
    responseBodyType: RestResponseBodyType.Blob
  })
  downloadImage: IRestMethod<ImageQuery, any>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/download/document'
  })
  downloadDocument: IRestMethod<DocumentQuery, void>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/image'
  })
  getImages: IRestMethod<ImageQuery, PageContainer<Image>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/document'
  })
  getDocuments: IRestMethod<DocumentQuery, PageContainer<Document>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/file/{!imageId}/crop',
    resultFactory: (item, options) => {
      return plainToClass(Image, item);
    }
  })
  cropImage: IRestMethodStrict<ImageCropRequest, any, { imageId: number }, Image>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/file/{!fileId}'
  })
  removeFile: IRestMethod<{ fileId: number }, BaseFile>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/file/{!fileId}/resource'
  })
  removeFileResource: IRestMethod<{ fileId: number }, BaseFile>;

  //#endregion

  //#region Version object

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/versionObject'
  })
  getVersionObjects: IRestMethod<PageQuery, PageContainer<VersionObject>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/versionObject'
  })
  approveVersionObject: IRestMethod<VersionObjectRequest, VersionObject>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/versionObject'
  })
  disapproveVersionObject: IRestMethod<VersionObjectRequest, VersionObject>;

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

  //#region Event event poll

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/{!eventId}/poll',
    resultFactory: (item, options) => {
      return plainToClass(EventPoll, item);
    }
  })
  createEventPoll: IRestMethodStrict<EventPoll, any, { eventId: number }, EventPoll>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!eventId}/poll',
    resultFactory: (item, options) => {
      return plainToClass(EventPoll, item);
    }
  })
  getEventPolls: IRestMethodStrict<any, { name?: string }, { eventId: number }, EventPoll[]>;

  //#endregion

  //#region Event poll

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/eventPoll/{!eventPollId}',
    resultFactory: (item, options) => {
      return plainToClass(EventPoll, item);
    }
  })
  updateEventPoll: IRestMethodStrict<EventPoll, any, { eventPollId: number }, EventPoll>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPoll/{!eventPollId}/approve',
    resultFactory: (item, options) => {
      return plainToClass(EventPoll, item);
    }
  })
  approveEventPoll: IRestMethodStrict<any, any, { eventPollId: number }, EventPoll>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/eventPoll/{!eventPollId}',
    resultFactory: (item, options) => {
      return plainToClass(EventPoll, item);
    }
  })
  removeEventPoll: IRestMethod<{ eventPollId: number }, EventPoll>;

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

  //#region Rank

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/rank',
  })
  getRanks: IRestMethod<void, Rank[]>;

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

  //#region SubgroupGroup

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/subgroupGroup/{!subgroupGroupId}/person'
  })
  getSubgroupPersons: IRestMethodStrict<any, SubgroupPersonQuery, { subgroupGroupId: number }, PageContainer<SubgroupPerson>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/subgroupGroup/{!subgroupGroupId}/person'
  })
  createSubgroupPersons: IRestMethodStrict<SubgroupPersonListRequest, any, { subgroupGroupId: number }, SubgroupPerson[]>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/subgroupGroup/{!subgroupGroupId}/person'
  })
  transferSubgroupPersons: IRestMethodStrict<SubgroupPersonRequest, any, { subgroupGroupId: number }, SubgroupPerson[]>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/subgroupGroup/{!subgroupGroupId}/person'
  })
  removeSubgroupPersons: IRestMethodStrict<SubgroupPersonListRequest, any, { subgroupGroupId: number }, SubgroupPerson[]>;

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
    method: RestRequestMethod.Get,
    path: '/subgroupTemplateGroupVersion/{!subgroupTemplateGroupVersionId}/unassignedSubgroupGroup'
  })
  getUnassignedSubgroupGroupsForPersons: IRestMethod<{ subgroupTemplateGroupVersionId: number, personIds: string }, SubgroupGroup[]>;

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

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/groupConnectionRequest/{!groupConnectionRequestId}/approve',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnection, item);
    }
  })
  approveGroupConnectionRequest: IRestMethodStrict<any, any, { groupConnectionRequestId: number }, GroupConnection>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/groupConnectionRequest/{!groupConnectionRequestId}/approve',
    resultFactory: (item, options) => {
      return plainToClass(GroupConnectionRequest, item);
    }
  })
  rejectGroupConnectionRequest: IRestMethodStrict<any, any, { groupConnectionRequestId: number }, GroupConnectionRequest>;

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

  // TODO: Use this method instead getGroupPersonsByGroup when will fixed this issue: https://github.com/troyanskiy/ngx-resource-core/issues/39
  // @RestAction({
  //   method: RestRequestMethod.Get,
  //   path: '/group/{!id}/person',
  // })
  // getGroupPersonsByGroup: IRestMethod<GroupPersonQuery, PageContainer<GroupPerson>>;

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

    return <PageContainer<GroupPerson>>(await this.http.get(`${environment.restUrl}/group/${query.id}/person${queryStr}`, {withCredentials: true}).toPromise());
  }

  uploadFile<T extends BaseFile>(baseFile: T, file: File = null): Promise<T> {
    const formData = new FormData();
    formData.append('requestObj', new Blob([JSON.stringify(baseFile)], {type: 'application/json'}));

    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.post<T>(`${environment.restUrl}/file`, formData, {withCredentials: true}).toPromise();
  }

  updateFile<T extends BaseFile>(baseFile: T, file: File = null): Promise<T> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    formData.append('requestObj', new Blob([JSON.stringify(baseFile)], {type: 'application/json'}));
    return this.http.put<T>(`${environment.restUrl}/file/${baseFile.id}`, formData, {withCredentials: true}).toPromise();
  }

  getFileUrl(documentQuery: DocumentQuery): string {
    if (!documentQuery) {
      return '';
    }
    let url = `${environment.restUrl}/file/download/document?clazz=${documentQuery.clazz}&objectId=${documentQuery.objectId}`;
    if (documentQuery.type) {
      url += `&type=${documentQuery.type}`;
    }
    return url;
  }

  getDocument(documentId: number): string {
    if (!documentId) {
      return null;
    }

    return `${environment.restUrl}/file/download/document/${documentId}`;
  }

  getUrlImage(query: ImageQuery, noCache: boolean = false): string {
    let url = `${environment.restUrl}/file/download/image?clazz=${query.clazz}&objectId=${query.objectId}&type=${query.type}`;
    if (query.width) {
      url += `&width=${query.width}`;
    }

    if (query.height) {
      url += `&height=${query.height}`;
    }

    if (query.cropped) {
      url += `&cropped=${query.cropped}`;
    }

    if (noCache) {
      url += `&date=${Date.now()}`;
    }

    return url;
  }

  getUrlByImage(image: Image, query: { width?: number, height?: number } = {}, noCache: boolean = false): string {
    let url = `${environment.restUrl}/file/download/image/${image.id}?`;
    if (query.width) {
      url += `&width=${query.width}`;
    }

    if (query.height) {
      url += `&height=${query.height}`;
    }

    if (noCache) {
      url += `&date=${Date.now()}`;
    }

    return url;
  }

  async getDataUrl(url: string): Promise<any> {
    return await fetch(url, {credentials: 'include', cache: 'no-cache'})
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

}
