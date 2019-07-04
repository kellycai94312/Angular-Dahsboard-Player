import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {BaseUnit} from '../../../../data/remote/model/unit/base-unit';
import {UnitWindowService} from '../../../../services/windows/unit-window/unit-window.service';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {MenuItem} from '../../../common/item-line/model/menu-item';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
  providers: [UnitWindowService]
})
export class UnitItemComponent extends BaseComponent<BaseUnit> {

  @Input()
  public canEdit: boolean;

  public readonly fileClassClass = FileClass;
  public readonly actions: MenuItem[];
  public readonly infoAction: MenuItem;

  constructor(private _unitWindowService: UnitWindowService) {
    super();
    this.infoAction = {
      iconName: 'info', action: async (item: MenuItem) => {
        await this._unitWindowService.openUnitDetail(this.data);
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
    const dialogResult = await this._unitWindowService.openEditUnit(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

}
