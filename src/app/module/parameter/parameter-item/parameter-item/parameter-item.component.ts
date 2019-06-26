import {Component, forwardRef, Inject, Input} from '@angular/core';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';

@Component({
  selector: 'app-parameter-item',
  templateUrl: './parameter-item.component.html',
  styleUrls: ['./parameter-item.component.scss']
})
export class ParameterItemComponent extends BaseComponent<BaseParameter> {

  @Input()
  public canEdit: boolean;

  constructor(// TODO: ParameterWindowService can't inject without forwardRef()
    @Inject(forwardRef(() => ParameterWindowService))
    private _parameterWindowService: ParameterWindowService) {
    super();
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this._parameterWindowService.openEditParameter(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

  public async onClick(): Promise<void> {
    await this._parameterWindowService.openParameterDetail(this.data);
  }

}
