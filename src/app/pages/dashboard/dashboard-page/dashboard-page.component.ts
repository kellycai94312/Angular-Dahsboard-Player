import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';
import {AppHelper} from '../../../utils/app-helper';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {NgxTab} from '../../../module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly tabs: NgxTab[];
  public selectedTab: NgxTab;
  public person: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
    this.tabs = [
      {translation: 'news', link: '/dashboard'}
    ];
    this.selectedTab = this.tabs[0];
  }

  async ngOnInit(): Promise<void> {
    this.person = await this._appHelper.toPromise(this._authorizationService.personSubject);
    await this.resetItems();
  }

  public async onLogoChanged() {
    const person = await this._appHelper.toPromise(this._authorizationService.personSubject.asObservable());
    const image = (await this._participantRestApiService.getImages({clazz: FileClass.PERSON, objectId: person.id, type: ImageType.LOGO})).list[0];
    // TODO: Need to refresh image
    this._authorizationService.personSubject.next(person);
  }

  public fetchItems = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getPersonNewsItems(pageQuery);
  };

  private async resetItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
