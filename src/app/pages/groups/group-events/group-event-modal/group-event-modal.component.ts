import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrainingGroup } from '../../../../data/remote/model/training-group';
import { TrainingAccess } from '../../../../data/remote/misc/training-access';

// @Component({
//   selector: 'app-group-event-modal',
//   templateUrl: './group-event-modal.component.html',
//   styleUrls: ['./group-event-modal.component.scss']
// })
export class GroupEventModalComponent implements OnInit {

  @Input()
  trainingGroup: TrainingGroup;

  @Input()
  onSave: Function;

  trainingAccess: any[];

  constructor(public modal: NgbActiveModal) {
    this.trainingAccess = Object.keys(TrainingAccess).filter(x => !isNaN(Number(TrainingAccess[x])));
  }

  ngOnInit() {
  }

}
