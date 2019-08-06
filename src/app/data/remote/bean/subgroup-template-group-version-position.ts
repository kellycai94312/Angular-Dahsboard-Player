import {Position} from '../model/person-position/position';
import {Person} from '../model/person';
import {Type} from 'class-transformer';

export class SubgroupTemplateGroupVersionPosition {

  @Type(() => Position)
  public position: Position;

  @Type(() => Person)
  public persons: Person[];

}
