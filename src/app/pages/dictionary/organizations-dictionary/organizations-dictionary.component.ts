import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {Organization} from '../../../data/remote/model/organization';
import {EditOrganizationComponent} from '../component/edit-organization/edit-organization.component';

@Component({
  selector: 'app-organizations-dictionary',
  templateUrl: './organizations-dictionary.component.html',
  styleUrls: ['./organizations-dictionary.component.scss']
})
export class OrganizationsDictionaryComponent extends BaseDictionaryComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper, authorizationService: AuthorizationService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper, authorizationService);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    await this.appHelper.tryLoad(async () => {
      await this.resetItems();
    });
  }

  public fetchItems = async () => {
    return this.appHelper.arrayToPageContainer(await this.participantRestApiService.getOrganizations());
  };

  public onAdd = async () => {
    await this.showModal(new Organization());
  };

  public onEdit = async (event: any, obj: Organization) => {
    await this.showModal(obj);
  };

  private async showModal(obj: Organization) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditOrganizationComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this.appHelper.cloneObject(obj));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            await this.resetItems();
          }
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          if (await this._ngxModalService.remove(modal, component)) {
            await this.resetItems();
          }
        })
      ];
    });
  }

  private async resetItems() {
    await this.appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
