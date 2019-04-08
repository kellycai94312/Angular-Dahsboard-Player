import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {EditSubgroupTemplateComponent} from '../../../../../../module/group/edit-subgroup-template/edit-subgroup-template/edit-subgroup-template.component';
import {SubgroupTemplate} from '../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {AppHelper} from '../../../../../../utils/app-helper';
import {Subgroup} from '../../../../../../data/remote/model/group/subgroup/subgroup/subgroup';
import {EditSubgroupComponent} from '../../../../../../module/group/edit-subgroup/edit-subgroup/edit-subgroup.component';
import {SubgroupVersion} from '../../../../../../data/remote/model/group/subgroup/version/subgroup-version';
import {DialogResult} from '../../../../../../data/local/dialog-result';
import {SubgroupGroup} from '../../../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {EditSubgroupGroupComponent} from '../../../../../../module/group/edit-subgroup-group/edit-subgroup-group/edit-subgroup-group.component';
import {NgxModalRef} from '../../../../../../components/ngx-modal/bean/ngx-modal-ref';

@Injectable()
export class SubgroupModalService {

  constructor(private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper,
              private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public async showEditSubgroupTemplate(group: Group, subgroupTemplate: SubgroupTemplate): Promise<DialogResult<SubgroupTemplate>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'template';
    let editSubgroupTemplateComponent: EditSubgroupTemplateComponent;
    await modal.componentInstance.initializeBody(EditSubgroupTemplateComponent, async component => {
      editSubgroupTemplateComponent = component;
      if (this._appHelper.isNewObject(subgroupTemplate)) {
        subgroupTemplate = new SubgroupTemplate();
        subgroupTemplate.group = group;
      }
      await component.initialize(this._appHelper.cloneObject(subgroupTemplate));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});
    if (await this._ngxModalService.awaitModalResult(modal)) {
      return {result: true, data: editSubgroupTemplateComponent.data};
    }
    return {result: false};
  }

  public async showEditSubgroup(subgroupTemplate: SubgroupTemplate, subgroup?: Subgroup): Promise<DialogResult<Subgroup>> {
    if (!subgroup) {
      subgroup = new Subgroup();
      subgroup.subgroupVersion = new SubgroupVersion();
    }
    let editSubgroupComponent: EditSubgroupComponent = null;
    const modal = this._ngxModalService.open();
    this.updateTitle(subgroup, modal);
    await modal.componentInstance.initializeBody(EditSubgroupComponent, async component => {
      editSubgroupComponent = component;
      component.subgroupTemplate = subgroupTemplate;
      await component.initialize(this._appHelper.cloneObject(subgroup));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});

    if (await this._ngxModalService.awaitModalResult(modal)) {
      return {result: true, data: editSubgroupComponent.data};
    }
    return {result: false};
  }

  public async showEditSubgroupGroup(subgroupGroup: SubgroupGroup): Promise<DialogResult<SubgroupGroup>> {
    let editSubgroupGroupComponent: EditSubgroupGroupComponent = null;
    const modal = this._ngxModalService.open();
    this.updateTitle(subgroupGroup, modal);
    await modal.componentInstance.initializeBody(EditSubgroupGroupComponent, async component => {
      editSubgroupGroupComponent = component;
      await component.initialize(this._appHelper.cloneObject(subgroupGroup));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});

    if (await this._ngxModalService.awaitModalResult(modal)) {
      return {result: true, data: editSubgroupGroupComponent.data};
    }
    return {result: false};
  }

  private updateTitle(obj: Subgroup | SubgroupGroup, modal: NgxModalRef) {
    const isNew = this._appHelper.isNewObject(obj);
    if (isNew) {
      modal.componentInstance.titleKey = 'subgroup';
    } else {
      delete modal.componentInstance.titleKey;
      modal.componentInstance.title = obj.subgroupVersion.name;
    }
  }

}
