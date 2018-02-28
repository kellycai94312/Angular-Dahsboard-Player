import { NamedObject } from '../../../base/named-object';
import { NoteType } from './note-type';

export class Note extends NamedObject {
  discriminator: string;
  phone: string;
  email: string;
  noteType: NoteType;
}
