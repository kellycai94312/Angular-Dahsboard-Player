import {PageQuery} from '../page-query';
import {NoteType} from '../../model/note/base/note-type';

export class NoteQuery extends PageQuery {
  name?: string;
  noteType?: NoteType;
  phone?: string;
  email?: string;
  organization?: string;
  club?: string;
  age?: string;
}
