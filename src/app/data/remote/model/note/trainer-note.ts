import { Note } from './base/note';
import { NoteType } from './base/note-type';

export class TrainerNote extends Note {
  club: string;
  age: string;

  constructor() {
    super();
    this.discriminator = NoteType[NoteType.TRAINER];
  }

}
