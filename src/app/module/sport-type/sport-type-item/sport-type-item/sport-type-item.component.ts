import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SportType} from '../../../../data/remote/model/sport-type';
import {SportTypeWindowService} from '../../../../services/windows/sport-type-window/sport-type-window.service';
import {BaseLibraryItem} from '../../../library/base-library-item/model/base-library-item';
import {DialogResult} from '../../../../data/local/dialog-result';

@Component({
  selector: 'app-sport-type-item',
  templateUrl: './sport-type-item.component.html',
  styleUrls: ['./sport-type-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportTypeWindowService]
})
export class SportTypeItemComponent extends BaseLibraryItem<SportType> {

  constructor(private _sportTypeWindowService: SportTypeWindowService) {
    super();
  }

  public getInfo = async (item: SportType): Promise<void> => {
    await this._sportTypeWindowService.openSportTypeDetail(this.data);
  };

  public openEditItem = async (item: SportType): Promise<DialogResult<SportType>> => {
    return null;
  };

}
