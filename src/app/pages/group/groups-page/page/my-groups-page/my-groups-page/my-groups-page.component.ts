import {Component} from '@angular/core';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';

@Component({
  selector: 'app-my-groups-page',
  templateUrl: './my-groups-page.component.html',
  styleUrls: ['./my-groups-page.component.scss']
})
export class MyGroupsPageComponent {

  public groupQuery: GroupQuery;

  constructor() {
    this.groupQuery = {
      name: '',
      count: PropertyConstant.pageSize,
      all: false
    };
  }

}
