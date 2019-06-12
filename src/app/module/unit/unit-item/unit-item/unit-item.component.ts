import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {BaseUnit} from '../../../../data/remote/model/unit/base-unit';
import {UnitWindowService} from '../../../../services/windows/unit-window/unit-window.service';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitItemComponent extends BaseComponent<BaseUnit> {

  @Input()
  public canEdit: boolean;

  constructor(private _unitWindowService: UnitWindowService) {
    super();
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this._unitWindowService.openEditUnit(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

}
