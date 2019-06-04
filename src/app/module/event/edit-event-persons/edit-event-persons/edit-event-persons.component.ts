import {Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';
import {Position} from '../../../../data/remote/model/person-position/position';
import {BaseEventApiService} from '../../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ModalBuilderService} from '../../../../service/modal-builder/modal-builder.service';
import {GroupItemComponent} from '../../../group/group-item/group-item/group-item.component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {BaseEventQuery} from '../../../../data/remote/rest-api/query/event/base-event-query';
import {AppHelper} from '../../../../utils/app-helper';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {EventPerson} from '../../../../data/remote/model/event/person/event-person';
import {EventPersonTypeEnum} from '../../../../data/remote/model/event/person/event-person-type-enum';
import {EventPersonItemComponent} from '../../event-person-item/event-person-item/event-person-item.component';
import {catchError, map, takeWhile} from 'rxjs/operators';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {NgxSelectionComponent} from '../../../../components/ngx-selection/ngx-selection/ngx-selection.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-edit-event-persons',
  templateUrl: './edit-event-persons.component.html',
  styleUrls: ['./edit-event-persons.component.scss'],
  providers: [BaseEventApiService]
})
export class EditEventPersonsComponent<T extends BaseEvent> implements OnInit, OnDestroy {

  public event: T;
  public groups: Group[] = [];
  public eventPersonHeads: EventPerson[] = [];
  public eventPersonParticipants: EventPerson[] = [];

  public isBusyGroups: boolean;
  public isBusyPersonHeads: boolean;
  public isBusyPersonParticipants: boolean;
  public canEdit: boolean;
  private _notDestroyed = true;
  private _positions: Position[] = [];

  constructor(private _baseEventApiService: BaseEventApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _appHelper: AppHelper,
              private _translateService: TranslateService,
              private _modalBuilderService: ModalBuilderService) {
  }

  public get canEditPersons(): boolean {
    return !!this.groups.length;
  }

  public ngOnInit() {
    // TODO: Check permission
    this.canEdit = true;
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  public initialize(event: T): Observable<boolean> {
    this.event = event;
    this.onOpenedGroups();
    this.onOpenEventPersonHeads();
    this.onOpenEventPersonParticipants();
    return this._updateVacancies();
  }

  public async onEditGroups(): Promise<void> {
    const dialogResult = await this._modalBuilderService.showSelectionItemsModal(this.groups, async (query: BaseEventQuery) => {
        query.unassigned = true;
        const pageContainer = await this._baseEventApiService.getEventGroups(this.event, query).toPromise();
        return await this._appHelper.pageContainerConverter(pageContainer, async obj => {
          return obj.group;
        });
      },
      GroupItemComponent, async (component, data) => {
        component.data = data;
      }, {
        componentFactoryResolver: this._componentFactoryResolver,
        title: this._getTitle(['groups'])
      }
    );
    if (dialogResult.result) {
      this.isBusyGroups = true;
      this._baseEventApiService.updateEventGroups(this.event, new ListRequest<IdRequest>(dialogResult.data.map(x => new IdRequest(x.id)))).subscribe(value => {
        this.groups = value.map(x => x.group);
        this._updateVacancies().subscribe();
        this.onOpenEventPersonHeads();
        this.onOpenEventPersonParticipants();
        this.isBusyGroups = false;
      });
    }
  }

  public onOpenedGroups(): void {
    this.isBusyGroups = true;
    this._baseEventApiService.getEventGroups(this.event, {count: PropertyConstant.pageSizeMax, unassigned: false})
      .subscribe(value => {
        this.groups = value.list.map(x => x.group);
        this.isBusyGroups = false;
      });
  }

  public onOpenEventPersonHeads(): void {
    this.isBusyPersonHeads = true;
    this._baseEventApiService.getEventPersons(this.event, {count: PropertyConstant.pageSizeMax, unassigned: false, eventPersonTypeEnum: EventPersonTypeEnum.HEAD})
      .subscribe(value => {
        this.eventPersonHeads = value.list;
        this.isBusyPersonHeads = false;
      });
  }

  public onOpenEventPersonParticipants(): void {
    this.isBusyPersonParticipants = true;
    this._baseEventApiService.getEventPersons(this.event, {count: PropertyConstant.pageSizeMax, unassigned: false, eventPersonTypeEnum: EventPersonTypeEnum.PARTICIPANT})
      .subscribe(value => {
        this.eventPersonParticipants = value.list;
        this.isBusyPersonParticipants = false;
      });
  }

  public async onEditEventPersonHeads(): Promise<void> {
    this.eventPersonHeads = await this._editEventPersons(EventPersonTypeEnum.HEAD, this.eventPersonHeads);
  }

  public async onEditEventPersonParticipants(): Promise<void> {
    this.eventPersonParticipants = await this._editEventPersons(EventPersonTypeEnum.PARTICIPANT, this.eventPersonParticipants);
  }

  private async _editEventPersons(eventPersonTypeEnum: EventPersonTypeEnum, values: EventPerson[]): Promise<EventPerson[]> {
    const position = new Position();
    position.name = 'Выберите должность';

    const positions = this._positions.slice();
    positions.unshift(position);
    const itemsNgxSelect = new NgxSelect();
    itemsNgxSelect.labelTranslation = 'personPosition';
    itemsNgxSelect.items = positions;
    itemsNgxSelect.display = (item: Position) => {
      let name = item.name;
      if (item.activity) {
        name += ` ${item.activity.name}`;
      }
      return name;
    };
    itemsNgxSelect.compare = (first, second) => first.id == second.id;
    if (positions.length) {
      itemsNgxSelect.control.setValue(positions[0]);
    }
    let ngxSelectionComponent: NgxSelectionComponent<any, any, any>;
    await this._modalBuilderService.showSelectionItemsModal(values, async (query: any) => {
        query.unassigned = true;
        query.positionId = itemsNgxSelect.control.value.id;
        query.eventPersonTypeEnum = eventPersonTypeEnum;
        if (!itemsNgxSelect.control.value.id) {
          return this._appHelper.arrayToPageContainer(new Array<EventPerson>());
        }
        return await this._baseEventApiService.getEventPersons(this.event, query).toPromise();
      },
      EventPersonItemComponent, async (component, data) => {
        component.eventPersonTypeEnum = eventPersonTypeEnum;
        component.event = this.event;
        component.canEdit = true;
        component.data = data;
      },
      {
        componentFactoryResolver: this._componentFactoryResolver,
        title: this._getTitle([`${eventPersonTypeEnum.toLowerCase()}s`]),
        compare: (first, second) => first.person.id == second.person.id,
        selected: value => {
          return this._baseEventApiService.createEventPersonType(this.event, {
            personId: value.person.id,
            eventPersonTypeEnum: eventPersonTypeEnum,
            positionIds: [new IdRequest(itemsNgxSelect.control.value.id)]
          }).pipe(
            map(eventPersonType => {
              if (eventPersonType) {
                Object.assign(value, eventPersonType.eventPerson);
              }
              return !!eventPersonType;
            }),
            catchError(() => of(false))
          );
        },
        deselected: value => {
          return this._baseEventApiService.removeEventPersonType(this.event, {
            person: value.person,
            eventPersonTypeEnum: eventPersonTypeEnum
          }).pipe(
            map(eventPersonType => {
              if (eventPersonType) {
                delete value.id;
                value.positions = [];
                Object.assign(value, eventPersonType.eventPerson);
              }
              return !!eventPersonType;
            }),
            catchError(() => of(false)),
          );
        },
        itemsNgxSelect: itemsNgxSelect,
        actions: modal => {
          return [{
            nameKey: 'close',
            callback: async data => {
              modal.close();
            }
          }];
        }
      },
      component => {
        ngxSelectionComponent = component;
        component.itemsNgxSelect.control.valueChanges
          .pipe(takeWhile(() => this._notDestroyed))
          .subscribe(async () => {
            component.query.from = 0;
            await component.reset();
          });
      });
    return ngxSelectionComponent.selectedItems;
  }

  private _updateVacancies(): Observable<boolean> {
    return this._baseEventApiService.getEventVacancies(this.event, {count: PropertyConstant.pageSizeMax})
      .pipe(map(value => {
        this._positions = value.list;
        return true;
      }));
  }

  private _getTitle(key: string[]): string {
    const translationObj = this._translateService.instant(key);
    return Object.keys(translationObj).map(x => translationObj[x]).join(' ');
  }

}
