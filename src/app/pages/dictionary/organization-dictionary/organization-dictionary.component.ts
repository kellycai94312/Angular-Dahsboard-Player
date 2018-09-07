import {Component} from '@angular/core';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';

@Component({
  selector: 'app-organization-dictionary',
  templateUrl: './organization-dictionary.component.html',
  styleUrls: ['./organization-dictionary.component.scss']
})
export class OrganizationDictionaryComponent extends BaseDictionaryComponent {

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper, authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper, authorizationService);
  }

}
