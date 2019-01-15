import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {EventPlan} from '../../../data/remote/model/training/plan/event-plan';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {PropertyConstant} from '../../../data/local/property-constant';
import {NgxGridComponent} from '../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {NamedObject} from '../../../data/remote/base/named-object';
import {SportType} from '../../../data/remote/model/sport-type';
import {SportRole} from '../../../data/remote/model/sport-role';
import {AppHelper} from '../../../utils/app-helper';
import {Group} from '../../../data/remote/model/group/base/group';
import {EventPlanQuery} from '../../../data/remote/rest-api/query/event/plan/event-plan-query';
import {AgeGroup} from '../../../data/remote/model/age-group';
import {Person} from '../../../data/remote/model/person';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {EventPlanStateEnum} from '../../../data/remote/model/training/plan/event-plan-state-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {IconEnum} from '../../../components/ngx-button/model/icon-enum';
import {EditEventPlanComponent} from '../edit-event-plan/edit-event-plan.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-plans',
  templateUrl: './event-plans.component.html',
  styleUrls: ['./event-plans.component.scss']
})
export class EventPlansComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly iconEnum = IconEnum;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly query: EventPlanQuery;

  public selectedSportRole: SportRole;
  public eventPlanStates: NameWrapper<EventPlanStateEnum>[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _router: Router) {
    this.query = new EventPlanQuery();
    this.query.name = '';
    this.query.template = false;
  }

  async ngOnInit() {
    this.eventPlanStates = await this._translateObjectService.getTranslatedEnumCollection<EventPlanStateEnum>(EventPlanStateEnum, 'EventPlanStateEnum');
  }

  //#region Filter

  public getKey(obj: IdentifiedObject) {
    return obj.id;
  }

  public getName(obj: NamedObject) {
    return obj.name;
  }

  public getPersonName(obj: Person) {
    return `${obj.lastName} ${obj.firstName}`;
  }

  public onLoadGroups = async (from: number, searchText: string) => {
    return this._participantRestApiService.getGroups({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public async onGroupChange(val: Group) {
    if (val) {
      this.query.groupId = val.id;
    } else {
      delete this.query.groupId;
    }
    await this.resetItems();
  }

  public onLoadSportTypes = async (from: number, searchText: string) => {
    return this._participantRestApiService.getSportTypes({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public async onSportTypeChange(val: SportType) {
    if (val) {
      this.query.sportTypeId = val.id;
    } else {
      delete this.query.sportTypeId;
    }
    delete this.query.sportRoleId;
    this.selectedSportRole = null;

    await this.resetItems();
  }

  public onLoadSportRoles = async (from: number, searchText: string) => {
    const items = await this._participantRestApiService.getSportRolesBySportType({
      id: this.query.sportTypeId,
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
    return this._appHelper.arrayToPageContainer(items);
  };

  public async onSportRoleChange(val: SportRole) {
    if (val) {
      this.query.sportRoleId = val.id;
    } else {
      delete this.query.sportRoleId;
    }
    await this.resetItems();
  }

  public onLoadAgeGroups = async (from: number, searchText: string) => {
    return await this._participantRestApiService.getAgeGroups({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public async onAgeGroupChange(val: AgeGroup) {
    if (val) {
      this.query.ageGroupId = val.id;
    } else {
      delete this.query.ageGroupId;
    }
    await this.resetItems();
  }

  public onLoadAuthors = async (from: number, searchText: string) => {
    return await this._participantRestApiService.getPersons({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public async onAuthorChange(val: Person) {
    if (val) {
      this.query.ownerId = val.id;
    } else {
      delete this.query.ownerId;
    }
    await this.resetItems();
  }

  public async onEventPlaneStateChange(val: NameWrapper<EventPlanStateEnum>) {
    if (val) {
      this.query.eventPlanStateEnum = val.data;
    } else {
      delete this.query.eventPlanStateEnum;
    }
    await this.resetItems();
  }

  public async onTemplateChanged() {
    await this.resetItems();
  }

  //#endregion

  public fetchItems = async (query: EventPlanQuery): Promise<PageContainer<EventPlan>> => {
    return await this._participantRestApiService.getEventPlans(query);
  };

  public onAddEventPlan = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'add';

    await modal.componentInstance.initializeBody(EditEventPlanComponent, async component => {
      await component.initialize(new EventPlan());

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            await component.navigateToEventPlanPage();
          }
        })
      ];
    });
  };

  public onShowEventPlan = async (item: EventPlan) => {
    await this._router.navigate(['/event-plan', item.id]);
  };

  public async onSearchValueChange(val: string) {
    await this.resetItems();
  }

  private async resetItems() {
    await this.ngxGridComponent.reset();
  }

}
