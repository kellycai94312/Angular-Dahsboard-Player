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
      const date = new Date(this.personRank.date);
      this.personRank.date = this.getGmtDate(date);
      this.onSave(this.personRank);
    }
  }

  private getGmtDate(date: Date): any {
    const dateWithTimezone = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    return this._datePipe.transform(dateWithTimezone, 'yyyy-MM-dd HH:mm:ss.SSS') + 'GMT';
  }

}
