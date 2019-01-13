import {Component} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {GroupPersonPosition} from '../../../../data/remote/model/group/position/group-person-position';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-group-person-item',
  templateUrl: './group-person-item.component.html',
  styleUrls: ['./group-person-item.component.scss']
})
export class GroupPersonItemComponent extends BaseComponent<GroupPerson> {

  public groupPersonPositions: GroupPersonPosition[];
  public visibleGroupPersonPositions: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    super();
    this.groupPersonPositions = [];
  }

  async initializeComponent(data: GroupPerson): Promise<boolean> {
    const result = super.initializeComponent(data);
    if (result) {
      return await this._appHelper.tryLoad(async () => {
        this.groupPersonPositions = (await this._participantRestApiService.getGroupPersonPositions({},
          {
            unassigned: false,
            count: PropertyConstant.pageSizeMax
          }, {
            groupId: data.group.id,
            personId: data.person.id
          })).list;
      });
    }
    return result;
  }

  public toggleGroupPersonPositions() {
    this.visibleGroupPersonPositions = !this.visibleGroupPersonPositions;
  }

}
