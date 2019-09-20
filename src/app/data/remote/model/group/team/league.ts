import { Type } from 'class-transformer';
import { NamedObject } from '../../../base/named-object';
import { SportType } from '../../sport-type';
import { LeagueEnum } from './league-enum';

export class League extends NamedObject {

  @Type(() => SportType)
  public sportType: SportType;

  public leagueEnum: LeagueEnum;

}
