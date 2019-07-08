import {Component} from '@angular/core';
import {BaseLibraryItem} from '../../../library/base-library-item/model/base-library-item';
import {DialogResult} from '../../../../data/local/dialog-result';
import {Application} from '../../../../data/remote/model/application/application';
import {ApplicationWindowService} from '../../../../services/windows/application-window/application-window.service';

@Component({
  selector: 'app-application-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.scss'],
  providers: [ApplicationWindowService]
})
export class ApplicationItemComponent extends BaseLibraryItem<Application> {

  constructor(private _applicationWindowService: ApplicationWindowService) {
    super();
  }

  public getInfo = async (item: Application): Promise<void> => {
    await this._applicationWindowService.openApplicationDetail(this.data);
  };

  public openEditItem = async (item: Application): Promise<DialogResult<Application>> => {
    return await this._applicationWindowService.openEditApplication(this.data);
  };

}
