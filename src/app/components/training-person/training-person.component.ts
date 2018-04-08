import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {TrainingPersonItemViewModel} from '../../data/local/view-model/event/training-person-item-view-model';
import {BaseComponent} from '../../data/local/component/base/base-component';

@Component({
  selector: 'app-training-person',
  templateUrl: './training-person.component.html',
  styleUrls: ['./training-person.component.scss']
})
export class TrainingPersonComponent extends BaseComponent<TrainingPersonItemViewModel> implements OnInit {

  @Output()
  public dblClick: EventEmitter<TrainingPersonItemViewModel>;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    super();
    this.dblClick = new EventEmitter<TrainingPersonItemViewModel>();
  }

  ngOnInit(): void {
    this.data.initialize();
  }

  public onDblClick() {
    this.dblClick.next(this.data);
  }

  public async onValueChanged() {
    await this._participantRestApiService.updateTrainingPerson(this.data.data, {}, {
      baseTrainingId: this.data.data.baseTraining.id,
      trainingPersonId: this.data.data.id
    });
  }

}
