import {ParticipantRestApiService} from '../../../remote/rest-api/participant-rest-api.service';
import {AppModule} from '../../../../app.module';
import {Input} from '@angular/core';

export class BaseViewModel<T> {

  protected participantRestApiService: ParticipantRestApiService;

  @Input()
  public data: T;
  public url: string;

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
