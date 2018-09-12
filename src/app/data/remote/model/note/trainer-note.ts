import {Note} from './base/note';
import {NoteType} from './base/note-type';

export class TrainerNote extends Note {

  public club: string;
  public age: string;

  constructor() {
    super();
    this.discriminator = NoteType.TRAINER;
  }

}
