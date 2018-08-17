import {Component, OnDestroy, OnInit} from '@angular/core';
import {Document} from '../../../../data/remote/model/file/document/document';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonService} from '../person.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PersonStageSportTypeViewModel} from '../../../../data/local/view-model/stage/person-stage-sport-type-view-model';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditPersonStageComponent} from '../../component/edit-person-stage/edit-person-stage.component';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {AuthorizationService} from '../../../../shared/authorization.service';

@Component({
  selector: 'app-person-stages',
  templateUrl: './person-stages.component.html',
  styleUrls: ['./person-stages.component.scss']
})
export class PersonStagesComponent implements OnInit, OnDestroy {

  public readonly propertyConstant = PropertyConstant;

  public personStageSportTypes: PersonStageSportTypeViewModel[];
  private _sportTypeSubscription: ISubscription;
  private _allowEdit: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _personService: PersonService,
              private  _ngxModalService: NgxModalService,
              private _authorizationService: AuthorizationService) {
  }

  async ngOnInit() {
    await this.initialize();

    this._sportTypeSubscription = this._personService.sportTypeHandler.subscribe(async value => {
      this._allowEdit = await this._personService.allowEdit() && await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR);

      await this.initialize();
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public async initialize() {
    await this._appHelper.tryLoad(async () => {
      if (this._personService.personViewModel.data && this._personService.selectedSportType) {
        const items = await this._participantRestApiService.getPersonStageSportTypes({
          personId: this._personService.personViewModel.data.id,
          sportTypeId: this._personService.selectedSportType.id
        });

        this.personStageSportTypes = await Promise.all(items.map(async value => {
          const viewModel = new PersonStageSportTypeViewModel(value);
          await viewModel.initialize();
          return viewModel;
        }));
      } else {
        this.personStageSportTypes = [];
      }
    });
  }

  public onEdit = async (e: any, parameter: PersonStageSportTypeViewModel) => {
    if (!this._personService.personViewModel.data || !this._personService.selectedSportType) {
      return;
    }
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditPersonStageComponent, async component => {
      component.manualInitialization = true;
      component.personId = this._personService.personViewModel.data.id;
      component.sportTypeId = this._personService.selectedSportType.id;

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

  public getDocumentUrl(item: Document) {
    return this._participantRestApiService.getDocument(item.id);
  }

}
