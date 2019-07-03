import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {MenuItem} from '../../../common/item-line/model/menu-item';
import {SportType} from '../../../../data/remote/model/sport-type';
import {SportTypeWindowService} from '../../../../services/windows/sport-type-window/sport-type-window.service';

@Component({
  selector: 'app-sport-type-item',
  templateUrl: './sport-type-item.component.html',
  styleUrls: ['./sport-type-item.component.scss'],
  providers: [SportTypeWindowService]
})
export class SportTypeItemComponent extends BaseComponent<SportType> {

  @Input()
  public canEdit: boolean;

  public readonly fileClassClass = FileClass;
  public readonly actions: MenuItem[] = [];

  constructor(private _sportTypeWindowService: SportTypeWindowService) {
    super();
    // TODO:
    // this.actions = [
    //   {
    //     iconName: 'edit', action: async (item: MenuItem) => {
    //       await this.onEdit();
    //     }
    //   }
    // ];
  }

  public async onEdit(): Promise<void> {
  }

  public async onClick(): Promise<void> {
    await this._sportTypeWindowService.openSportTypeDetail(this.data);
  }

}
