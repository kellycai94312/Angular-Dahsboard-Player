import {Component, Input, ViewChild} from '@angular/core';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {Person} from '../../../../data/remote/model/person';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {UtilService} from '../../../../services/util/util.service';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {PreviewNamedObjectComponent} from '../../../../components/named-object/preview-named-object/preview-named-object.component';
import {ModalBuilderService} from '../../../../service/modal-builder/modal-builder.service';
import {PositionEnum} from '../../../../data/remote/model/person-position/position-enum';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-person-representative-list',
  templateUrl: './person-representative-list.component.html',
  styleUrls: ['./person-representative-list.component.scss']
})
export class PersonRepresentativeListComponent {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  @Input()
  public group: Group;

  @Input()
  public person: Person;

  constructor(private _ngxModalService: NgxModalService,
              private _groupApiService: GroupApiService,
              private _personApiService: PersonApiService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService,
              private _modalBuilderService: ModalBuilderService,
              private _utilService: UtilService) {
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<any>> => {
    return this._appHelper.arrayToPageContainer(await this._personApiService.getPersonRepresentatives(this.person).toPromise());
  };

  public async onAdd(): Promise<void> {
    await this._openEditPersonWindow(new Person());
  }

  public async onSelect(): Promise<void> {
    await this._modalBuilderService.showSelectionItemsModal(this.ngxGridComponent.items, async query => {
        const pageContainer = await this._groupApiService.getPersons(this.group, {unassigned: false, positionEnum: PositionEnum.REPRESENTATIVE}).toPromise();
        return await this._appHelper.pageContainerConverter(pageContainer, async obj => obj.person);
      }, PreviewNamedObjectComponent, async (component, data: any) => {
        component.name = `${data.lastName} ${data.firstName}`;
      }, {
        selected: (value, component) => {
          return this._groupApiService.createPersonRepresentative(value.id, this.group, this.person).pipe(map(x => !!x));
        },
        deselected: (value, component) => {
          return this._groupApiService.removePersonRepresentative(value.id, this.group, this.person).pipe(map(x => !!x));
        }
      }
    );
    await this.ngxGridComponent.reset();
  }

  public async onEdit(person: Person): Promise<void> {
    await this._openEditPersonWindow(person);
  };

  public async onRemove(person: Person): Promise<void> {
    await this._groupApiService.removePersonRepresentative(person, this.group, this.person).toPromise();
    this.ngxGridComponent.items.splice(this.ngxGridComponent.items.indexOf(person), 1);
  };

  public async _openEditPersonWindow(person: Person) {
    const isNew = this._appHelper.isNewObject(person);
    const dialogResult = await this._templateModalService.openEditPersonWindow(this._utilService.clone(person), this.group);
    if (dialogResult && isNew) {
      await this._groupApiService.createPersonRepresentative({id: dialogResult.id}, this.group, this.person).toPromise();
    }
    await this.ngxGridComponent.reset();
  }

}
