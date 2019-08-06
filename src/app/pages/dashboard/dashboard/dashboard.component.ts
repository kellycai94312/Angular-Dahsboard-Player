import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';
import {AppHelper} from '../../../utils/app-helper';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {NgxTab} from '../../../module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly tabs: NgxTab[];
  public person: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
    this.tabs = [
      {translation: 'news', link: 'group-news'},
      // {translation: 'personNews', link: 'person-news'}
    ];
  }

  async ngOnInit(): Promise<void> {
    this.person = await this._appHelper.toPromise(this._authorizationService.personSubject);
  }

  public async onLogoChanged() {
    const person = await this._appHelper.toPromise(this._authorizationService.personSubject.asObservable());
    const image = (await this._participantRestApiService.getImages({clazz: FileClass.PERSON, objectId: person.id, type: ImageType.LOGO})).list[0];
    // TODO: Need to refresh image
    this._authorizationService.personSubject.next(person);
  }

}
