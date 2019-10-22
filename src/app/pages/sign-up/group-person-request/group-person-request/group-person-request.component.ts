import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from 'app/data/remote/model/person';
import { PersonType } from 'app/module/group/group-person-request/model/person-type';
import { LayoutService } from 'app/shared/layout.service';

@Component({
  templateUrl: './group-person-request.component.html',
  styleUrls: ['./group-person-request.component.scss']
})
export class GroupPersonRequestComponent implements OnInit, OnDestroy {

  public person = new Person();
  public personType = PersonType.LEGAL_ENTITY;

  constructor(private _layoutService: LayoutService) {
  }

  public ngOnInit(): void {
    this._layoutService.dark.next(true);
  }

  public ngOnDestroy(): void {
    this._layoutService.dark.next(false);
  }

}
