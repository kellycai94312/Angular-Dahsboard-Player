import { Component, Input, OnInit } from '@angular/core';
import { TrainingPerson } from '../../../../../data/remote/model/training/training-person';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantRestApiService } from '../../../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  @Input()
  trainingPerson: TrainingPerson;

  constructor(public modal: NgbActiveModal,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  ngOnInit() {
  }

  async onSave() {
    if (this.trainingPerson.visible) {
      await this._participantRestApiService.addTrainingVisible({trainingId: this.trainingPerson.baseTraining.id});
    } else {
      await this._participantRestApiService.removeTrainingVisible({trainingId: this.trainingPerson.baseTraining.id});
    }
    this.modal.dismiss();
  }

}
