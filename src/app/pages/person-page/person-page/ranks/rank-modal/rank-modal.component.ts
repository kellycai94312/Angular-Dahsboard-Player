import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PersonRank} from '../../../../../data/remote/model/person-rank';
import {AppHelper} from '../../../../../utils/app-helper';

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
              private _appHelper: AppHelper) {
  }

  ngOnInit() {
  }

  savePersonRank(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      const date = new Date(this.personRank.date);
      this.personRank.date = this._appHelper.getGmtDate(date);
      this.onSave(this.personRank);
    }
  }

}
