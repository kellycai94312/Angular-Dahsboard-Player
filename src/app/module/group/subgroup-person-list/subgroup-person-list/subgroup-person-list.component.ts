import {AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {ObjectWrapper} from '../../../../data/local/object-wrapper';
import {SubgroupPersonQuery} from '../../../../data/remote/rest-api/query/subgroup-person-query';
import {SubgroupPersonTypeEnum} from '../../../../data/remote/model/group/subgroup/person/subgroup-person-type-enum';
import {Group} from '../../../../data/remote/model/group/base/group';
import {AppHelper} from '../../../../utils/app-helper';
import {SubgroupGroupApiService} from '../../../../data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';
import {SubgroupGroup} from '../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {SelectionType} from '../../../../components/ngx-grid/bean/selection-type';
import {Person} from '../../../../data/remote/model/person';
import {TemplateModalService} from '../../../../service/template-modal.service';

@Component({
  selector: 'app-subgroup-person-list',
  templateUrl: './subgroup-person-list.component.html',
  styleUrls: ['./subgroup-person-list.component.scss']
})
export class SubgroupPersonListComponent implements OnChanges, AfterViewInit {

  @ViewChild(NgxGridComponent, { static: false })
  public ngxGridComponent: NgxGridComponent;

  @Input()
  public group: Group;

  @Input()
  public subgroupGroup: SubgroupGroup;

  @Input()
  public canEdit: boolean;

  @Output()
  public readonly selectedItemsChange = new EventEmitter<any[]>();

  public readonly selectionTypeClass = SelectionType;

  constructor(private _appHelper: AppHelper,
              private _subgroupGroupApiService: SubgroupGroupApiService,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _groupApiService: GroupApiService) {
  }

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (!changes.firstChange) {
      await this.ngxGridComponent.reset();
    }
  }

  public async ngAfterViewInit(): Promise<void> {
    await this.ngxGridComponent.reset();
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<ObjectWrapper>> => {
    if (this.subgroupGroup) {
      const subgroupPersonQuery = query as SubgroupPersonQuery;
      subgroupPersonQuery.subgroupPersonTypeEnum = SubgroupPersonTypeEnum.PARTICIPANT;

      const pageContainer = await this._subgroupGroupApiService.getSubgroupPersons(this.subgroupGroup, subgroupPersonQuery).toPromise();
      return await this._appHelper.pageContainerConverter(pageContainer, obj => new ObjectWrapper(obj, obj.person));
    } else {
      const pageContainer = await this._groupApiService.getPersons(this.group, query).toPromise();
      return await this._appHelper.pageContainerConverter(pageContainer, obj => new ObjectWrapper(obj, obj.person));
    }
  };

  public onAdd = async () => {
    await this._openEditPersonWindow(new Person());
  };

  public onEdit = async (obj: ObjectWrapper) => {
    await this._openEditPersonWindow(obj.data);
  };

  private async _openEditPersonWindow(person: Person): Promise<void> {
    await this._templateModalService.openEditPersonWindow(person, this.group, {componentFactoryResolver: this._componentFactoryResolver});
    // TODO: Update only edited item
    await this.ngxGridComponent.reset();
  }

}
