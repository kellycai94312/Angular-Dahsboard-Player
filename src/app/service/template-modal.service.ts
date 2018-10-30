import {Injectable} from '@angular/core';
import {NgxModalService} from '../components/ngx-modal/service/ngx-modal.service';
import {OrderTypeEnum} from '../data/remote/model/file/document/order-type-enum';
import {Group} from '../data/remote/model/group/base/group';
import {Person} from '../data/remote/model/person';
import {GroupPersonTransferComponent} from '../pages/groups/component/group-person-transfer/group-person-transfer.component';
import {AppHelper} from '../utils/app-helper';
import {EditGroupComponent} from '../pages/groups/component/edit-group/edit-group.component';
import {EditPersonComponent} from '../pages/person-page/component/edit-person/edit-person.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateModalService {

  constructor(private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper) {
  }

  public async showGroupPersonTransferModal(orderTypeEnum: OrderTypeEnum, currentGroup: Group, persons: Person[]): Promise<boolean> {
    const modal = this._ngxModalService.open();
    await modal.componentInstance.initializeBody(GroupPersonTransferComponent, async component => {
      await component.initialize(orderTypeEnum, currentGroup, persons);
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            if (await component.onSave()) {
              modal.close();
            }
          }
        }
      ];
    });
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async showEditGroupModal<T extends Group>(group: T) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'add';

    await modal.componentInstance.initializeBody(EditGroupComponent, async component => {
      await component.initialize(group);

      modal.componentInstance.splitButtonItems = [{
        nameKey: 'save',
        callback: async () => {
          if (await this._ngxModalService.save(modal, component)) {
            await component.navigateToPage();
          }
        }
      }];
    });
  }

  public async showEditPersonModal(person: Person, group?: Group) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'person';
    await modal.componentInstance.initializeBody(EditPersonComponent, async component => {
      await component.initialize(person);
      const isNewObject = (): boolean => {
        return !this._appHelper.isNewObject(component.data);
      };
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          callback: async () => {
            if (await this._ngxModalService.save(modal, component, !this._appHelper.isNewObject(component.data))) {
              await component.navigateToPage();
            }
          }
        },
        {
          nameKey: 'transfer',
          callback: async () => {
            if (await this.showGroupPersonTransferModal(OrderTypeEnum.TRANSFER, group, [component.data])) {
              modal.close();
            }
          },
          visible: isNewObject
        },
        {
          nameKey: 'deduct',
          callback: async () => {
            if (await this.showGroupPersonTransferModal(OrderTypeEnum.DEDUCTION, group, [component.data])) {
              modal.close();
            }
          },
          visible: isNewObject
        }
      ];
    });
  }
}
