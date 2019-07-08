import {Component, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {VersionObject} from '../../../../data/remote/base/version/version-object';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {VersionActionType} from '../../../../data/remote/base/version/version-action-type';

@Component({
  selector: 'app-change-notifications',
  templateUrl: './change-notifications.component.html',
  styleUrls: ['./change-notifications.component.scss']
})
export class ChangeNotificationsComponent {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly versionActionTypeClass = VersionActionType;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  public fetchItems = async (query: PageQuery) => {
    return await this._participantRestApiService.getVersionObjects(query);
  };

  public onApprove = async (obj: VersionObject) => {
    await this._appHelper.trySave(async () => {
      await this._participantRestApiService.approveVersionObject({id: obj.id, versionActionType: obj.versionActionType});
      await this.resetItems();
    });
  };

  public onDisapprove = async (obj: VersionObject) => {
    await this._appHelper.trySave(async () => {
      await this._participantRestApiService.disapproveVersionObject({id: obj.id, versionActionType: obj.versionActionType});
      await this.resetItems();
    });
  };

  public getChangedInfo(obj: VersionObject): string {
    if (obj.versionActionType.indexOf('VERSION') > -1) {
      return `${obj.approvedObject} -> ${obj.object}`;
    }
    return '';
  }

  private async resetItems() {
    await this.ngxGridComponent.reset();
  }

}
