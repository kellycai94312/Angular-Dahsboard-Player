import {Injectable} from '@angular/core';
import {NgxModalService} from '../components/ngx-modal/service/ngx-modal.service';
import {Group} from '../data/remote/model/group/base/group';
import {Person} from '../data/remote/model/person';
import {AppHelper} from '../utils/app-helper';
import {PersonTransitionType} from '../data/remote/model/group/transition/person-transition-type';
import {GroupTransitionComponent} from '../components/group/group-transition/group-transition.component';
import {BaseTraining} from '../data/remote/model/training/base/base-training';
import {DialogResult} from '../data/local/dialog-result';
import {EventPlan} from '../data/remote/model/training/plan/event-plan';
import {NgxModalRef} from '../components/ngx-modal/bean/ngx-modal-ref';
import {BaseConversation} from '../data/remote/model/chat/conversation/base/base-conversation';
import {BaseGroupNews} from '../data/remote/model/group/news/base-group-news';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {EditGroupNewsComponent} from '../components/group/edit-group-news/edit-group-news.component';
import {EventGroupNews} from '../data/remote/model/group/news/event-group-news';
import {GeneralStepEditEventComponent} from '../module/event/edit-event/general-step-edit-event/general-step-edit-event.component';
import {PersonsStepEditEventComponent} from '../module/event/edit-event/persons-step-edit-event/persons-step-edit-event.component';
import {SplitButtonItem} from '../components/ngx-split-button/bean/split-button-item';
import {TranslateObjectService} from '../shared/translate-object.service';
import {GroupItemComponent} from '../module/group/group-item/group-item/group-item.component';
import {EventGroupQuery} from '../data/remote/rest-api/query/event/event-group-query';
import {TrainingPerson} from '../data/remote/model/training/training-person';
import {TrainingPersonQuery} from '../data/remote/rest-api/query/training-person-query';
import {EventPersonItemComponent} from '../module/event/event-person-item/event-person-item/event-person-item.component';
import {HtmlContentComponent} from '../components/html-content/html-content/html-content.component';
import {EditPersonComponent} from '../module/person/edit-person/edit-person/edit-person.component';
import {NgxModalConfiguration} from '../components/ngx-modal/bean/ngx-modal-configuration';
import {GroupQuery} from '../data/remote/rest-api/query/group-query';
import {NgxSelectionConfig} from '../components/ngx-selection/model/ngx-selection-config';
import {ModalBuilderService} from './modal-builder/modal-builder.service';
import {EditGroupComponent} from '../module/group/edit-group/edit-group/edit-group.component';
import {UserRole} from '../data/remote/model/user-role';
import {PreviewNamedObjectComponent} from '../components/named-object/preview-named-object/preview-named-object.component';
import {Position} from '../data/remote/model/person-position/position';
import {AuthorizationService} from '../shared/authorization.service';
import {SubgroupTemplateGroup} from '../data/remote/model/group/subgroup/template/subgroup-template-group';
import {SubgroupGroup} from '../data/remote/model/group/subgroup/subgroup/subgroup-group';

@Injectable({
  providedIn: 'root'
})
export class TemplateModalService {

  constructor(private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService,
              private _modalBuilderService: ModalBuilderService,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  //#region Group

  public async showSelectionGroupsModal<TModel extends Group>(selectedItems: TModel[],
                                                              groupQuery: GroupQuery = null,
                                                              config: NgxSelectionConfig<TModel> = null): Promise<DialogResult<TModel[]>> {
    config = config || new NgxSelectionConfig<TModel>();
    if (!config.title) {
      config.title = `${await this._translateObjectService.getTranslation('selection')} ${await this._translateObjectService.getTranslation('groups')}`;
    }

    return (await this._modalBuilderService.showSelectionItemsModal(selectedItems,
      async (query: GroupQuery) => {
        return await this._participantRestApiService.getGroups(this._appHelper.updatePageQuery(query, groupQuery));
      },
      GroupItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      config
    )) as DialogResult<TModel[]>;
  }

  //#endregion

  public async showConfirmModal(contentKey: string): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'attention';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      component.html = await this._translateObjectService.getTranslation(contentKey);

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            modal.close();
          }
        },
        {
          nameKey: 'cancel',
          callback: async () => {
            modal.dismiss();
          }
        }
      ];
    });
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async showGroupPersonTransferModal(groupTransitionType: PersonTransitionType,
                                            currentGroup: Group,
                                            subgroupTemplateGroup: SubgroupTemplateGroup,
                                            subgroupGroup: SubgroupGroup,
                                            persons: Person[]): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = `groupTransitionTypeEnum.${groupTransitionType}`;
    await modal.componentInstance.initializeBody(GroupTransitionComponent, async component => {
      component.fromSubgroupGroup = subgroupGroup;
      component.subgroupTemplateGroup = subgroupTemplateGroup;
      await component.initialize(groupTransitionType, currentGroup, persons);
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            if (await component.onSave()) {
              modal.close();
            }
          }
        }
      ];
    });
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async showEditGroupModal<T extends Group>(group: T): Promise<boolean> {
    const modal = this._ngxModalService.open();
    this._modalBuilderService.updateTitleKeyModal(modal, group);

    await modal.componentInstance.initializeBody(EditGroupComponent, async component => {
      await component.initialize(group);

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        })];
    });
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async addMissingUserRoles(positions: Position[]): Promise<boolean> {
    let positionUserRoles: UserRole[] = [];
    const compare: (first: UserRole, second: UserRole) => boolean = (first, second) => first.id == second.id;
    for (const item of positions) {
      const items = await this._appHelper.except(positionUserRoles, item.positionUserRoles.map(x => x.userRole), compare);
      if (items.length) {
        const newItems = await this._appHelper.except(positionUserRoles, items, compare);
        if (newItems.length) {
          positionUserRoles = positionUserRoles.concat(newItems);
        }
      }
    }
    const userRoles = await this._authorizationService.getUserRoles();
    const differenceUserRoles = this._appHelper.except(positionUserRoles, userRoles, compare);

    if (differenceUserRoles.length) {
      if (await this.showConfirmModal('addMissingUserRoles')) {
        const person = await this._appHelper.toPromise(this._authorizationService.personSubject);
        await this._participantRestApiService.updateUserUserRoles({list: differenceUserRoles.concat(userRoles)}, {}, {userId: person.user.id});
      } else {
        return false;
      }
    }
    return true;
  }

  public async showEditPersonModal(person: Person, group?: Group,
                                   config?: NgxModalConfiguration,
                                   subgroupTemplateGroup?: SubgroupTemplateGroup,
                                   subgroupGroup?: SubgroupGroup): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'person';
    await modal.componentInstance.initializeBody(EditPersonComponent, async component => {
      component.group = group;
      await component.initialize(person);
      const isNewObject = (): boolean => {
        return !this._appHelper.isNewObject(component.data);
      };
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        {
          nameKey: 'transfer',
          callback: async () => {
            if (await this.showGroupPersonTransferModal(PersonTransitionType.TRANSFER, group, subgroupTemplateGroup, subgroupGroup, [component.data])) {
              modal.close();
            }
          },
          visible: isNewObject
        },
        {
          nameKey: 'deduct',
          callback: async () => {
            // if (await this.showGroupPersonTransferModal(PersonTransitionType.EXPEL, group, [component.data])) {
            //   modal.close();
            // }
          },
          visible: isNewObject
        }
      ];
    }, config);
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async showEditGroupNewsModal<T extends BaseGroupNews>(obj: T, group: Group): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    this._modalBuilderService.updateTitleKeyModal(modal, obj);
    let editGroupNewsComponent: EditGroupNewsComponent = null;
    await modal.componentInstance.initializeBody(EditGroupNewsComponent, async component => {
      editGroupNewsComponent = component;
      component.group = group;
      await component.initialize(this._appHelper.cloneObject(obj));
      const visibleItemForNew = (): boolean => {
        return this._appHelper.isNewObject(component.data);
      };
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'addEvent',
          callback: async () => {
            const dialogResult = await this.showEditEventModal();
            if (dialogResult.result) {
              const eventGroupNews = await this.createEventGroupNews(dialogResult.data, group);
              if (eventGroupNews) {
                this._appHelper.updateObject(component.data, eventGroupNews);
                modal.close();
              }
            }
          },
          visible: visibleItemForNew
        },
        {
          nameKey: 'addExistingEvent',
          callback: async () => {
            await this._ngxModalService.showSelectionEventModal(async selectedItems => {
              if (selectedItems.length > 0) {
                const eventGroupNews = await this.createEventGroupNews(selectedItems[0], group);
                if (eventGroupNews) {
                  this._appHelper.updateObject(component.data, eventGroupNews);
                  modal.close();
                }
              }
            });
          },
          visible: visibleItemForNew
        },
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    });
    if (await this._ngxModalService.awaitModalResult(modal)) {
      return {result: true, data: editGroupNewsComponent.data as T};
    }
    return {result: false};
  }

  public backSplitButtonItem(modal: NgxModalRef, callback: () => Promise<void> = null): SplitButtonItem {
    return {
      nameKey: 'back',
      callback: async data => {
        modal.close();
        if (callback) {
          await callback();
        }
      }
    };
  }

  public async showSelectionUserRolesModal(items: UserRole[]): Promise<DialogResult<UserRole[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(items, async query => {
      return this._appHelper.arrayToPageContainer(await this._participantRestApiService.getUserRoles({}, {global: true}, {}));
    }, PreviewNamedObjectComponent, async (component, data) => {
      component.data = data;
    });
  }

  private async createEventGroupNews<T extends BaseTraining>(event: T, group: Group): Promise<EventGroupNews> {
    let eventGroupNews: EventGroupNews = null;
    await this._appHelper.trySave(async () => {
      eventGroupNews = new EventGroupNews();
      eventGroupNews.training = event;
      eventGroupNews = (await this._participantRestApiService.createGroupNews(eventGroupNews, {}, {groupId: group.id})) as EventGroupNews;
    });
    return eventGroupNews;
  }

  //#region Event

  public async showEditEventModal<T extends BaseTraining>(event: T = null,
                                                          date: Date = null,
                                                          eventPlan: EventPlan = null,
                                                          conversation: BaseConversation = null,
                                                          canSelectExistEvent: boolean = false): Promise<DialogResult<T>> {
    return await this.showGeneralStepEditEvent(event, date, eventPlan, conversation, canSelectExistEvent);
  }

  private async showGeneralStepEditEvent<T extends BaseTraining>(event: T,
                                                                 date: Date = null,
                                                                 eventPlan: EventPlan = null,
                                                                 conversation: BaseConversation = null,
                                                                 canSelectExistEvent: boolean = false): Promise<DialogResult<T>> {
    event = event || new BaseTraining() as T;
    date = date || new Date();
    const modal = this._ngxModalService.open();
    await this._modalBuilderService.updateModalTitle(modal, event, event.name || await this._translateObjectService.getTranslation('newEvent'));
    let eventResult: T = null;
    let generalStepEditEventComponent: GeneralStepEditEventComponent<T> = null;
    await modal.componentInstance.initializeBody(GeneralStepEditEventComponent, async component => {
      generalStepEditEventComponent = component as GeneralStepEditEventComponent<T>;

      const isNew = this._appHelper.isNewObject(event);
      if (isNew) {
        event.startTime = event.startTime || date;
        event.finishTime = event.finishTime || new Date(date.getTime() + 30 * 60 * 1000);
        event.eventPlan = eventPlan;
      }
      component.date = isNew ? date : event.startTime;

      await component.initialize(this._appHelper.cloneObject(event));

      modal.componentInstance.splitButtonItems = [
        {
          default: true,
          nameKey: 'nextStep',
          callback: async () => {
            const afterCreateEvent = this._appHelper.isNewObject(component.data);
            if (await this._ngxModalService.save(modal, component, false)) {
              const dialogResult = await this.showPersonsStepEditEvent(component.data, afterCreateEvent, conversation);
              if (dialogResult.result && afterCreateEvent) {
                modal.close();
              }
            }
          }
        },
        {
          nameKey: conversation ? 'saveAndSend' : 'save',
          callback: async () => {
            await this._ngxModalService.save(modal, component);
          }
        },
        {
          nameKey: 'addExistingEvent',
          callback: async () => {
            await this._ngxModalService.showSelectionEventModal(async selectedItems => {
              if (selectedItems.length > 0) {
                eventResult = selectedItems[0] as T;
                modal.close();
              }
            });
          },
          visible: () => {
            return canSelectExistEvent && this._appHelper.isNewObject(component.data);
          }
        },
        this._ngxModalService.removeSplitItemButton(async () => {
            await this._ngxModalService.remove(modal, component);
          },
          () => {
            return !this._appHelper.isNewObject(component.data);
          }
        )
      ];
    });

    const result = await this._ngxModalService.awaitModalResult(modal);
    return {result: result, data: eventResult || generalStepEditEventComponent.data};
  }

  private async showPersonsStepEditEvent<T extends BaseTraining>(event: T,
                                                                 afterCreateEvent: boolean = false,
                                                                 conversation: BaseConversation = null): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    await this._modalBuilderService.updateModalTitle(modal, event, await this._translateObjectService.getTranslation('persons.section'));
    let personsStepEditEventComponent: PersonsStepEditEventComponent<T> = null;
    await modal.componentInstance.initializeBody(PersonsStepEditEventComponent, async component => {
      personsStepEditEventComponent = component as PersonsStepEditEventComponent<T>;
      component.preInitialize(afterCreateEvent, conversation);
      await component.initialize(this._appHelper.cloneObject(event));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this.backSplitButtonItem(modal)
      ];
    });
    return {result: await this._ngxModalService.awaitModalResult(modal)};
  }

  public async showSelectionTrainingGroupsModal<TModel extends Group>(event: BaseTraining,
                                                                      selectedItems: TModel[],
                                                                      eventGroupQuery: EventGroupQuery = null,
                                                                      config: NgxSelectionConfig<TModel> = null): Promise<DialogResult<TModel[]>> {
    config = config || new NgxSelectionConfig<TModel>();
    if (!config.title) {
      config.title = `${event.name} | ${await this._translateObjectService.getTranslation('selection')} ${await this._translateObjectService.getTranslation('groups')}`;
    }

    return (await this._modalBuilderService.showSelectionItemsModal(selectedItems,
      async (query: EventGroupQuery) => {
        const pageContainer = await this._participantRestApiService.getTrainingGroupsByBaseTraining({},
          this._appHelper.updatePageQuery(query, eventGroupQuery),
          {eventId: event.id});
        return this._appHelper.pageContainerConverter(pageContainer, async obj => {
          return obj.group;
        });
      },
      GroupItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      config
    )) as DialogResult<TModel[]>;
  }

  public async showSelectionTrainingPersonsModal<TModel extends TrainingPerson>(event: BaseTraining,
                                                                                selectedItems: TModel[],
                                                                                trainingPersonQuery: TrainingPersonQuery = null,
                                                                                config: NgxSelectionConfig<TModel> = null): Promise<DialogResult<TModel[]>> {
    config = config || new NgxSelectionConfig<TModel>();
    if (!config.title) {
      config.title = `${event.name} | ${await this._translateObjectService.getTranslation('selection')} ${await this._translateObjectService.getTranslation('persons.section')}`;
    }
    if (!config.compare) {
      config.compare = (first, second) => {
        return first.person.id == second.person.id;
      };
    }

    return (await this._modalBuilderService.showSelectionItemsModal(selectedItems,
      async (query: TrainingPersonQuery) => {
        return await this._participantRestApiService.getTrainingPersons({}, this._appHelper.updatePageQuery(query, trainingPersonQuery), {eventId: event.id});
      },
      EventPersonItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      config
    )) as DialogResult<TModel[]>;
  }

  //#endregion

}
