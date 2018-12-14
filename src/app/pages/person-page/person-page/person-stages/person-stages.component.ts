import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Document} from '../../../../data/remote/model/file/document/document';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonService} from '../../../person/person-page/service/person.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditPersonStageComponent} from '../../component/edit-person-stage/edit-person-stage.component';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {PublicUserRoleViewModel} from '../../../../data/local/view-model/person/public-user-role-view-model';

// @Component({
//   selector: 'app-person-stages',
//   templateUrl: './person-stages.component.html',
//   styleUrls: ['./person-stages.component.scss']
// })
export class PersonStagesComponent implements OnInit, OnDestroy {

  public readonly propertyConstant = PropertyConstant;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public canEdit: boolean;

  private _sportTypeSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _personService: PersonService,
              private _ngxModalService: NgxModalService,
              private _authorizationService: AuthorizationService) {
  }

  async ngOnInit() {
    await this.initialize();
    this.canEdit = await this._personService.allowEdit() && await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR);

    this._sportTypeSubscription = this._personService.sportTypeSubject.subscribe(async value => {
      await this.initialize();
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public async initialize() {
    await this._appHelper.tryLoad(async () => {
      await this.resetItems();
    });
  }

  public onEdit = async (parameter: PublicUserRoleViewModel) => {
    const sportType = this._personService.sportTypeSubject.getValue();
    if (!this._personService.personViewModel.data || !sportType || !this.canEdit || !parameter.data.id) {
      return;
    }
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditPersonStageComponent, async component => {
      component.manualInitialization = true;
      component.personId = this._personService.personViewModel.data.id;
      component.sportTypeId = sportType.id;

      await component.initialize(this._appHelper.cloneObject(parameter.data));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            if (await this._ngxModalService.save(modal, component, !this._appHelper.isNewObject(component.data))) {
              await this.initialize();
            }
          },
        }
      ];
    });
    modal.result.then(async x => {
      await this.initialize();
    }, async reason => {
    });
  };

  public fetchItems = async () => {
    const sportType = this._personService.sportTypeSubject.getValue();
    if (!sportType) {
      return null;
    }
    const items = await this._participantRestApiService.getPublicUserRoles({}, {
      sportTypeId: sportType.id,
      userRoleId: this._personService.selectedUserRole.id
    }, {personId: this._personService.personViewModel.data.id});

    return this._appHelper.arrayToPageContainer(await Promise.all(items.map(async value => {
      const viewModel = new PublicUserRoleViewModel(value);
      await viewModel.initialize();
      return viewModel;
    })));
  };

  public getDocumentUrl(item: Document) {
    return this._participantRestApiService.getDocument(item.id);
  }

  private async resetItems(): Promise<void> {
    await this.ngxGridComponent.reset();
  }

}
