import {Component} from '@angular/core';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {SportType} from '../../../../data/remote/model/sport-type';
import {StagePersonsComponent} from '../../component/stage-persons/stage-persons.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';

@Component({
  selector: 'app-sport-type-statistics-page',
  templateUrl: './sport-type-statistics-page.component.html',
  styleUrls: ['./sport-type-statistics-page.component.scss']
})
export class SportTypeStatisticsPageComponent {

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService) {
  }

  public fetchItems = async (query: PageQuery) => {
    return await this._participantRestApiService.getSportTypes(query);
  };

  public onEdit = async (obj: SportType) => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(StagePersonsComponent, async component => {
      component.sportType = obj;
    });
  };

}
