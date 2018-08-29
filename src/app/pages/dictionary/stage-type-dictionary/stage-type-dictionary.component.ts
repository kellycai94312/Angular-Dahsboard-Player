import {Component, ViewChild} from '@angular/core';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {NgxGridComponent} from '../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {AuthorizationService} from '../../../shared/authorization.service';
import {StageType} from '../../../data/remote/model/stage/stage-type';
import {EditStageTypeComponent} from '../component/edit-stage-type/edit-stage-type.component';

@Component({
  selector: 'app-stage-type-dictionary',
  templateUrl: './stage-type-dictionary.component.html',
  styleUrls: ['./stage-type-dictionary.component.scss']
})
export class StageTypeDictionaryComponent extends BaseDictionaryComponent {

  @ViewChild(NgxGridComponent)
  private ngxGridComponent: NgxGridComponent;

  constructor(participantRestApiService: ParticipantRestApiService,
              appHelper: AppHelper,
              authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper, authorizationService);
  }

  public fetchItems = async (pageQuery: PageQuery) => {
    return this.appHelper.arrayToPageContainer(await this.participantRestApiService.getStageTypes());
  };

  public getName = (item: StageType) => {
    return item.name;
  };
  public getShortName = (item: StageType) => {
    return item.shortName;
  };

  public onEdit = async (obj: StageType): Promise<boolean> => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditStageTypeComponent, async component => {
      await component.initialize(this.appHelper.cloneObject(obj));

      modal.componentInstance.splitButtonItems = [{
        nameKey: 'save',
        callback: async () => {
          if (await this._ngxModalService.save(modal, component)) {
            await this.resetItems();
          }
        }
      }];
    });

    return true;
  };

  private async resetItems() {
    await this.appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
