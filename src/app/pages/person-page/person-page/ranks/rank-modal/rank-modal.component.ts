import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonRank } from '../../../../../data/remote/model/person-rank';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rank-modal',
  templateUrl: './rank-modal.component.html',
  styleUrls: ['./rank-modal.component.scss']
})
export class RankModalComponent implements OnInit {

  @Input()
  personRank: PersonRank;

  @Input()
  onSave: Function;

  constructor(public modal: NgbActiveModal,
              private _datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  savePersonRank(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      this.personRank.date = this._datePipe.transform(this.personRank.date, 'yyyy-MM-dd HH:mm:ss.SSS') + 'GMT';
      this.onSave(this.personRank);
    }
  }

}
