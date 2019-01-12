import {ParticipantRestApiService} from '../../../remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {IBaseEditComponent} from './ibase-edit-component';
import {BaseComponent} from './base-component';

export abstract class BaseEditComponent<T> extends BaseComponent<T> implements IBaseEditComponent {

  protected constructor(protected participantRestApiService: ParticipantRestApiService,
                        protected appHelper: AppHelper) {
    super();
  }

  public abstract async onSave(): Promise<boolean>;

  public abstract async onRemove(): Promise<boolean>;

}
