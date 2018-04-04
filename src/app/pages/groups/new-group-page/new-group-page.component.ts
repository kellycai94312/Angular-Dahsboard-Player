import {Component, OnInit} from '@angular/core';
import {GroupType} from '../../../data/remote/model/group/base/group-type';
import {SportType} from '../../../data/remote/model/sport-type';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {GroupTypeEnum} from '../../../data/remote/model/group/base/group-type-enum';
import {GroupTeam} from '../../../data/remote/model/group/team/group-team';
import {GroupAgency} from '../../../data/remote/model/group/agency/group-agency';
import {Group} from '../../../data/remote/model/group/base/group';
import {Router} from '@angular/router';
import notify from 'devextreme/ui/notify';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-new-group-page',
  templateUrl: './new-group-page.component.html',
  styleUrls: ['./new-group-page.component.scss']
})
export class NewGroupPageComponent implements OnInit {

  public groupName: string;

  public groupTypes: GroupType[];
  public selectedGroupType: GroupType;

  public sportTypes: SportType[];
  public selectedSportType: SportType;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateService: TranslateService,
              private _router: Router) {
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.sportTypes = (await this._participantRestApiService.getSportTypes()).list; //FIXME
  }

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      let group: any;
      switch (GroupTypeEnum[this.selectedGroupType.groupTypeEnum]) {
        case GroupTypeEnum.TEAM:
          group = new GroupTeam();
          group.name = this.groupName;
          group.groupType = this.selectedGroupType;
          group.sportType = this.selectedSportType;
          break;
        case GroupTypeEnum.AGENCY:
          group = new GroupAgency();
          group.name = this.groupName;
          group.groupType = this.selectedGroupType;
          break;
      }
      if (group == null) {
        return;
      }
      group = await this.saveGroupAsync(group);
      if (group == null) {
        return;
      }
      await this.navigateToNextPage(group);
    }
  }

  private async navigateToNextPage(group: Group) {
    await this._router.navigate(['/group', group.id]);
  }

  private async saveGroupAsync(group: Group): Promise<Group> {
    try {
      return await this._participantRestApiService.postGroup(group);
    } catch (Error) {
      const errorMessage = await this._translateService.get('errors.errorWhileSaving').toPromise();
      this.showErrorMessage(errorMessage);
    }
  }

  private showErrorMessage(message: string): void {
    notify(message, 'error', 1500);
  }

}
