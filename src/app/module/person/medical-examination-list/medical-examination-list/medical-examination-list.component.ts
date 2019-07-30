import {Component, Input, ViewChild} from '@angular/core';
import {Person} from '../../../../data/remote/model/person';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {ModalBuilderService} from '../../../../service/modal-builder/modal-builder.service';
import {UtilService} from '../../../../services/util/util.service';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {MedicalExamination} from '../../../../data/remote/model/person/medical-examination';
import {EditMedicalExaminationComponent} from '../../edit-medical-examination/edit-medical-examination/edit-medical-examination.component';

@Component({
  selector: 'app-medical-examination-list',
  templateUrl: './medical-examination-list.component.html',
  styleUrls: ['./medical-examination-list.component.scss']
})
export class MedicalExaminationListComponent {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  @Input()
  public person: Person;

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _ngxModalService: NgxModalService,
              private _groupApiService: GroupApiService,
              private _personApiService: PersonApiService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService,
              private _modalBuilderService: ModalBuilderService,
              private _utilService: UtilService) {
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<any>> => {
    return await this._personApiService.getMedicalExaminations(this.person, {count: PropertyConstant.pageSizeMax}).toPromise();
  };

  public async onAdd(): Promise<void> {
    await this._openEditMedicalExaminationWindow(new MedicalExamination());
  }

  public async onEdit(medicalExamination: MedicalExamination): Promise<void> {
    await this._openEditMedicalExaminationWindow(medicalExamination);
  };

  public async onRemove(medicalExamination: MedicalExamination): Promise<void> {
    await this._personApiService.removeMedicalExamination(this.person, medicalExamination).toPromise();
    this.ngxGridComponent.items.splice(this.ngxGridComponent.items.indexOf(medicalExamination), 1);
  };

  public async _openEditMedicalExaminationWindow(medicalExamination: MedicalExamination) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'medicalExamination';
    await modal.componentInstance.initializeBody(EditMedicalExaminationComponent, async component => {
      component.person = this.person;
      await component.initialize(this._utilService.clone(medicalExamination));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component)
          ;
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component)
          ;
        })
      ];
    });

    await this._ngxModalService.awaitModalResult(modal);
    await this.ngxGridComponent.reset();
  }

}
