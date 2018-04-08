import {BaseViewModel} from '../base/base-view-model';
import {TrainingPerson} from '../../../remote/model/training/training-person';
import {PersonViewModel} from '../person-view-model';

export class TrainingPersonViewModel extends BaseViewModel<TrainingPerson> {

  public personViewModel: PersonViewModel;

  constructor(data: TrainingPerson) {
    super(data);
    this.update(data, true);
  }

  public update(data: TrainingPerson, initialize: boolean = false): void {
    if (!initialize) {
      super.update(data, initialize);
    }
    this.personViewModel = new PersonViewModel(data.person);
  }

  initialize() {
    super.initialize();
    this.personViewModel.initialize();
  }

}
