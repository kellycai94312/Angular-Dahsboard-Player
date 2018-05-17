import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import {PropertyConstant} from '../../../data/local/property-constant';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';

@Component({
  selector: 'app-conversations-page',
  templateUrl: './conversations-page.component.html',
  styleUrls: ['./conversations-page.component.scss']
})
export class ConversationsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput')
  public searchInputElementRef: ElementRef;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public query: PageQuery;

  private _searchInputSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.query = new PageQuery();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._searchInputSubscription = Observable.fromEvent(this.searchInputElementRef.nativeElement, 'keyup')
      .debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async (event: any) => {
        this.query.name = event.target.value;
        await this.resetItems();
      });
  }

  ngOnDestroy(): void {
    this._searchInputSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getActiveMessages(query);
  };

  private async resetItems(): Promise<void> {
    await this.ngxVirtualScrollComponent.reset();
  }

}
