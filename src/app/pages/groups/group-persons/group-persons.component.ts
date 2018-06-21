import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPersonQuery} from '../../../data/remote/rest-api/query/group-person-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GroupPersonViewModel} from '../../../data/local/view-model/group-person-view-model';
import {GroupService} from '../group.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupPersonModalComponent} from '../group-person-modal/group-person-modal.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ISubscription} from 'rxjs/Subscription';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';
import {AppHelper} from '../../../utils/app-helper';

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

  private readonly _activatedRouteSubscription: ISubscription;

  constructor(private _modalService: NgbModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              public groupService: GroupService) {
    this.groupPersonQuery = new GroupPersonQuery();

    this._activatedRouteSubscription = this._activatedRoute.params.subscribe(async params => {
      const subGroupId: number = +params.id;

      this.groupPersonQuery.name = '';
      this.groupPersonQuery.from = 0;
      this.groupPersonQuery.count = PropertyConstant.pageSize;

      if (subGroupId) {
        this.groupPersonQuery.subGroupId = subGroupId;
      } else {
        delete this.groupPersonQuery.subGroupId;
      }
      await this.updateItems();
    });
  }

  async ngOnInit() {
    if (this.groupId) {
      this.groupPersonQuery.id = this.groupId;
    } else {
      this.groupPersonQuery.id = this._activatedRoute.parent.snapshot.params.id;
    }

    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.groupPersonQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
    this._activatedRouteSubscription.unsubscribe();
  }

  public onEdit(groupPersonViewModel: GroupPersonViewModel) {
    const modalRef = this._modalService.open(GroupPersonModalComponent, {size: 'lg'});
    modalRef.componentInstance.groupPerson = groupPersonViewModel.data;
    modalRef.componentInstance.onChangeGroupPerson = async () => this.updateItems();
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(pageQuery);
    return await this._appHelper.pageContainerConverter(pageContainer, async original => {
      const groupPersonViewModel = new GroupPersonViewModel(original);
      await groupPersonViewModel.initialize();
      return groupPersonViewModel;
    });
  };

  private async updateItems() {
    if (this.ngxVirtualScrollComponent) {
      await this.ngxVirtualScrollComponent.reset();
    }
  }

}
