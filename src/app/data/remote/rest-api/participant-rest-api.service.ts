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
import {Group} from '../model/group/base/group';
import {GroupQuery} from './query/group-query';
import {GroupPerson} from '../model/group/group-person';
import {SubGroup} from '../model/group/sub-group';
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
import {TrainingPerson} from '../model/training/training-person';
import {TrainingGroup} from '../model/training-group';
import {TrainingAccess} from '../misc/training-access';
import {NoteQuery} from './query/note-query';
import {Note} from '../model/note/base/note';
import {NamedQuery} from './named-query';
import {PersonRank} from '../model/person-rank';
import {Measure} from '../model/measure';
import {AnthropometryQuery} from './query/anthropometry-query';
import {BaseTrainingQuery} from './query/base-training-query';
import {BaseTraining} from '../model/training/base/base-training';
import {TrainingPart} from '../model/training/training-part';
import {TrainingPersonQuery} from './query/training-person-query';
import {PersonMeasureValue} from '../bean/person-measure-value';
import {PageQuery} from './page-query';
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
import {BaseContact} from '../model/contact/base/base-contact';
import {Requisites} from '../model/requisites';
import {environment} from '../../../../environments/environment';
import {TrainingReport} from '../model/training/report/training-report';
import {TrainingBlockQuery} from './query/training-block-query';
import {TrainingPersonMeasure} from '../bean/training-person-measure';
import {PersonMeasure} from '../bean/person-measure';
import {TrainingBlock} from '../model/training/report/training-block';
import {GroupPersonLog} from '../model/group/group-person-log';
import {GroupConnection} from '../model/group/group-connection';
import {MedicalExamination} from '../model/person/medical-examination';
import {StageQuery} from './query/stage-query';
import {StageStandard} from '../model/stage/stage-standard';
import {Stage} from '../model/stage/stage';
import {StringWrapper} from '../bean/wrapper/string-wrapper';
import {StageType} from '../model/stage/stage-type';
import {AthleteState} from '../model/person/athlete-state';
import {PublicUserRole} from '../model/group/public-user-role';
import {StagePerson} from '../bean/stage-person';
import {StagePersonRank} from '../bean/stage-person-rank';
import {EstimatedParameter} from '../model/training/testing/estimated-parameter';
import {StageStandardMeasureValue} from '../bean/stage-standard-measure-value';
import {SportTypePerson} from '../bean/sport-type-person';
import {ActivityQuery} from './query/activity-query';
import {BaseExercise} from '../model/exercise/base/base-exercise';
import {Tag} from '../model/tag';
import {GroupScore} from '../model/training/game/group-score';
import {EventPlanQuery} from './query/event/plan/event-plan-query';
import {EventPlan} from '../model/training/plan/event-plan';
import {EventPlanPerson} from '../model/training/plan/event-plan-person';
import {EventPlanLoadTypeEnum} from '../model/training/plan/event-plan-load-type-enum';
import {Period} from '../../local/period';
import {EventPlanLoadPeriod} from '../bean/event-plan-load-period';
import {EventPlanLoad} from '../model/training/plan/event-plan-load';
import {EventPlanTrainingValueEnum} from '../model/training/plan/event-plan-training-value-enum';
import {EventGroupQuery} from './query/event/event-group-query';
import {Rank} from '../model/rank';
import {GroupPersonTransition} from '../model/group/transition/group-person-transition';
import {GroupPersonsTransferRequest} from '../request/group-persons-transfer-request';
import {GroupTransition} from '../model/group/transition/group-transition';
import {OrganizationType} from '../model/group/organization/organization-type';
import {GroupRequest} from '../request/group-request';
import {OrganizationTrainer} from '../model/group/organization-trainer';
import {GroupPersonQuery} from './query/group-person-query';
import {VersionObject} from '../base/version/version-object';
import {VersionObjectRequest} from '../request/version-object-request';
import {GroupNews} from '../model/group/group-news';

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
  getUserRoles: IRestMethod<void, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/user/{!userId}/role'
  })
  getUserUserRoles: IRestMethod<{ userId: number }, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Post,
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

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/training',
  })
  getPersonTrainings: IRestMethodStrict<{}, BaseTrainingQuery, { personId: number }, PageContainer<TrainingPerson>>;

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

  //#region StageStandard

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/person/{!personId}/stage/{!stageId}/sportType/{!sportTypeId}'
  })
  getStageStandardMeasureValues: IRestMethodStrict<any, PageQuery, { personId: number, stageId: number, sportTypeId: number }, PageContainer<StageStandardMeasureValue>>;

  ///#endregion

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
    path: '/group',
  })
  getGroups: IRestMethod<GroupQuery, PageContainer<Group>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group',
  })
  createGroup: IRestMethod<GroupRequest, Group>;

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
  getGroupTrainings: IRestMethodStrict<{}, BaseTrainingQuery, { groupId: number }, PageContainer<TrainingGroup>>;

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
    path: '/group/{!groupId}/person/{!personId}',
  })
  getGroupPerson: IRestMethod<{ groupId: number, personId: number }, GroupPerson>;

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
    path: '/group/{!groupId}/person/{!personId}/subgroup',
  })
  postPersonSubgroup: IRestMethodStrict<{ id?: number }, any, { groupId: number, personId: number }, GroupPerson>;

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
    path: '/group/{!groupId}/person/{!personId}/userRole',
  })
  getGroupPersonUserRoles: IRestMethod<{ groupId: number, personId: number }, UserRole[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/person/{!personId}/userRole',
  })
  updateGroupPersonUserRoles: IRestMethodStrict<ListRequest<UserRole>, any, { groupId: number, personId: number }, UserRole[]>;

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

  //#region GroupConnection

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/connection',
  })
  getGroupConnections: IRestMethodStrict<any, GroupQuery, { groupId: number }, PageContainer<GroupConnection>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/connection/graph',
  })
  getGraphGroupConnections: IRestMethodStrict<any, { depth?: number }, { groupId: number }, GroupConnection[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/connection',
  })
  createGroupConnection: IRestMethodStrict<GroupConnection, any, { groupId: number }, GroupConnection>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/connection/{!groupConnectionId}',
  })
  removeGroupConnection: IRestMethod<{ groupId: number, groupConnectionId: number }, GroupConnection>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/connection/{!groupConnectionId}/approve',
  })
  approveGroupConnection: IRestMethod<{ groupId: number, groupConnectionId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/connection/{!groupConnectionId}/approve',
  })
  disapproveGroupConnection: IRestMethod<{ groupId: number, groupConnectionId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/connection/{!groupConnectionId}/visible',
  })
  visibleGroupConnection: IRestMethodStrict<any, any, { groupId: number, groupConnectionId: number }, void>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/connection/{!groupConnectionId}/visible',
  })
  invisibleGroupConnection: IRestMethodStrict<any, any, { groupId: number, groupConnectionId: number }, void>;

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
  })
  getGroupNewsItems: IRestMethodStrict<any, PageQuery, { groupId: number }, PageContainer<GroupNews>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/group/{!groupId}/news/{!groupNewsId}',
  })
  getGroupNews: IRestMethodStrict<any, PageQuery, { groupId: number, groupNewsId: number }, GroupNews>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/group/{!groupId}/news',
  })
  createGroupNews: IRestMethodStrict<GroupNews, any, { groupId: number }, GroupNews>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/group/{!groupId}/news/{!groupNewsId}',
  })
  updateGroupNews: IRestMethodStrict<GroupNews, any, { groupId: number, groupNewsId: number }, GroupNews>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/group/{!groupId}/news/{!groupNewsId}',
  })
  removeGroupNews: IRestMethod<{ groupId: number, groupNewsId: number }, GroupNews>;

  //#endregion

  //#endregion

  //#region File

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/file/download/image'
  })
  downloadImage: IRestMethod<ImageQuery, void>;

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
    method: RestRequestMethod.Delete,
    path: '/file/{!fileId}'
  })
  removeFile: IRestMethod<{ fileId: number }, BaseFile>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/file/{!fileId}/resource'
  })
  removeFileResource: IRestMethod<{ fileId: number }, BaseFile>;

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
    return this.http.post<T[]>(`${environment.restUrl}/file`, formData, {withCredentials: true}).toPromise();
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

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining'
  })
  getBaseTrainings: IRestMethod<BaseTrainingQuery, PageContainer<BaseTraining>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!id}'
  })
  getBaseTraining: IRestMethod<{ id: number, measureParameterEnum?: string }, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining'
  })
  createBaseTraining: IRestMethod<BaseTraining, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/baseTraining/{!id}'
  })
  updateBaseTraining: IRestMethodStrict<BaseTraining, any, { id: number }, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/baseTraining/{!eventId}'
  })
  removeEvent: IRestMethod<{ eventId: number }, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/template'
  })
  createEventTemplate: IRestMethod<IdRequest, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/baseTraining/{!eventId}/template'
  })
  updateEventTemplate: IRestMethodStrict<IdRequest, any, { eventId: number }, BaseTraining>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/baseTraining/{!id}/state'
  })
  updateBaseTrainingState: IRestMethodStrict<TrainingStateRequest, any, { id: number }, BaseTraining>;

  //#region Group

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!eventId}/group'
  })
  getTrainingGroupsByBaseTraining: IRestMethodStrict<any, EventGroupQuery, { eventId: number }, PageContainer<TrainingGroup>>;

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

  //#region Game

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/game/{!gameId}/group/{!trainingGroupId}/part/{!trainingPartId}/personMeasure',
  })
  getPersonMeasures: IRestMethod<{ gameId: number, trainingGroupId: number, trainingPartId: number }, TrainingPersonMeasure<ExerciseExecMeasureValue>[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/game/{!gameId}/group/{!trainingGroupId}/personMeasure',
  })
  getTotalPersonMeasures: IRestMethod<{ gameId: number, trainingGroupId: number }, TrainingPersonMeasure<PersonMeasureValue>[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/game/{!gameId}/score',
  })
  getGameGroupScores: IRestMethod<{ gameId: number, measureParameterEnum: string }, GroupScore[]>;

  //#endregion

  //#region TrainingPerson

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseTraining/{!eventId}/person'
  })
  getTrainingPersons: IRestMethodStrict<any, TrainingPersonQuery, { eventId: number }, PageContainer<TrainingPerson>>;

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

  //#region Event plan

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPlan'
  })
  getEventPlans: IRestMethod<EventPlanQuery, PageContainer<EventPlan>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPlan/{!eventPlanId}'
  })
  getEventPlan: IRestMethod<{ eventPlanId: number }, EventPlan>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan'
  })
  createEventPlan: IRestMethod<EventPlan, EventPlan>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/eventPlan/{!eventPlanId}'
  })
  updateEventPlan: IRestMethodStrict<EventPlan, any, { eventPlanId: number }, EventPlan>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/eventPlan/{!eventPlanId}'
  })
  removeEventPlan: IRestMethod<{ eventPlanId: number }, EventPlan>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan/template'
  })
  createEventPlanTemplate: IRestMethod<IdRequest, EventPlan>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan/{!eventPlanId}/template'
  })
  updateEventPlanTemplate: IRestMethodStrict<IdRequest, any, { eventPlanId: number }, EventPlan>;

  //#region Event plan person

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPlan/{!eventPlanId}/person'
  })
  getEventPlanPersons: IRestMethodStrict<any, PersonQuery, { eventPlanId: number }, PageContainer<EventPlanPerson>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan/{!eventPlanId}/person'
  })
  createEventPlanPerson: IRestMethodStrict<EventPlanPerson, any, { eventPlanId: number }, EventPlanPerson>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/eventPlan/{!eventPlanId}/person/{!eventPlanPersonId}'
  })
  updateEventPlanPerson: IRestMethodStrict<EventPlanPerson, any, { eventPlanId: number, eventPlanPersonId: number }, EventPlanPerson>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/eventPlan/{!eventPlanId}/person/{!eventPlanPersonId}'
  })
  removeEventPlanPerson: IRestMethod<{ eventPlanId: number, eventPlanPersonId: number }, EventPlanPerson>;

  //#endregion

  //#region Event plan group

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPlan/{!eventPlanId}/group'
  })
  getEventPlanGroups: IRestMethodStrict<any, GroupQuery, { eventPlanId: number }, PageContainer<Group>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan/{!eventPlanId}/group'
  })
  updateEventPlanGroups: IRestMethodStrict<ListRequest<IdRequest>, any, { eventPlanId: number }, Group[]>;

  //#endregion

  //#region Event plan sport role

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPlan/{!eventPlanId}/sportRole'
  })
  getEventPlanSportRoles: IRestMethodStrict<any, { unassigned?: number }, { eventPlanId: number }, SportRole[]>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan/{!eventPlanId}/sportRole'
  })
  updateEventPlanSportRoles: IRestMethodStrict<ListRequest<IdRequest>, any, { eventPlanId: number }, SportRole[]>;

  //#endregion

  //#region Event plan estimated parameters

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPlan/{!eventPlanId}/estimatedParameter'
  })
  getEventPlanEstimatedParameters: IRestMethodStrict<any, { unassigned?: number, count: number }, { eventPlanId: number }, PageContainer<EstimatedParameter>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan/{!eventPlanId}/estimatedParameter'
  })
  updateEventPlanEstimatedParameters: IRestMethodStrict<ListRequest<IdRequest>, any, { eventPlanId: number }, EstimatedParameter[]>;

  //#endregion


  //#region Event plan load

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/eventPlan/{!eventPlanId}/load'
  })
  getEventPlanLoads: IRestMethod<{ eventPlanId: number, eventPlanLoadTypeEnum: EventPlanLoadTypeEnum, eventPlanPeriodEnum: Period, eventPlanTrainingValueEnum?: EventPlanTrainingValueEnum, trainingId?: number, from?: number, count?: number }, PageContainer<EventPlanLoadPeriod>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/eventPlan/{!eventPlanId}/load'
  })
  createEventPlanLoad: IRestMethodStrict<EventPlanLoad, {}, { eventPlanId: number }, EventPlanLoad>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/eventPlan/{!eventPlanId}/load/{!eventPlanLoadId}'
  })
  updateEventPlanLoad: IRestMethodStrict<EventPlanLoad, {}, { eventPlanId: number, eventPlanLoadId: number }, EventPlanLoad>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/eventPlan/{!eventPlanId}/load/{!eventPlanLoadId}'
  })
  removeEventPlanLoad: IRestMethod<{ eventPlanId: number, eventPlanLoadId: number }, EventPlanLoad>;

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

  //#region TrainingReport

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport'
  })
  getTrainingReports: IRestMethod<PageQuery, PageContainer<TrainingReport>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport/{!trainingReportId}'
  })
  getTrainingReport: IRestMethod<{ trainingReportId: number }, TrainingReport>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/trainingReport'
  })
  createTrainingReport: IRestMethod<TrainingReport, TrainingReport>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/trainingReport/{!trainingReportId}'
  })
  updateTrainingReport: IRestMethodStrict<TrainingReport, any, { trainingReportId: number }, TrainingReport>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/trainingReport/{!trainingReportId}'
  })
  removeTrainingReport: IRestMethod<{ trainingReportId: number }, TrainingReport>;

  //#endregion

  //#region TrainingBlock

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport/{!trainingReportId}/block'
  })
  getTrainingBlocks: IRestMethodStrict<any, PageQuery, { trainingReportId: number }, PageContainer<TrainingBlock>>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}'
  })
  getTrainingBlock: IRestMethod<{ trainingReportId: number, trainingBlockId: number }, TrainingBlock>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/trainingReport/{!trainingReportId}/block'
  })
  createTrainingBlock: IRestMethodStrict<TrainingBlock, any, { trainingReportId: number }, TrainingBlock>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}'
  })
  updateTrainingBlock: IRestMethodStrict<TrainingBlock, any, { trainingReportId: number, trainingBlockId: number }, TrainingBlock>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}'
  })
  removeTrainingBlock: IRestMethod<{ trainingReportId: number, trainingBlockId: number }, TrainingBlock>;

  //#region Group

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}/group'
  })
  getTrainingBlockGroups: IRestMethodStrict<any, TrainingBlockQuery, { trainingReportId: number, trainingBlockId: number }, PageContainer<Group>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}/group'
  })
  updateTrainingBlockGroups: IRestMethodStrict<ListRequest<Group>, any, { trainingReportId: number, trainingBlockId: number }, Group[]>;

  //#endregion

  //#region Exercise measure

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}/exerciseMeasure'
  })
  getTrainingBlockExerciseMeasures: IRestMethodStrict<any, TrainingBlockQuery, { trainingReportId: number, trainingBlockId: number }, PageContainer<ExerciseMeasure>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}/exerciseMeasure'
  })
  updateTrainingBlockExerciseMeasures: IRestMethodStrict<ListRequest<ExerciseMeasure>, any, { trainingReportId: number, trainingBlockId: number }, ExerciseMeasure[]>;

  //#endregion

  //#region Person

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}/person'
  })
  getTrainingBlockPersons: IRestMethodStrict<any, TrainingBlockQuery, { trainingReportId: number, trainingBlockId: number }, PageContainer<Person>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}/person'
  })
  updateTrainingBlockPersons: IRestMethodStrict<ListRequest<Person>, any, { trainingReportId: number, trainingBlockId: number }, Person[]>;

  //#endregion

  //#region Result

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/trainingReport/{!trainingReportId}/block/{!trainingBlockId}/result'
  })
  getTrainingBlockResults: IRestMethodStrict<any, TrainingBlockQuery, { trainingReportId: number, trainingBlockId: number }, PersonMeasure[]>;

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
    path: '/sportType/{!sportTypeId}/stagePerson',
  })
  getStagePersons: IRestMethod<{ sportTypeId: number }, StagePerson[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/{!sportTypeId}/stagePersonRank',
  })
  getStagePersonRanks: IRestMethodStrict<any, { stageTypeId: number }, { sportTypeId: number }, StagePersonRank[]>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/sportType/person',
  })
  getSportTypePersons: IRestMethod<void, SportTypePerson[]>;

  //#endregion

  //#region EstimatedParameter

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/estimatedParameter',
  })
  getEstimatedParameters: IRestMethod<PageQuery, PageContainer<EstimatedParameter>>;

  //#endregion

  //#region StageStandard

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/stageStandard'
  })
  getStageStandards: IRestMethod<StageQuery, PageContainer<StageStandard>>;

  @RestAction({
    method: RestRequestMethod.Post,
    path: '/stageStandard'
  })
  createStageStandard: IRestMethod<StageStandard, StageStandard>;

  @RestAction({
    method: RestRequestMethod.Put,
    path: '/stageStandard/{!stageStandardId}'
  })
  updateStageStandard: IRestMethodStrict<StageStandard, any, { stageStandardId: number }, StageStandard>;

  @RestAction({
    method: RestRequestMethod.Delete,
    path: '/stageStandard/{!stageStandardId}'
  })
  removeStageStandard: IRestMethod<{ stageStandardId: number }, StageStandard>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/stageStandard/exerciseMeasure/unassigned'
  })
  getUnassignedExerciseMeasuresByStage: IRestMethod<StageQuery, PageContainer<ExerciseMeasure>>;

  //#endregion

  //#region Activity

  @RestAction({
    method: RestRequestMethod.Get,
    path: '/baseExercise'
  })
  getActivities: IRestMethod<ActivityQuery, PageContainer<BaseExercise>>;

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

}
