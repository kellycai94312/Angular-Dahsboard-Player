import {ImageType} from '../../remote/model/image-type';
import {Group} from '../../remote/model/group/base/group';
import {UserRole} from '../../remote/model/user-role';
import {Person} from '../../remote/model/person';
import {ParticipantRestApiService} from '../../remote/rest-api/participant-rest-api.service';

export class PersonItemViewModel {
  public readonly person: Person;
  public readonly url: string;
  public readonly imagePersonLogoUrl: string;
  public baseUserRole: UserRole;
  public baseGroup: Group;
  public imageBaseGroupLogoUrl: string;
  protected participantRestApiService: ParticipantRestApiService;

  constructor(person: Person, participantRestApiService: ParticipantRestApiService) {
    this.person = person;
    this.participantRestApiService = participantRestApiService;
    this.url = `/person/${person.id}`;

    this.imagePersonLogoUrl = participantRestApiService.getImageUrl({
      clazz: 'person',
      id: person.id,
      type: ImageType.LOGO,
      full: false
    });
  }

  public async init() {
    try {
      this.baseUserRole = await this.participantRestApiService.getBaseUserRoleByUser({id: this.person.user.id});
      if (this.baseUserRole != null) {
        const baseGroupPerson = await this.participantRestApiService.getBaseGroup({
          id: this.person.id,
          userRoleId: this.baseUserRole.id
        });
        this.baseGroup = baseGroupPerson.group;
        if (this.baseGroup != null) {
          this.imageBaseGroupLogoUrl = this.participantRestApiService.getImageUrl({
            clazz: 'group',
            id: this.baseGroup.id,
            type: ImageType.LOGO,
            full: false
          });
        }
      }
    } catch (e) {
    }
  }

}
