import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PersonService} from '../person.service';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {

  @Input()
  public personId: number;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstant = PropertyConstant;
  public canEdit: boolean;

  constructor(private _personService: PersonService,
              private _authorizationService: AuthorizationService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.personId = this.personId || this._personService.personViewModel.data.id;
  }

  async ngOnInit() {
    this.canEdit = await this._personService.allowEdit() && await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR);
  }

  public fetchItems = async () => {
    // return this._appHelper.arrayToPageContainer(await this._participantRestApiService.getRanks({personId: this.personId}));
  };

  public onEdit = async (obj: PersonRank) => {
    // const modal = this._ngxModalService.open();
    // modal.componentInstance.titleKey = 'edit';
    // await modal.componentInstance.initializeBody(EditRankComponent, async component => {
    //   component.rankId = obj.rank.id;
    //   component.personId = this.personId;
    //   await component.initialize(this._appHelper.cloneObject(obj));
    //   modal.componentInstance.splitButtonItems = [
    //     {
    //       default: true,
    //       nameKey: 'save',
    //       callback: async () => {
    //         if (await this._ngxModalService.save(modal, component)) {
    //           await this.resetItems();
    //         }
    //       }
    //     },
    //     {
    //       nameKey: 'remove',
    //       callback: async () => {
    //         if (await this._ngxModalService.remove(modal, component)) {
    //           await this.resetItems();
    //         }
    //       }
    //     }
    //   ];
    // });
  };

  private async resetItems(): Promise<void> {
    await this.ngxGridComponent.reset();
  }

}
