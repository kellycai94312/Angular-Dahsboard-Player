import {Component, ViewChild} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Stage} from '../../../data/remote/model/stage/stage';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {EditStageComponent} from '../component/edit-stage/edit-stage.component';
import {NgxGridComponent} from '../../../components/ngx-grid/ngx-grid/ngx-grid.component';

@Component({
  selector: 'app-stage-dictionary',
  templateUrl: './stage-dictionary.component.html',
  styleUrls: ['./stage-dictionary.component.scss']
})
export class StageDictionaryComponent extends BaseDictionaryComponent {

  @ViewChild(NgxGridComponent)
  private ngxGridComponent: NgxGridComponent;

  constructor(participantRestApiService: ParticipantRestApiService,
              appHelper: AppHelper,
              authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper, authorizationService);
  }

  public fetchItems = async (pageQuery: PageQuery) => {
    return this.appHelper.arrayToPageContainer(await this.participantRestApiService.getStages());
  };

  public getName = (item: Stage) => {
    return item.name;
  };
  public getShortName = (item: Stage) => {
    return item.shortName;
  };

  public onEdit = async (obj: Stage): Promise<boolean> => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditStageComponent, async component => {
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
