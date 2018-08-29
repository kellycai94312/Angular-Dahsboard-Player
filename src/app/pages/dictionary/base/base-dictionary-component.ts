import {OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';

export class BaseDictionaryComponent implements OnInit {

  public canEdit: boolean;

  constructor(protected participantRestApiService: ParticipantRestApiService,
              protected appHelper: AppHelper,
              protected authorizationService: AuthorizationService) {
  }

  public async ngOnInit(): Promise<void> {
    this.canEdit = await this.authorizationService.hasUserRole(UserRoleEnum.ADMIN);
  }

}
