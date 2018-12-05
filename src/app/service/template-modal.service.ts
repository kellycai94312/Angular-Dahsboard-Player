import {Injectable} from '@angular/core';
import {NgxModalService} from '../components/ngx-modal/service/ngx-modal.service';
import {Group} from '../data/remote/model/group/base/group';
import {Person} from '../data/remote/model/person';
import {AppHelper} from '../utils/app-helper';
import {GroupTransitionType} from '../data/remote/model/group/transition/group-transition-type';
import {GroupTransitionComponent} from '../components/group/group-transition/group-transition.component';
import {EditPersonComponent} from '../components/person/edit-person/edit-person.component';
import {EditGroupComponent} from '../components/group/edit-group/edit-group.component';
import {EditEventComponent} from '../components/event/edit-event/edit-event.component';
import {BaseTraining} from '../data/remote/model/training/base/base-training';
import {DialogResult} from '../data/local/dialog-result';
import {EventPlan} from '../data/remote/model/training/plan/event-plan';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {NgxModalRef} from '../components/ngx-modal/bean/ngx-modal-ref';
import {BaseConversation} from '../data/remote/model/chat/conversation/base/base-conversation';

@Injectable({
  providedIn: 'root'
})
export class TemplateModalService {

  constructor(private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper) {
  }

  public async showGroupPersonTransferModal(groupTransitionType: GroupTransitionType, currentGroup: Group, persons: Person[]): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = `groupTransitionTypeEnum.${groupTransitionType}`;
    await modal.componentInstance.initializeBody(GroupTransitionComponent, async component => {
      await component.initialize(groupTransitionType, currentGroup, persons);
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

  public async showEditGroupModal<T extends Group>(group: T): Promise<boolean> {
    const modal = this._ngxModalService.open();
    this.updateTitleKeyModal(modal, group);

    await modal.componentInstance.initializeBody(EditGroupComponent, async component => {
      await component.initialize(group);

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        })];
    });
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async showEditPersonModal(person: Person, group?: Group): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'person';
    await modal.componentInstance.initializeBody(EditPersonComponent, async component => {
      component.group = group;
      await component.initialize(person);
      const isNewObject = (): boolean => {
        return !this._appHelper.isNewObject(component.data);
      };
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        {
          nameKey: 'transfer',
          callback: async () => {
            if (await this.showGroupPersonTransferModal(GroupTransitionType.TRANSFER, group, [component.data])) {
              modal.close();
            }
          },
          visible: isNewObject
        },
        {
          nameKey: 'deduct',
          callback: async () => {
            if (await this.showGroupPersonTransferModal(GroupTransitionType.EXPEL, group, [component.data])) {
              modal.close();
            }
          },
          visible: isNewObject
        }
      ];
    });
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async showEditEventModal<T extends BaseTraining>(event: T = null,
                                                          date: Date = null,
                                                          eventPlan: EventPlan = null,
                                                          conversation: BaseConversation = null): Promise<DialogResult<T>> {
    event = event || new BaseTraining() as T;
    date = date || new Date();
    const modal = this._ngxModalService.open();
    this.updateTitleKeyModal(modal, event);
    let editEventComponent: EditEventComponent<T> = null;
    await modal.componentInstance.initializeBody(EditEventComponent, async component => {
      editEventComponent = component as EditEventComponent<T>;
      component.manualInitialization = true;

      const isNew = this._appHelper.isNewObject(event);
      if (isNew) {
        event.startTime = event.startTime || date;
        event.finishTime = event.finishTime || new Date(date.getTime() + 30 * 60 * 1000);
        event.eventPlan = eventPlan;
      }
      component.date = isNew ? date : event.startTime;
      component.conversation = conversation;

      await component.initialize(this._appHelper.cloneObject(event));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component, !this._appHelper.isNewObject(component.data));
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    });
    const result = await this._ngxModalService.awaitModalResult(modal);
    return {result: result, data: editEventComponent.data};
  }

  private updateTitleKeyModal<T extends IdentifiedObject>(modal: NgxModalRef, obj: T): void {
    const isNew = this._appHelper.isNewObject(obj);
    modal.componentInstance.titleKey = isNew ? 'add' : 'edit';
  }

}
