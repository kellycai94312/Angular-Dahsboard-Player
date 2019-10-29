import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { SelectionType } from 'app/components/ngx-grid/bean/selection-type';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { ObjectWrapper } from 'app/data/local/object-wrapper';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Group } from 'app/data/remote/model/group/base';
import { SubgroupPersonTypeEnum } from 'app/data/remote/model/group/subgroup/person/subgroup-person-type-enum';
import { SubgroupGroup } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-group';
import { Person } from 'app/data/remote/model/person';
import { GroupApiService } from 'app/data/remote/rest-api/api/group/group-api.service';
import { SubgroupGroupApiService } from 'app/data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { SubgroupPersonQuery } from 'app/data/remote/rest-api/query/subgroup-person-query';
import { TemplateModalService } from 'app/service/template-modal.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-subgroup-person-list',
  templateUrl: './subgroup-person-list.component.html',
  styleUrls: ['./subgroup-person-list.component.scss']
})
export class SubgroupPersonListComponent implements OnChanges, AfterViewInit {

  @ViewChild(NgxGridComponent, {static: true})
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
      return this._appHelper.pageContainerConverter(pageContainer, obj => new ObjectWrapper(obj, obj.person));
    }
    const pageContainer = await this._groupApiService.getPersons(this.group, query).toPromise();
    return this._appHelper.pageContainerConverter(pageContainer, obj => new ObjectWrapper(obj, obj.person));
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
