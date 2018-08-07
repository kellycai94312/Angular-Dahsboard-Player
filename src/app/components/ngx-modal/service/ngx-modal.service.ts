import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap/modal/modal';
import {NgxModalComponent} from '../ngx-modal/ngx-modal.component';
import {NgxModalRef} from '../bean/ngx-modal-ref';

@Injectable()
export class NgxModalService {

  constructor(private _ngbModal: NgbModal) {
  }

  public open(options: NgbModalOptions = {size: 'lg', backdrop: 'static', centered: true}): NgxModalRef {
    return this._ngbModal.open(NgxModalComponent, options);
  }

}
