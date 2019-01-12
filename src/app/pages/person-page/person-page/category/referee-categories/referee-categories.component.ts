import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../../../shared/authorization.service';
import {PersonService} from '../../../../person/person-page/service/person.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PersonRefereeCategoryViewModel} from '../../../../../data/local/view-model/referee-category/person-referee-category-view-model';
import {AppHelper} from '../../../../../utils/app-helper';
import {UserRoleEnum} from '../../../../../data/remote/model/user-role-enum';
import {PageQuery} from '../../../../../data/remote/rest-api/page-query';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {NgxGridComponent} from '../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {NgxModalService} from '../../../../../components/ngx-modal/service/ngx-modal.service';
import {EditRefereeCategoryComponent} from '../../../component/edit-referee-category/edit-referee-category.component';

// @Component({
//   selector: 'app-referee-categories',
//   templateUrl: './referee-categories.component.html',
//   styleUrls: ['./referee-categories.component.scss']
// })
export class RefereeCategoriesComponent implements OnInit, OnDestroy {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstant = PropertyConstant;
  public canEdit: boolean;

  private readonly _sportTypeSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _personService: PersonService,
              private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper) {
    this._sportTypeSubscription = this._personService.sportTypeSubject.subscribe(async value => {
      await this.resetItems();
    });
  }

  async ngOnInit() {
    this.canEdit = await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR);
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public onEdit = async (personRefereeCategoryViewModel: PersonRefereeCategoryViewModel) => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditRefereeCategoryComponent, async component => {
      component.person = this._personService.personViewModel.data;
      component.sportType = this._personService.sportTypeSubject.getValue();
      await component.initialize(this._appHelper.cloneObject(personRefereeCategoryViewModel.data));
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component, !this._appHelper.isNewObject(component.data))) {
            personRefereeCategoryViewModel.update(component.data);
          }
        })];
    });
    modal.result.then(async x => {
    }, async reason => {
      await this.resetItems();
    });
  };

  public fetchItems = async (query: PageQuery) => {
    const sportType = this._personService.sportTypeSubject.getValue();
    if (!this._personService.personViewModel.data || !sportType) {
      return;
    }
    const items = await this._participantRestApiService.getPersonRefereeCategories({personId: this._personService.personViewModel.data.id, sportTypeId: sportType.id});
    const pageContainer = this._appHelper.arrayToPageContainer(items);
    return this._appHelper.pageContainerConverter(pageContainer, async obj => {
      const personRefereeCategoryViewModel = new PersonRefereeCategoryViewModel(obj);
      await personRefereeCategoryViewModel.initialize();
      return personRefereeCategoryViewModel;
    });
  };

  public async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
