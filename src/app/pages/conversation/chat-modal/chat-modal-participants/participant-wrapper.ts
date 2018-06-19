import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {Participant} from '../../../../data/remote/model/chat/participant';
import {Person} from '../../../../data/remote/model/person';

/**
 * use with {@link HashSet} to exclude participant duplication needed for owner relation
 * */
export class ParticipantWrapper extends IdentifiedObject {
  participant: Participant;
  canEdit: boolean;

  constructor(participant: Participant, editor: Person) {
    super();
    this.participant = participant;
    this.id = participant.person.id;

    if (!participant.baseConversation) { //add/remove person during editing with no persistence
      this.canEdit = true;
    } else if (participant.baseConversation.owner.id == editor.user.id) { //if editor is the chat creator
      this.canEdit = true;
    } else if (participant.owner.id == editor.user.id) { //if editor is the participant creator
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }

  }
}
