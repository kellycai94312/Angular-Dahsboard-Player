import {Component, forwardRef, Inject} from '@angular/core';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';
import {BaseLibraryItem} from '../../../library/base-library-item/model/base-library-item';
import {DialogResult} from '../../../../data/local/dialog-result';

@Component({
  selector: 'app-parameter-item',
  templateUrl: './parameter-item.component.html',
  styleUrls: ['./parameter-item.component.scss']
})
export class ParameterItemComponent extends BaseLibraryItem<BaseParameter> {

  constructor(// TODO: ParameterWindowService can't inject without forwardRef()
    @Inject(forwardRef(() => ParameterWindowService))
    private _parameterWindowService: ParameterWindowService) {
    super();
  }

  public getInfo = async (item: BaseParameter): Promise<void> => {
    await this._parameterWindowService.openParameterDetail(this.data);
  };

  public openEditItem = async (item: BaseParameter): Promise<DialogResult<BaseParameter>> => {
    return await this._parameterWindowService.openEditParameter(this.data);
  };

}
