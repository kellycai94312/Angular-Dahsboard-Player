import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Sex} from '../../../../data/local/sex';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {PersonContant} from '../../../../data/local/person-contant';
import {UserRole} from '../../../../data/remote/model/user-role';
import {SportType} from '../../../../data/remote/model/sport-type';
import {Group} from '../../../../data/remote/model/group/base/group';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {ModalSelectPageComponent} from '../../../../components/modal-select-page/modal-select-page.component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NamedObjectItemComponent} from '../../../../components/named-object-item/named-object-item.component';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AppHelper} from '../../../../utils/app-helper';
import {Person} from '../../../../data/remote/model/person';
import {PersonTemplateRequest} from '../../../../data/remote/request/person-template-request';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person-modal-create',
  templateUrl: './person-modal-create.component.html',
  styleUrls: ['./person-modal-create.component.scss']
})
export class PersonModalCreateComponent implements OnInit {

  public readonly person: Person;
  public readonly dateMin: Date;
  public readonly dateMax: Date;
  public readonly sexValues: Array<Sex>;

  public selectedSex: Sex;
  public userRoles: Array<UserRole>;
  public sportTypes: Array<SportType>;
  public groups: Array<Group>;

  constructor(public modal: NgbActiveModal,
              private _modalService: NgbModal,
              private _appHelper: AppHelper,
              private _router: Router,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.sexValues = [];
    this.person = new Person();
    this.dateMin = PersonContant.getBirthDateMin();
    this.dateMax = PersonContant.getBirthDateMax();
    this.userRoles = [];
    this.sportTypes = [];
    this.groups = [];
  }

  async ngOnInit() {
    const temp = Object.keys(SexEnum).filter(x => !isNaN(Number(SexEnum[x]))).map(x => SexEnum[x]);
    for (let i = 0; i < temp.length; i++) {
      const sex = new Sex();
      sex.name = await this._translateObjectService.getTranslateName('SexEnum', SexEnum[temp[i]].toString());
      sex.sexEnum = temp[i];
      this.sexValues.push(sex);
    }
  }

  public async onEditUserRoles() {
    const userRoles = await this._participantRestApiService.getUserRoles();
    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.getItems = async pageQuery => {
      const items = userRoles.filter(userRole => userRole.name.toLowerCase().indexOf(pageQuery.name) > -1);
      const pageContainer = new PageContainer();
      pageContainer.from = 0;
      pageContainer.size = items.length;
      pageContainer.total = items.length;
      pageContainer.list = items;
      return pageContainer;
    };
    componentInstance.onSave = async selectedItems => {
      this.userRoles = selectedItems;
      ref.dismiss();
    };
    await componentInstance.initialize(this.userRoles);
  }

  public async onEditSportTypes() {
    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.getItems = async pageQuery => await this._participantRestApiService.getSportTypes(pageQuery);
    componentInstance.onSave = async selectedItems => {
      this.sportTypes = selectedItems;
      ref.dismiss();
    };
    await componentInstance.initialize(this.sportTypes);
  }

  public async onEditGroups() {
    const groupQuery = new GroupQuery();
    groupQuery.from = 0;
    groupQuery.count = PropertyConstant.pageSize;
    groupQuery.all = false;
    groupQuery.admin = true;

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.pageQuery = groupQuery;
    componentInstance.getItems = async pageQuery => {
      return await this._participantRestApiService.getGroups(pageQuery);
    };
    componentInstance.onSave = async selectedItems => {
      this.groups = selectedItems;
      ref.dismiss();
    };
    await componentInstance.initialize(this.groups);
  }

  public async onSave(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      if (!this.userRoles.length) {
        await  this._appHelper.showErrorMessage('personMustHaveAtLeastOneRole');
        return;
      }
      if (!this.sportTypes.length) {
        await this._appHelper.showErrorMessage('personMustHaveAtLeastOneSportType');
        return;
      }
      this.person.sex = this.selectedSex.sexEnum;
      const request = new PersonTemplateRequest();
      request.person = this.person;
      request.userRoleIds = this.userRoles.map(userRole => new IdRequest(userRole.id));
      request.sportTypeIds = this.sportTypes.map(sportType => new IdRequest(sportType.id));
      request.groupIds = this.groups.map(group => new IdRequest(group.id));
      const person = await this._participantRestApiService.createTemplatePerson(request);
      this.modal.dismiss();
      await this._router.navigate(['/person', person.id]);
    }
  }

}
