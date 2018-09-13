import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

/*
@deprecated Use NgxModalComponent
 */
@Component({
  selector: 'app-modal-confirm-danger',
  templateUrl: './modal-confirm-danger.component.html',
  styleUrls: ['./modal-confirm-danger.component.scss']
})
export class ModalConfirmDangerComponent implements OnInit {

  @Input()
  modalTitle: string;

  @Input()
  confirmBtnTitle: string;

  @Input()
  onConfirm: () => Promise<void>;

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  public confirm() {
    this.onConfirm();
    this.modal.dismiss();
  }

}
