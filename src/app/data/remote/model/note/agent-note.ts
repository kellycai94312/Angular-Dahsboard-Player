import { Note } from './base/note';
import { NoteType } from './base/note-type';

export class AgentNote extends Note {
  organization: string;

  constructor() {
    super();
    this.discriminator = NoteType[NoteType.AGENT];
  }

}
