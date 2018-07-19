import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../../../shared/authorization.service';
import {Person} from '../../../../../data/remote/model/person';
import {PersonService} from '../../person.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {SportType} from '../../../../../data/remote/model/sport-type';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RefereeCategoryModalComponent} from '../referee-category-modal/referee-category-modal.component';
import {PersonRefereeCategoryViewModel} from '../../../../../data/local/view-model/referee-category/person-referee-category-view-model';
import {AppHelper} from '../../../../../utils/app-helper';
import {Mutex} from '../../../../../data/local/mutex';
import {UserRoleEnum} from '../../../../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-referee-categories',
  templateUrl: './referee-categories.component.html',
  styleUrls: ['./referee-categories.component.scss']
})
export class RefereeCategoriesComponent implements OnInit, OnDestroy {

  private readonly _sportTypeSubscription: ISubscription;

  public personRefereeCategoryViewModels: PersonRefereeCategoryViewModel[];
  private _allowEdit: boolean;

  private readonly _mutex: Mutex;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _personService: PersonService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper) {
    this._mutex = new Mutex();
    this._sportTypeSubscription = this._personService.sportTypeHandler.subscribe(async value => {
      await this.initialize(this._personService.personViewModel.data, value);
    });
  }

  async ngOnInit() {
    this._allowEdit = await this._personService.allowEdit() && await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR);
    await this.initialize();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._sportTypeSubscription);
  }

  public async initialize(person: Person = this._personService.personViewModel.data, sportType: SportType = this._personService.selectedSportType) {
    if (!person || !sportType) {
      return;
    }

    await this._mutex.acquire();
    try {
      const personRefereeCategories = await this._participantRestApiService.getPersonRefereeCategories({personId: person.id, sportTypeId: sportType.id});
      this.personRefereeCategoryViewModels = [];
      for (let i = 0; i < personRefereeCategories.length; i++) {
        const personRefereeCategoryViewModel = new PersonRefereeCategoryViewModel(personRefereeCategories[i]);
        await  personRefereeCategoryViewModel.initialize();
        this.personRefereeCategoryViewModels.push(personRefereeCategoryViewModel);
      }
    } catch (e) {
      await this._appHelper.showErrorMessage('error');
    } finally {
      this._mutex.release();
    }
  }

  public onEdit(personRefereeCategoryViewModel: PersonRefereeCategoryViewModel) {
    if (!this._allowEdit) {
      return;
    }
    const ref = this._modalService.open(RefereeCategoryModalComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as RefereeCategoryModalComponent;
    componentInstance.initialize(Object.assign({}, personRefereeCategoryViewModel), this._personService.personViewModel.data, this._personService.selectedSportType);

    ref.result.then(async x => {
    }, async reason => {
      await this.initialize();
    });
  }

}
