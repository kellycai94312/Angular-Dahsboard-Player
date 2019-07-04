import {Component, forwardRef, Inject, Input} from '@angular/core';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {MenuItem} from '../../../common/item-line/model/menu-item';

@Component({
  selector: 'app-parameter-item',
  templateUrl: './parameter-item.component.html',
  styleUrls: ['./parameter-item.component.scss']
})
export class ParameterItemComponent extends BaseComponent<BaseParameter> {

  @Input()
  public canEdit: boolean;

  public readonly fileClassClass = FileClass;
  public readonly actions: MenuItem[];
  public readonly infoAction: MenuItem;

  constructor(// TODO: ParameterWindowService can't inject without forwardRef()
    @Inject(forwardRef(() => ParameterWindowService))
    private _parameterWindowService: ParameterWindowService) {
    super();
    this.infoAction = {
      iconName: 'info', action: async (item: MenuItem) => {
        await this._parameterWindowService.openParameterDetail(this.data);
      }
    };
    this.actions = [
      {
        iconName: 'edit', action: async (item: MenuItem) => {
          await this.onEdit();
        }
      }
    ];
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this._parameterWindowService.openEditParameter(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

}
