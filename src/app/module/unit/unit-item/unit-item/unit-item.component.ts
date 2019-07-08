import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseUnit} from '../../../../data/remote/model/unit/base-unit';
import {UnitWindowService} from '../../../../services/windows/unit-window/unit-window.service';
import {BaseLibraryItem} from '../../../library/base-library-item/model/base-library-item';
import {DialogResult} from '../../../../data/local/dialog-result';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnitWindowService]
})
export class UnitItemComponent extends BaseLibraryItem<BaseUnit> {

  constructor(private _unitWindowService: UnitWindowService) {
    super();
  }

  public getInfo = async (item: BaseUnit): Promise<void> => {
    await this._unitWindowService.openUnitDetail(this.data);
  };

  public openEditItem = async (item: BaseUnit): Promise<DialogResult<BaseUnit>> => {
    return await this._unitWindowService.openEditUnit(this.data);
  };

}
