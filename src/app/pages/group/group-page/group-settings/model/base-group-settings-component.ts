import {BaseGroupComponent} from '../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../../data/local/component/base/base-edit-component';

export abstract class BaseGroupSettingsComponent<T extends Group> extends BaseGroupComponent<T> {

  @ViewChild(BaseEditComponent)
  public abstract component: BaseEditComponent<T>;

  public allowSave: boolean;

  public get canSave(): boolean {
    return !!this.onSave && this.allowSave;
  }

  public async onSave(): Promise<boolean> {
    return await this.component.onSave();
  }

}
