import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPersonQuery} from '../../../data/remote/rest-api/query/group-person-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GroupPersonViewModel} from '../../../data/local/view-model/group-person-view-model';
import {GroupService} from '../group.service';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ISubscription} from 'rxjs/Subscription';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';
import {AppHelper} from '../../../utils/app-helper';
import {EditGroupPersonComponent} from '../component/edit-group-person/edit-group-person.component';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {Params} from '@angular/router/src/shared';

@Component({
  selector: 'app-group-persons',
  templateUrl: './group-persons.component.html',
  styleUrls: ['./group-persons.component.scss']
})
export class GroupPersonsComponent implements OnInit, OnDestroy {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public groupId: number;

  public groupPersonQuery: GroupPersonQuery;

  private _activatedRouteSubscription: ISubscription;

  constructor(private _ngxModalService: NgxModalService,
              private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              public groupService: GroupService) {
    this.groupPersonQuery = new GroupPersonQuery();
  }

  async ngOnInit() {
    if (this.groupId) {
      this.groupPersonQuery.id = this.groupId;
    } else {
      this.groupPersonQuery.id = this._activatedRoute.parent.snapshot.params.id;
    }
    this.refreshSubGroupQuery(this._activatedRoute.snapshot.params);

    await this.updateItems();

    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.groupPersonQuery.name = value;
        await this.updateItems();
      });

    this._activatedRouteSubscription = this._activatedRoute.params.skip(1).subscribe(async params => {
      this.groupPersonQuery.name = '';
      this.groupPersonQuery.from = 0;
      this.groupPersonQuery.count = PropertyConstant.pageSize;
      this.refreshSubGroupQuery(params);

      await this.updateItems();
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this.searchDxTextBoxComponent.textChange);
    this._appHelper.unsubscribe(this._activatedRouteSubscription);
  }

  public onEdit = async (event: any, parameter: GroupPersonViewModel) => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'member';

    await modal.componentInstance.initializeBody(EditGroupPersonComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this._appHelper.cloneObject(parameter.data));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            const isSaved = await component.onSave();
            if (isSaved) {
              modal.dismiss();
              await this.updateItems();
            }
          },
        },
      ];

      if (!component.isOwner) {
        modal.componentInstance.splitButtonItems.push({
          nameKey: 'remove',
          callback: async () => {
            const isRemoved = await component.onRemove();
            if (isRemoved) {
              modal.dismiss();
              await this.updateItems();
            }
          },
        });
      }
    });
  };

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(pageQuery);
    return await this._appHelper.pageContainerConverter(pageContainer, async original => {
      const groupPersonViewModel = new GroupPersonViewModel(original);
      await groupPersonViewModel.initialize();
      return groupPersonViewModel;
    });
  };

  private async updateItems() {
    // TODO: Without setTimeout or promise delay not working in other components
    await this._appHelper.delay();
    if (this.ngxVirtualScrollComponent) {
      await this.ngxVirtualScrollComponent.reset();
    }
  }

  private refreshSubGroupQuery(params: Params) {
    const subGroupId: number = +params.id;
    if (subGroupId) {
      this.groupPersonQuery.subGroupId = subGroupId;
    } else {
      delete this.groupPersonQuery.subGroupId;
    }
  }

}
