import { Component, ViewChild } from '@angular/core';
import { NgxGridComponent } from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { AbstractVersionObject } from '../../../../data/remote/base/version/abstract-version-object';
import { VersionActionType } from '../../../../data/remote/base/version/version-action-type';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { AppHelper } from '../../../../utils/app-helper';

@Component({
  selector: 'app-change-notifications',
  templateUrl: './change-notifications.component.html',
  styleUrls: ['./change-notifications.component.scss']
})
export class ChangeNotificationsComponent {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly versionActionTypeClass = VersionActionType;

  @ViewChild(NgxGridComponent, { static: false })
  public ngxGridComponent: NgxGridComponent;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  public fetchItems = async (query: PageQuery) => {
    return await this._participantRestApiService.getVersionObjects(query);
  };

  public onApprove = async (obj: AbstractVersionObject) => {
    await this._appHelper.trySave(async () => {
      await this._participantRestApiService.approveVersionObject({id: obj.id, versionActionType: obj.versionActionType});
      await this.resetItems();
    });
  };

  public onDisapprove = async (obj: AbstractVersionObject) => {
    await this._appHelper.trySave(async () => {
      await this._participantRestApiService.disapproveVersionObject({id: obj.id, versionActionType: obj.versionActionType});
      await this.resetItems();
    });
  };

  public getChangedInfo(obj: AbstractVersionObject): string {
    if (obj.versionActionType.indexOf('VERSION') > -1) {
      return `${obj.approvedObject} -> ${obj.object}`;
    }
    return '';
  }

  private async resetItems() {
    await this.ngxGridComponent.reset();
  }

}
