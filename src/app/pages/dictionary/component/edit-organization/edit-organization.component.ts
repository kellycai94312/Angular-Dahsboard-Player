import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Organization} from '../../../../data/remote/model/organization';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent extends BaseEditComponent<Organization> {

  public organizations: Organization[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async initialize(obj: Organization): Promise<boolean> {
    await super.initialize(obj);
    return await this.appHelper.tryLoad(async () => {
      this.organizations = (await this.participantRestApiService.getOrganizations()).filter(x => x.id != this.data.id);
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this.participantRestApiService.removeOrganization({organizationId: this.data.id});
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createOrganization(this.data);
      } else {
        this.data = await this.participantRestApiService.updateOrganization(this.data, {}, {organizationId: this.data.id});
      }
    });
  }

}
