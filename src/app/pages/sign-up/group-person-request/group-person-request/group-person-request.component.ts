import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupClaimRequest, GroupPersonClaimRequest } from 'app/data/remote/bean/claim';
import { Group } from 'app/data/remote/model/group/base';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { PersonType } from 'app/module/group/group-person-request/model/person-type';
import { LayoutService } from 'app/shared/layout.service';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './group-person-request.component.html',
  styleUrls: ['./group-person-request.component.scss']
})
export class GroupPersonRequestComponent implements OnInit, OnDestroy {

  public group: Group;
  public personType = PersonType.LEGAL_ENTITY;
  public claimRequest: GroupPersonClaimRequest | GroupClaimRequest;
  private readonly _destroyComponentSubject = new Subject();

  constructor(private _layoutService: LayoutService,
              private _groupApiService: GroupApiService,
              private _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._layoutService.dark.next(true);

    this._activatedRoute.queryParams
      .pipe(
        switchMap(value => {
          this.personType = value.personType && (value.personType as string).toLowerCase() === PersonType.LEGAL_ENTITY.toLowerCase() ? PersonType.LEGAL_ENTITY : PersonType.INDIVIDUAL;
          this.claimRequest = this.personType === PersonType.INDIVIDUAL ? new GroupPersonClaimRequest() : new GroupClaimRequest();
          return value.inn ? this._groupApiService.getGroupByInn(value.inn) : of(void 0);
        }),
        takeUntil(this._destroyComponentSubject)
      )
      .subscribe(value => {
        this.group = value;
      });
  }

  public ngOnDestroy(): void {
    this._destroyComponentSubject.next();
    this._destroyComponentSubject.complete();
    this._layoutService.dark.next(false);
  }

}
