import {Note} from './base/note';
import {NoteType} from './base/note-type';

export class SchoolNote extends Note {

  constructor() {
    super();
    this.discriminator = NoteType.SCHOOL;
  }

}
