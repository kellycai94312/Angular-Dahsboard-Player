import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {Participant} from '../../../../data/remote/model/chat/participant';
import {Person} from '../../../../data/remote/model/person';

/**
 * use with {@link HashSet} to exclude participant duplication needed for owner relation
 * */
export class ParticipantWrapper extends IdentifiedObject {
  private _participant: Participant;
  private _canEdit: boolean;

  constructor(participant: Participant, editor: Person) {
    super();
    this._participant = participant;
    this.id = participant.person.id;

    if (!participant.baseConversation) { //add/remove person during editing with no persistence
      this._canEdit = true;
    } else if (participant.baseConversation.owner.id == editor.user.id) { //if editor is the chat creator
      this._canEdit = true;
    } else if (participant.owner.id == editor.user.id) { //if editor is the participant creator
      this._canEdit = true;
    } else {
      this._canEdit = false;
    }
  }

  get participant(): Participant {
    return this._participant;
  }

  set participant(value: Participant) {
    this._participant = value;
  }

  get canEdit(): boolean {
    return this._canEdit;
  }

  set canEdit(value: boolean) {
    this._canEdit = value;
  }

}
