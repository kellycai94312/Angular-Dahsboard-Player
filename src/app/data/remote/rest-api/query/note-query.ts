import { PageQuery } from '../page-query';

export class NoteQuery extends PageQuery {
  name?: string;
  noteType?: string;
  phone?: string;
  email?: string;
  organization?: string;
  club?: string;
  age?: string;
}
