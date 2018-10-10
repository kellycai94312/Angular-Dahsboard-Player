import {Component, Input, ViewChild} from '@angular/core';
import {EventPlan} from '../../../data/remote/model/training/plan/event-plan';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';
import {EventPlanService} from '../event-plan/service/event-plan.service';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {EventPlanPerson} from '../../../data/remote/model/training/plan/event-plan-person';
import {UserRole} from '../../../data/remote/model/user-role';
import {Mutex} from '../../../data/local/mutex';

@Component({
  selector: 'app-persons-event-plan',
  templateUrl: './persons-event-plan.component.html',
  styleUrls: ['./persons-event-plan.component.scss']
})
export class PersonsEventPlanComponent {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input('class')
  public classes: string;

  public readonly query: PersonQuery;
  public selectedItems: EventPlanPerson[];

  private readonly _userRolesMutex: Mutex;
  private _eventPlan: EventPlan;
  private _userRoles: UserRole[];
  private _userRole: UserRole;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _eventPlanService: EventPlanService,
              private _appHelper: AppHelper) {
    this.query = new PersonQuery();
    this.query.name = '';
    this.query.unassigned = true;
    this.classes = '';
    this._userRolesMutex = new Mutex();
  }

  public async initialize(eventPlan: EventPlan, userRoleEnum: UserRoleEnum) {
    await this._appHelper.tryLoad(async () => {
      this._eventPlan = eventPlan;
      this.query.userRoleEnum = userRoleEnum;
      this._userRole = (await this.getUserRoles()).find(x => x.userRoleEnum === userRoleEnum);
      this.selectedItems = (await this.fetchItems(Direction.DOWN, {count: PropertyConstant.pageSizeMax, userRoleEnum: userRoleEnum})).list;
      await this.resetItems();
    });
  }

  public async onSearchChange() {
    await this.resetItems();
  }

  public fetchItems = async (direction: Direction, query: PersonQuery) => {
    return await this._participantRestApiService.getEventPlanPersons({}, query, {eventPlanId: this._eventPlan.id});
  };

  public async onSelected(item: EventPlanPerson) {
    await this._appHelper.trySave(async () => {
      const eventPlanPerson = this._appHelper.cloneObject(item);
      eventPlanPerson.userRole = this._userRole;
      await this._participantRestApiService.createEventPlanPerson(eventPlanPerson, {}, {eventPlanId: this._eventPlan.id});

      this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, item);
      this.selectedItems.push(eventPlanPerson);
    });
  }

  public async onUnselected(item: EventPlanPerson) {
    await this._appHelper.trySave(async () => {
      await this._participantRestApiService.removeEventPlanPerson({eventPlanId: this._eventPlan.id, eventPlanPersonId: item.id});

      this._appHelper.removeItem(this.selectedItems, item);
      this.ngxVirtualScrollComponent.items.push(this._appHelper.setToNewObject(item));
    });
  }

  private async getUserRoles(): Promise<UserRole[]> {
    await this._userRolesMutex.acquire();
    try {
      if (!this._userRoles) {
        this._userRoles = this._userRoles || await this._participantRestApiService.getUserRoles();
      }
    } finally {
      this._userRolesMutex.release();
    }
    return this._userRoles;
  }

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
