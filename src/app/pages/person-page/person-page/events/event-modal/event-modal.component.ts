import { Component, Input, OnInit } from '@angular/core';
import { TrainingPerson } from '../../../../../data/remote/model/training/training-person';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  @Input()
  trainingPerson: TrainingPerson;

  @Input()
  onSave: Function;

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
