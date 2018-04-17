import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPersonQuery} from '../../../data/remote/rest-api/query/group-person-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GroupPersonViewModel} from '../../../data/local/view-model/group-person-view-model';
import {GroupService} from '../group.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupPersonModalComponent} from '../group-person-modal/group-person-modal.component';
import {InfiniteListComponent} from '../../../components/infinite-list/infinite-list.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../data/remote/bean/page-container';

@Component({
  selector: 'app-group-persons',
  templateUrl: './group-persons.component.html',
  styleUrls: ['./group-persons.component.scss']
})
export class GroupPersonsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(InfiniteListComponent)
  public infiniteListComponent: InfiniteListComponent;

  @Input()
  public groupId: number;

  public groupPersonQuery: GroupPersonQuery;

  constructor(private _modalService: NgbModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              public groupService: GroupService) {
    this.groupPersonQuery = new GroupPersonQuery();

    this._activatedRoute.params.subscribe(async params => {
      const subGroupId: number = +params.id;

      this.groupPersonQuery.fullName = '';
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

  ngOnInit() {
  }

  async ngAfterViewInit() {
    if (this.groupId) {
      this.groupPersonQuery.id = this.groupId;
    } else {
      this.groupPersonQuery.id = this._activatedRoute.parent.snapshot.params.id;
    }

    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.groupPersonQuery.fullName = value;
        await this.updateItems();
      });
    await this.infiniteListComponent.initialize();
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
  }

  public onEdit(groupPersonViewModel: GroupPersonViewModel) {
    const modalRef = this._modalService.open(GroupPersonModalComponent, {size: 'lg'});
    modalRef.componentInstance.groupPerson = groupPersonViewModel.data;
    modalRef.componentInstance.onChangeGroupPerson = async () => this.updateItems();
  }

  public getItems: Function = async (pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(pageQuery);
    const items = await Promise.all(pageContainer.list.map(async x => {
      const groupPersonViewModel = new GroupPersonViewModel(x);
      await groupPersonViewModel.initialize();
      return groupPersonViewModel;
    }));

    const newPageContainer = new PageContainer(items);
    newPageContainer.size = pageContainer.size;
    newPageContainer.total = pageContainer.total;
    return newPageContainer;
  };

  private async updateItems() {
    if (this.infiniteListComponent) {
      await this.infiniteListComponent.update(true);
    }
  }

}
