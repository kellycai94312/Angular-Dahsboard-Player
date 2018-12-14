import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppHelper} from '../../../../utils/app-helper';
import {ISubscription} from 'rxjs-compat/Subscription';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Group} from '../../../../data/remote/model/group/base/group';
import {PersonService} from '../../../person/person-page/service/person.service';

// @Component({
//   selector: 'app-group-person-logs',
//   templateUrl: './group-person-logs.component.html',
//   styleUrls: ['./group-person-logs.component.scss']
// })
export class GroupPersonLogsComponent implements OnDestroy {

  private readonly _paramsSubscription: ISubscription;

  public readonly dateFormat: string;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public query: PageQuery;
  public group: Group;

  constructor(private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService) {
    this.dateFormat = PropertyConstant.dateFormat;
    this.query = new PageQuery();
    this._paramsSubscription = this._activatedRoute.params.subscribe(async value => {
      const groupId = value['id'];
      if (groupId) {
        this.group = await this._participantRestApiService.getGroup({id: groupId});
      } else {
        this.group = null;
      }
      await this.resetItems();
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._paramsSubscription);
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getGroupPersonLogs({}, query, {groupId: this.group.id, personId: this._personService.personViewModel.data.id});
  };

  private async resetItems(): Promise<void> {
    await this.ngxVirtualScrollComponent.reset();
  }

}
