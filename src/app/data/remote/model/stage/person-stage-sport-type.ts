import {IdentifiedObject} from '../../base/identified-object';
import {Stage} from './stage';

export class PersonStageSportType extends IdentifiedObject {
  public stage: Stage;
  public duration: number;
  public assignDate: Date;
}
