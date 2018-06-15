import {ParticipantRestApiService} from '../../../remote/rest-api/participant-rest-api.service';
import {AppModule} from '../../../../app.module';
import {Input} from '@angular/core';
import {ImageService} from '../../../../shared/image.service';

export class BaseViewModel<T> {

  participantRestApiService: ParticipantRestApiService;
  imageService: ImageService;

  @Input()
  public data: T;
  public url: string;

  constructor(data: T) {
    this.participantRestApiService = AppModule.injector.get(ParticipantRestApiService);
    this.imageService = AppModule.injector.get(ImageService);

    this.update(data);
  }

  public update(data: T, initialize: boolean = false) {
    this.data = data;
  }

  public initialize() {
  }

}
