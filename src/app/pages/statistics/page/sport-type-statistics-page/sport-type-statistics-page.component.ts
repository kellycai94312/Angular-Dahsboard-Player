import {Component} from '@angular/core';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {SportType} from '../../../../data/remote/model/sport-type';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sport-type-statistics-page',
  templateUrl: './sport-type-statistics-page.component.html',
  styleUrls: ['./sport-type-statistics-page.component.scss']
})
export class SportTypeStatisticsPageComponent {

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  public fetchItems = async (query: PageQuery) => {
    return await this._participantRestApiService.getSportTypes(query);
  };

  public onEdit = async (obj: SportType) => {
    await this._router.navigate([obj.id, 'stage'], {relativeTo: this._activatedRoute});
  };

}
