import {Component} from '@angular/core';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppHelper} from '../../../../utils/app-helper';
import {SportTypePerson} from '../../../../data/remote/bean/sport-type-person';

@Component({
  selector: 'app-sport-type-statistics-page',
  templateUrl: './sport-type-statistics-page.component.html',
  styleUrls: ['./sport-type-statistics-page.component.scss']
})
export class SportTypeStatisticsPageComponent {

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _appHelper: AppHelper) {
  }

  public fetchItems = async (query: PageQuery) => {
    return this._appHelper.arrayToPageContainer(await this._participantRestApiService.getSportTypePersons());
  };

  public onEdit = async (obj: SportTypePerson) => {
    await this._router.navigate([obj.sportType.id, 'stage'], {relativeTo: this._activatedRoute});
  };

}
