import {ImageType} from '../../remote/model/image-type';
import {Group} from '../../remote/model/group/base/group';
import {UserRole} from '../../remote/model/user-role';
import {Person} from '../../remote/model/person';
import {ParticipantRestApiService} from '../../remote/rest-api/participant-rest-api.service';

export class PersonViewModel {
  public person: Person;
  public imagePersonLogoUrl: string;
  public baseUserRole: UserRole;
  public baseGroup: Group;
  public imageBaseGroupLogoUrl: string;

  constructor(person: Person, baseGroup: Group, private _participantRestApiService: ParticipantRestApiService) {
    this.person = person;
    this.baseGroup = baseGroup;

    this.imagePersonLogoUrl = this._participantRestApiService.getImageUrl({
      clazz: 'person',
      id: person.id,
      type: ImageType.LOGO,
      full: false
    });
    this.imageBaseGroupLogoUrl = this._participantRestApiService.getImageUrl({
      clazz: 'group',
      id: baseGroup.id,
      type: ImageType.LOGO,
      full: false
    });
  }

}
