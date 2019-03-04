import {IdentifiedObject} from '../../../../base/identified-object';

/*параметры отображения/скрытия полей в таблице пользователей*/
export class SubgroupPersonInterface extends IdentifiedObject {
  public showBirthYear?: boolean;
  public showRank?: boolean;
  public showStageType?: boolean;
}
