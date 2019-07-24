import {Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {AppHelper} from '../../../utils/app-helper';

@Injectable({
  providedIn: 'root'
})
export class PersonWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper) {
  }
  // TODO:
  // public async openEditPersonWindow(person: Person,
  //                                   group?: Group,
  //                                   config?: NgxModalConfiguration): Promise<void> {
  //   const modal = this._ngxModalService.open();
  //   modal.componentInstance.titleKey = 'person';
  //   await modal.componentInstance.initializeBody(EditPersonComponent, async component => {
  //     await component.initialize(person, group);
  //
  //     const isNewObject = (): boolean => {
  //       return !this._appHelper.isNewObject(component.person);
  //     };
  //     modal.componentInstance.splitButtonItems = [
  //       this._ngxModalService.saveSplitItemButton(async () => {
  //         // await this._ngxModalService.save(modal, component);
  //       })
  //     ];
  //
  //     if (group) {
  //       modal.componentInstance.splitButtonItems.push(...[
  //         {
  //           nameKey: 'transfer',
  //           callback: async () => {
  //             if (await this.showGroupPersonTransitionModal(PersonTransitionType.TRANSFER, personModalConfig.group, [component.data], personModalConfig)) {
  //               modal.close();
  //             }
  //           },
  //           visible: isNewObject
  //         },
  //         {
  //           nameKey: 'deduct',
  //           callback: async () => {
  //             if (await this.showGroupPersonTransitionModal(PersonTransitionType.EXPEL, personModalConfig.group, [component.data])) {
  //               modal.close();
  //             }
  //           },
  //           visible: isNewObject
  //         },
  //         {
  //           nameKey: 'deductFromSubgroup',
  //           callback: async () => {
  //             if (await this.showGroupPersonTransitionModal(PersonTransitionType.EXPEL_FROM_SUBGROUP, personModalConfig.group, [component.data], personModalConfig)) {
  //               modal.close();
  //             }
  //           },
  //           visible: isNewObject
  //         }
  //       ]);
  //     }
  //   }, config);
  // }

}
