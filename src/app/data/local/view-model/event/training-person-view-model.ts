import {BaseViewModel} from '../base/base-view-model';
import {TrainingPerson} from '../../../remote/model/training/training-person';
import {PersonViewModel} from '../person-view-model';

export class TrainingPersonViewModel extends BaseViewModel<TrainingPerson> {

  public personViewModel: PersonViewModel;

  constructor(data: TrainingPerson) {
    super(data);
  }

  public update(data: TrainingPerson): void {
    super.update(data);

    this.personViewModel = new PersonViewModel(data.person);
  }

  async initialize() {
    super.initialize();
    await this.personViewModel.initialize();
  }

}
