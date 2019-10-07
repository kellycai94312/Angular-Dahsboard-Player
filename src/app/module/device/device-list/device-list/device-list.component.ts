import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Direction } from '../../../../components/ngx-virtual-scroll/model/direction';
import { DialogResult } from '../../../../data/local/dialog-result';
import { PageContainer } from '../../../../data/remote/bean/page-container';
import { Device } from '../../../../data/remote/model/device/device';
import { DeviceApiService } from '../../../../data/remote/rest-api/api/device/device-api.service';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { LibraryPermissionService } from '../../../../services/permissions/library/library-permission.service';
import { DeviceWindowService } from '../../../../services/windows/device-window/device-window.service';
import { BaseItemList } from '../../../common/item-list/model/base-item-list';
import { ItemDisplay } from '../../../common/item-list/model/item-display';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent extends BaseItemList<Device, PageQuery> implements OnInit, OnDestroy {

  @Output()
  public readonly clickItem = new EventEmitter<Device>();
  private _notDestroyed = true;

  constructor(private _libraryPermissionService: LibraryPermissionService,
              private _deviceApiService: DeviceApiService,
              private _deviceWindowService: DeviceWindowService) {
    super();
    this.translationTitle = 'devices';
    this.query = new PageQuery();
    this.itemDisplay = ItemDisplay.LIST;

    this.fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<Device>> => {
      return this._deviceApiService.getDevices(query).toPromise();
    };
  }

  public ngOnInit(): void {
    this._libraryPermissionService.canAddLibraryItem().subscribe(value => {
      if (value) {
        this.addItem = async (): Promise<DialogResult<Device>> => this._deviceWindowService.openEditDevice(new Device());
      }
    });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
