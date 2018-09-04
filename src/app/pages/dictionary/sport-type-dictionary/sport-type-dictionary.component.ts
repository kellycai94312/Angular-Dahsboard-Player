import {Component} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {StagePersonsComponent} from '../component/stage-persons/stage-persons.component';
import {SportType} from '../../../data/remote/model/sport-type';

@Component({
  selector: 'app-sport-type-dictionary',
  templateUrl: './sport-type-dictionary.component.html',
  styleUrls: ['./sport-type-dictionary.component.scss']
})
export class SportTypeDictionaryComponent extends BaseDictionaryComponent {

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper, authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper, authorizationService);
  }

  public fetchItems = async (query: PageQuery) => {
    return await this.participantRestApiService.getSportTypes(query);
  };

  public onEdit = async (obj: SportType) => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(StagePersonsComponent, async component => {
      component.sportTypeId = obj.id;
    });
  };

}
