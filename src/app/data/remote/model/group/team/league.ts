import {NamedObject} from '../../../base/named-object';
import {SportType} from '../../sport-type';
import {LeagueEnum} from './league-enum';

export class League extends NamedObject {
  public sportType: SportType;
  public leagueEnum: LeagueEnum;
}
