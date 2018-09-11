import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbItem} from '../../../components/ngx-breadcrumb/bean/breadcrumb-item';
import {Organization} from '../../../data/remote/model/organization';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {GroupQuery} from '../../../data/remote/rest-api/query/group-query';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NamedObjectItemComponent} from '../../../components/named-object-item/named-object-item.component';
import {ModalSelectPageComponent} from '../../../components/modal-select-page/modal-select-page.component';
import {PropertyConstant} from '../../../data/local/property-constant';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Group} from '../../../data/remote/model/group/base/group';
import {Person} from '../../../data/remote/model/person';
import {PersonComponent} from '../../../components/person/person.component';

@Component({
  selector: 'app-organization-dictionary',
  templateUrl: './organization-dictionary.component.html',
  styleUrls: ['./organization-dictionary.component.scss']
})
export class OrganizationDictionaryComponent extends BaseDictionaryComponent implements OnInit {

  @ViewChild('personList')
  public personNgxVirtualScrollComponent: NgxVirtualScrollComponent;

  @ViewChild('groupList')
  public groupNgxVirtualScrollComponent: NgxVirtualScrollComponent;

  private readonly _breadcrumbItem: BreadcrumbItem;

  private _organization: Organization;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper, authorizationService: AuthorizationService,
              private _activatedRoute: ActivatedRoute,
              private _modalService: NgbModal) {
    super(participantRestApiService, appHelper, authorizationService);
    this._breadcrumbItem = this._activatedRoute.routeConfig.data.breadcrumb as BreadcrumbItem;
  }

  async ngOnInit(): Promise<void> {
    await  super.ngOnInit();
    await this.appHelper.tryLoad(async () => {
      const organizationId = this._activatedRoute.snapshot.params.id;
      this._organization = await this.participantRestApiService.getOrganization({organizationId: organizationId});
      this._breadcrumbItem.name = this._organization.name;
      await this.resetPersonItems();
      await this.resetGroupItems();
    });
  }

  public fetchPersonItems = async (direction: Direction, query: PersonQuery) => {
    return await this.participantRestApiService.getOrganizationPersons({}, query, {organizationId: this._organization.id});
  };

  public onEditPersons = async () => {
    const personQuery = new PersonQuery();
    personQuery.from = 0;
    personQuery.count = PropertyConstant.pageSize;
    personQuery.unassigned = true;

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = PersonComponent;
    componentInstance.pageQuery = personQuery;
    componentInstance.getItems = async pageQuery => {
      return await this.participantRestApiService.getOrganizationPersons({}, pageQuery, {organizationId: this._organization.id});
    };
    componentInstance.onSave = async (selectedItems: Person[]) => {
      await this.participantRestApiService.updateOrganizationPersons({list: selectedItems}, {}, {organizationId: this._organization.id});
      await this.resetPersonItems();
      ref.dismiss();
    };
    // TODO: Use pagination
    const persons = await this.fetchPersonItems(null, {count: PropertyConstant.pageSizeMax});
    await componentInstance.initialize(persons.list);
    setTimeout(() => {
      for (const item of componentInstance.itemsNgxVirtualScrollComponent.items) {
        item.canNavigate = false;
      }
    });
  };

  public fetchGroupItems = async (direction: Direction, query: GroupQuery) => {
    return await this.participantRestApiService.getOrganizationGroups({}, query, {organizationId: this._organization.id});
  };

  public onEditGroups = async () => {
    const groupQuery = new GroupQuery();
    groupQuery.from = 0;
    groupQuery.count = PropertyConstant.pageSize;
    groupQuery.all = false;
    groupQuery.admin = true;
    groupQuery.unassigned = true;

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.pageQuery = groupQuery;
    componentInstance.getItems = async pageQuery => {
      return await this.participantRestApiService.getOrganizationGroups({}, pageQuery, {organizationId: this._organization.id});
      ;
    };
    componentInstance.onSave = async (selectedItems: Group[]) => {
      await this.participantRestApiService.updateOrganizationGroups({list: selectedItems}, {}, {organizationId: this._organization.id});
      await this.resetGroupItems();
      ref.dismiss();
    };
    // TODO: Use pagination
    const groups = await this.fetchGroupItems(null, {count: PropertyConstant.pageSizeMax});
    await componentInstance.initialize(groups.list);
  };

  private async resetPersonItems() {
    await this.appHelper.delay();
    await this.personNgxVirtualScrollComponent.reset();
  }

  private async resetGroupItems() {
    await this.appHelper.delay();
    await this.groupNgxVirtualScrollComponent.reset();
  }

}
