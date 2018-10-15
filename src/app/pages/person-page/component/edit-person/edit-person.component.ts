import {Component, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {SportType} from '../../../../data/remote/model/sport-type';
import {UserRole} from '../../../../data/remote/model/user-role';
import {Group} from '../../../../data/remote/model/group/base/group';
import {PersonContant} from '../../../../data/local/person-contant';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {Router} from '@angular/router';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {ModalSelectPageComponent} from '../../../../components/modal-select-page/modal-select-page.component';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {NamedObjectItemComponent} from '../../../../components/named-object-item/named-object-item.component';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PersonTemplateRequest} from '../../../../data/remote/request/person-template-request';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupPersonComponent} from '../../../groups/component/edit-group-person/edit-group-person.component';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {RanksComponent} from '../../person-page/ranks/ranks.component';
import {NameWrapper} from '../../../../data/local/name-wrapper';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent extends BaseEditComponent<Person> implements OnInit {

  public readonly dateMin: Date;
  public readonly dateMax: Date;
  public sexEnums: NameWrapper<SexEnum>[];
  public selectedSexEnum: NameWrapper<SexEnum>;
  public userRoles: UserRole[];
  public sportTypes: SportType[];
  public groups: Group[];

  public hasUserRoleAthlete: boolean;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _router: Router,
              private _modalService: NgbModal,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);
    this.dateMin = PersonContant.getBirthDateMin();
    this.dateMax = PersonContant.getBirthDateMax();
    this.userRoles = [];
    this.sportTypes = [];
    this.groups = [];
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.selectedSexEnum = this.sexEnums[0];
    if (this.data.sex) {
      this.selectedSexEnum = this.sexEnums.find(x => x.data === this.data.sex);
    }
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  async onSave(): Promise<boolean> {
    if (!this.userRoles.length) {
      await  this.appHelper.showErrorMessage('personMustHaveAtLeastOneRole');
      return false;
    }
    if (!this.sportTypes.length) {
      await this.appHelper.showErrorMessage('personMustHaveAtLeastOneSportType');
      return false;
    }

    return await this.appHelper.trySave(async () => {
      const request = new PersonTemplateRequest();
      request.person = this.data;
      request.person.birthDate = this.appHelper.getGmtDate(request.person.birthDate);
      request.userRoleIds = this.userRoles.map(userRole => new IdRequest(userRole.id));
      request.sportTypeIds = this.sportTypes.map(sportType => new IdRequest(sportType.id));
      request.groupIds = this.groups.map(group => new IdRequest(group.id));
      this.data = await this.participantRestApiService.createTemplatePerson(request);
    });
  }

  public async navigateToPage(): Promise<void> {
    if (this.data && this.data.id) {
      await this._router.navigate(['/person', this.data.id]);
    }
  }

  public async onEditUserRoles() {
    const userRoles = await this.participantRestApiService.getUserRoles();
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
    componentInstance.onSave = async (selectedItems: UserRole[]) => {
      this.userRoles = selectedItems;
      this.hasUserRoleAthlete = selectedItems.find(x => x.userRoleEnum === UserRoleEnum.ATHLETE) != null;
      ref.dismiss();
    };
    await componentInstance.initialize(this.userRoles);
  }

  public async onEditSportTypes() {
    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.getItems = async pageQuery => await this.participantRestApiService.getSportTypes(pageQuery);
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
    componentInstance.maxNumber = 1;
    componentInstance.pageQuery = groupQuery;
    componentInstance.getItems = async pageQuery => {
      return await this.participantRestApiService.getGroups(pageQuery);
    };
    componentInstance.onSave = async selectedItems => {
      this.groups = selectedItems;
      ref.dismiss();
    };
    await componentInstance.initialize(this.groups);
  }

  public onEditGroupPerson = async () => {
    if (!this.groups || !this.groups.length) {
      return;
    }

    const groupPerson = await this.participantRestApiService.getGroupPerson({groupId: this.groups[0].id, personId: this.data.id});
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditGroupPersonComponent, async component => {
      await component.initialize(groupPerson);

      modal.componentInstance.splitButtonItems = [{
        nameKey: 'save',
        callback: async () => {
          await this._ngxModalService.save(modal, component);
        }
      }];
    });
  };

  public onEditRank = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(RanksComponent, async component => {
      component.personId = this.data.id;
    });
  };

  public onSexChanged(val: NameWrapper<SexEnum>) {
    this.data.sex = val.data;
  }

}
