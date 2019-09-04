import {IdentifiedObject} from '../../../../base/identified-object';
import {AppliedPollType} from './applied-poll-type';
import {PollVersion} from '../../poll-version';
import {Type} from 'class-transformer';

export class BaseAppliedPoll extends IdentifiedObject {

  public discriminator: AppliedPollType;

  @Type(() => PollVersion)
  public pollVersion: PollVersion;

  //region Transient

  public personsCount: number;

  //endregion
}
