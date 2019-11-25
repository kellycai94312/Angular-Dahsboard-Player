import { NamedObject } from 'app/data/remote/base';

export class SportType extends NamedObject {

  public number: string;

  //region Transient

  public bookmarked?: boolean;

  //endregion

}
