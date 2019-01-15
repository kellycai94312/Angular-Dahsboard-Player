import {Component, OnInit, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Document} from '../../../../data/remote/model/file/document/document';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {DocumentQuery} from '../../../../data/remote/rest-api/query/file/document-query';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PersonService} from '../../../person/person-page/service/person.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {MedicalExamination} from '../../../../data/remote/model/person/medical-examination';
import {MedicalExaminationViewModel} from '../../../../data/local/view-model/person/medical-examination-view-model';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {EditMedicalExaminationComponent} from '../../../../module/person/edit-medical-examination/edit-medical-examination/edit-medical-examination.component';

// @Component({
//   selector: 'app-medical-examinations',
//   templateUrl: './medical-examinations.component.html',
//   styleUrls: ['./medical-examinations.component.scss']
// })
export class MedicalExaminationsComponent implements OnInit {

  public propertyConstant = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public allowEdit: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _personService: PersonService,
              private _ngxModalService: NgxModalService,
              private _authorizationService: AuthorizationService) {
  }

  async ngOnInit() {
    await this.resetItems();

    this.allowEdit = await this._personService.allowEdit() && await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR);
  }

  public onAdd = async () => {
    await this.showModal(new MedicalExamination());
  };

  public onEdit = async (e: any, parameter: MedicalExaminationViewModel) => {
    await this.showModal(parameter.data);
  };

  public getDocumentUrl(item: Document) {
    return this._participantRestApiService.getDocument(item.id);
  }

  public getItems: Function = async (direction: Direction, query: DocumentQuery) => {
    // const pageContainer = await this._participantRestApiService.getMedicalExaminations({}, query, {personId: this._personService.personViewModel.data.id});
    // return await this._appHelper.pageContainerConverter(pageContainer, async obj => {
    //   const viewModel = new MedicalExaminationViewModel(obj);
    //   await viewModel.initialize();
    //   return viewModel;
    // });
  };

  private async showModal(obj: MedicalExamination) {
    if (!this.allowEdit) {
      return;
    }
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditMedicalExaminationComponent, async component => {
      // component.personId = this._personService.personViewModel.data.id;
      await component.initialize(this._appHelper.cloneObject(obj));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            if (await this._ngxModalService.save(modal, component, !this._appHelper.isNewObject(component.data))) {
              await this.resetItems();
            }
          },
        },
        {
          nameKey: 'remove',
          callback: async () => {
            if (await this._ngxModalService.remove(modal, component)) {
              await this.resetItems();
            }
          },
        }
      ];
    });
  }

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
