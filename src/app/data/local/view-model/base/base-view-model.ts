import {ParticipantRestApiService} from '../../../remote/rest-api/participant-rest-api.service';
import {AppModule} from '../../../../app.module';

export class BaseViewModel<T> {

  protected participantRestApiService: ParticipantRestApiService;

  public data: T;

  constructor(data: T) {
    this.update(data);

    this.participantRestApiService = AppModule.injector.get(ParticipantRestApiService);
  }

  public update(data: T, initialize: boolean = false) {
    this.data = data;
  }

  public initialize() {
  }

}
