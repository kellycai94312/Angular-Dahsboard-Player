import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap/modal/modal';
import {NgxModalComponent} from '../ngx-modal/ngx-modal.component';
import {NgxModalRef} from '../bean/ngx-modal-ref';
import {IBaseEditComponent} from '../../../data/local/component/base/ibase-edit-component';

@Injectable()
export class NgxModalService {

  constructor(private _ngbModal: NgbModal) {
  }

  public open(options: NgbModalOptions = {size: 'lg', backdrop: 'static', centered: true}): NgxModalRef {
    return this._ngbModal.open(NgxModalComponent, options);
  }

  public async save(ngxModalRef: NgxModalRef, component: IBaseEditComponent, closeIfSuccess: boolean = true): Promise<boolean> {
    const isSaved = await component.onSave();
    if (isSaved && closeIfSuccess) {
      ngxModalRef.dismiss();
    }
    return isSaved;
  }

  public async remove<T>(ngxModalRef: NgxModalRef, component: IBaseEditComponent, closeIfSuccess: boolean = true): Promise<boolean> {
    const isRemoved = await component.onRemove();
    if (isRemoved && closeIfSuccess) {
      ngxModalRef.dismiss();
    }
    return isRemoved;
  }

}
