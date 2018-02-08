import {GroupPerson} from '../../remote/model/group/group-person';
import {PersonViewModel} from './person-view-model';
import {ParticipantRestApiService} from '../../remote/rest-api/participant-rest-api.service';

export class GroupPersonViewModel extends PersonViewModel {

  public groupPerson: GroupPerson;
  protected participantRestApiService: ParticipantRestApiService;

  constructor(groupPerson: GroupPerson, participantRestApiService: ParticipantRestApiService) {
    super(groupPerson.person, participantRestApiService);
    this.participantRestApiService = participantRestApiService;
    this.groupPerson = groupPerson;
  }

}
