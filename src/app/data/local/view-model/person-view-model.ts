import {ImageType} from '../../remote/model/image-type';
import {Group} from '../../remote/model/group/base/group';
import {UserRole} from '../../remote/model/user-role';
import {Person} from '../../remote/model/person';
import {ParticipantRestApiService} from '../../remote/rest-api/participant-rest-api.service';

export class PersonViewModel {
  public person: Person;
  public url: string;
  public imagePersonLogoUrl: string;
  public baseUserRole: UserRole;
  public baseGroup: Group;
  public imageBaseGroupLogoUrl: string;

  constructor(person: Person, baseUserRole: UserRole, baseGroup: Group, participantRestApiService: ParticipantRestApiService) {
    this.person = person;
    this.baseUserRole = baseUserRole;
    this.baseGroup = baseGroup;
    this.url = `/person/${person.id}`;

    this.imagePersonLogoUrl = participantRestApiService.getImageUrl({
      clazz: 'person',
      id: person.id,
      type: ImageType.LOGO,
      full: false
    });

    if (baseGroup != null) {
      this.imageBaseGroupLogoUrl = participantRestApiService.getImageUrl({
        clazz: 'group',
        id: baseGroup.id,
        type: ImageType.LOGO,
        full: false
      });
    }
  }

}
