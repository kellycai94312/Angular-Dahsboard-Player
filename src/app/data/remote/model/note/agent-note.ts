import {Note} from './base/note';
import {NoteType} from './base/note-type';

export class AgentNote extends Note {

  public organization: string;

  constructor() {
    super();
    this.discriminator = NoteType.AGENT;
  }

}
