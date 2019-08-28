import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {GroupPersonPosition} from '../../../../data/remote/model/group/position/group-person-position';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';

@Component({
  selector: 'app-group-person-item',
  templateUrl: './group-person-item.component.html',
  styleUrls: ['./group-person-item.component.scss']
})
export class GroupPersonItemComponent extends BaseComponent<GroupPerson> {

  @Input()
  public clickableComponent = true;

  private _groupPersonPositions: GroupPersonPosition[] = [];
  public visibleGroupPersonPositions: boolean;

  constructor(private _groupApiService: GroupApiService,
              private _appHelper: AppHelper) {
    super();
  }

  async initializeComponent(data: GroupPerson): Promise<boolean> {
    const result = super.initializeComponent(data);
    if (result && data.group) {
      return await this._appHelper.tryLoad(async () => {
        this._groupPersonPositions = (await this._groupApiService.getGroupPersonPositions(this.data, {unassigned: false, count: PropertyConstant.pageSizeMax}).toPromise()).list;
      });
    }
    return result;
  }

  public get firstGroupPersonPosition(): GroupPersonPosition {
    return this._groupPersonPositions.length > 0 ? this._groupPersonPositions[0] : void 0;
  }

  public get groupPersonPositionsWithoutFirst(): GroupPersonPosition[] {
    return this._groupPersonPositions.length > 1 ? this._groupPersonPositions.slice(1, this._groupPersonPositions.length) : [];
  }

  public toggleGroupPersonPositions() {
    this.visibleGroupPersonPositions = !this.visibleGroupPersonPositions;
  }

}
