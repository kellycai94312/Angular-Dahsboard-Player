import {Group} from '../../../../data/remote/model/group/base/group';
import {Person} from '../../../../data/remote/model/person';

export class EventData {
  public group: Group;
  public heads: Person[];
  public participants: Person[];
}
