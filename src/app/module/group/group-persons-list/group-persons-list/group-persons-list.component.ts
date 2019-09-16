import {Component, ComponentFactoryResolver, Input, ViewChild} from '@angular/core';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {GroupPersonQuery} from '../../../../data/remote/rest-api/query/group-person-query';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {TemplateModalService} from '../../../../service/template-modal.service';

@Component({
  selector: 'app-group-persons-list',
  templateUrl: './group-persons-list.component.html',
  styleUrls: ['./group-persons-list.component.scss']
})
export class GroupPersonsListComponent {

  @ViewChild(NgxVirtualScrollComponent, { static: false })
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public query: GroupPersonQuery;

  @Input()
  public canEdit: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _appHelper: AppHelper) {
    this.query = new GroupPersonQuery();
  }

  public onEditItem = async (item: GroupPerson) => {
  };

  public fetchItems = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getGroupPersonsByGroup(query);
  };

  public async updateItems() {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
