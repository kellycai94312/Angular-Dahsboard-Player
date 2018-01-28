import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupPerson} from '../../../data/remote/model/group/group-person';

@Component({
  selector: 'app-group-person-modal',
  templateUrl: './group-person-modal.component.html',
  styleUrls: ['./group-person-modal.component.scss']
})
export class GroupPersonModalComponent implements OnInit {

  @Input()
  public groupPerson: GroupPerson;

  constructor(public ngbActiveModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
