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

@Component({
  selector: 'app-referee-categories',
  templateUrl: './referee-categories.component.html',
  styleUrls: ['./referee-categories.component.scss']
})
export class RefereeCategoriesComponent implements OnInit, OnDestroy {

  private readonly _sportTypeSubscription: ISubscription;

  public personRefereeCategoryViewModels: PersonRefereeCategoryViewModel[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _personService: PersonService,
              private _modalService: NgbModal) {
    this.personRefereeCategoryViewModels = [];

    this._sportTypeSubscription = this._personService.sportTypeSelectEmitted$.subscribe(async value => {
      await this.initialize(this._personService.shared.person, value);
    });
  }

  async ngOnInit() {
    await this.initialize();
  }

  ngOnDestroy(): void {
    if (this._sportTypeSubscription) {
      this._sportTypeSubscription.unsubscribe();
    }
  }

  public async initialize(person: Person = this._personService.shared.person, sportType: SportType = this._personService.sportTypeSelectDefault) {
    if (!person || !sportType) {
      return;
    }
    const personRefereeCategories = await this._participantRestApiService.getPersonRefereeCategories({personId: person.id, sportTypeId: sportType.id});
    this.personRefereeCategoryViewModels = [];
    for (let i = 0; i < personRefereeCategories.length; i++) {
      const personRefereeCategoryViewModel = new PersonRefereeCategoryViewModel(personRefereeCategories[i]);
      await  personRefereeCategoryViewModel.initialize();
      this.personRefereeCategoryViewModels.push(personRefereeCategoryViewModel);
    }
  }

  public onEdit(personRefereeCategoryViewModel: PersonRefereeCategoryViewModel) {
    const ref = this._modalService.open(RefereeCategoryModalComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as RefereeCategoryModalComponent;
    componentInstance.initialize(Object.assign({}, personRefereeCategoryViewModel), this._personService.shared.person, this._personService.sportTypeSelectDefault);

    ref.result.then(async x => {
    }, async reason => {
      await this.initialize();
    });
  }

}
