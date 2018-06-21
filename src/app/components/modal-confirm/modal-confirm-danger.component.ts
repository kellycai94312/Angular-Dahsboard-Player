import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm-danger.component.html',
  styleUrls: ['./modal-confirm-danger.component.scss']
})
export class ModalConfirmDangerComponent implements OnInit {

  @Input()
  modalTitle: string;

  @Input()
  dangerBtnTitle: string;

  @Input()
  onConfirm: Function;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  public confirm() {
    this.onConfirm();
    this.modal.dismiss();
  }

}
