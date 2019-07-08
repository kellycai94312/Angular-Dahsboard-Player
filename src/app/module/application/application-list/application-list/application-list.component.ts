import {Component, EventEmitter, Output} from '@angular/core';
import {ApplicationApiService} from '../../../../data/remote/rest-api/api/application/application-api.service';
import {BaseItemList} from '../../../common/item-list/model/base-item-list';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {DialogResult} from '../../../../data/local/dialog-result';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {Application} from '../../../../data/remote/model/application/application';
import {ApplicationWindowService} from '../../../../services/windows/application-window/application-window.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
  providers: [ApplicationApiService]
})
export class ApplicationListComponent extends BaseItemList<Application, PageQuery> {

  @Output()
  public readonly clickItem = new EventEmitter<Application>();

  constructor(private _applicationApiService: ApplicationApiService,
              private _applicationWindowService: ApplicationWindowService) {
    super();
    this.translationTitle = 'applications';
    this.query = new PageQuery();
    this.addItem = async (): Promise<DialogResult<Application>> => {
      return await this._applicationWindowService.openEditApplication(new Application());
    };
    this.fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<Application>> => {
      return await this._applicationApiService.getApplications(query).toPromise();
    };
  }

}
