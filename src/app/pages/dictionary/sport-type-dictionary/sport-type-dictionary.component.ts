import {Component} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'app-sport-type-dictionary',
  templateUrl: './sport-type-dictionary.component.html',
  styleUrls: ['./sport-type-dictionary.component.scss']
})
export class SportTypeDictionaryComponent extends BaseDictionaryComponent {

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper, authorizationService: AuthorizationService) {
    super(participantRestApiService, appHelper, authorizationService);
  }

  public fetchItems = async (query: PageQuery) => {
    return await this.participantRestApiService.getSportTypes(query);
  };

}
