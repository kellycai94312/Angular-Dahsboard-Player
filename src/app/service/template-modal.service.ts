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
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
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
import {SubgroupGroup} from '../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {SubgroupTemplateGroupVersion} from '../data/remote/model/group/subgroup/template/subgroup-template-group-version';
import {GroupConnectionRequest} from '../data/remote/model/group/connection/group-connection-request';
import {EditGroupConnectionRequestComponent} from '../module/group/edit-group-connection-request/edit-group-connection-request/edit-group-connection-request.component';
import {GroupClusterRank} from '../data/remote/model/group/connection/group-cluster-rank';
import {NamedObjectComponent} from '../components/named-object/named-object/named-object.component';
import {GroupCluster} from '../data/remote/model/group/connection/group-cluster';
import {NgxCropImageComponent} from '../module/ngx/ngx-crop-image/ngx-crop-image/ngx-crop-image.component';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {ImageType} from '../data/remote/model/file/image/image-type';
import {FileClass} from '../data/remote/model/file/base/file-class';
import {EditGroupNewsComponent} from '../module/group/edit/edit-group-news/edit-group-news/edit-group-news.component';
import {EventPoll} from '../data/remote/model/training/poll/event-poll';
import {EditEventPollComponent} from '../module/event/edit-event-poll/edit-event-poll/edit-event-poll.component';
import {GroupNews} from '../data/remote/model/group/news/group-news';

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

  public async showSelectionUnassignedGroupsForGroupClusterRankModal<TModel extends Group>(groupClusterRank: GroupClusterRank,
                                                                                           selectedItems: TModel[],
                                                                                           config: NgxSelectionConfig<TModel> = null): Promise<DialogResult<TModel[]>> {
    config = config || new NgxSelectionConfig<TModel>();
    if (!config.title) {
      config.title = `${await this._translateObjectService.getTranslation('selection')} ${await this._translateObjectService.getTranslation('groups')}`;
    }

    return (await this._modalBuilderService.showSelectionItemsModal(selectedItems,
      async (query: GroupQuery) => {
        const items = await this._participantRestApiService.getRankConnections({}, {unassigned: true}, {groupClusterRankId: groupClusterRank.id});
        return this._appHelper.arrayToPageContainer(items);
      },
      GroupItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      config
    )) as DialogResult<TModel[]>;
  }

  public async showEditGroupConnectionRequest(obj: GroupConnectionRequest, config?: NgxModalConfiguration) {
    const modal = this._ngxModalService.open();
    this._modalBuilderService.updateTitleKeyModal(modal, obj);
    let editGroupConnectionRequestComponent: EditGroupConnectionRequestComponent = null;
    await modal.componentInstance.initializeBody(EditGroupConnectionRequestComponent, async component => {
      editGroupConnectionRequestComponent = component;
      await component.initialize(this._appHelper.cloneObject(obj));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, config);
    if (await this._ngxModalService.awaitModalResult(modal)) {
      return {result: true, data: editGroupConnectionRequestComponent.data};
    }
    return {result: false};
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

  public async showQuestionModal(translation: string, getActions: (modal: NgxModalRef) => SplitButtonItem[]): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'attention';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      component.html = await this._translateObjectService.getTranslation(translation);

      modal.componentInstance.splitButtonItems = getActions(modal);
    });
    await this._ngxModalService.awaitModalResult(modal);
  }

  public async showGroupPersonTransitionModal(groupTransitionType: PersonTransitionType,
                                              currentGroup: Group,
                                              persons: Person[],
                                              personTransitionModalConfig?: PersonTransitionModalConfig): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = `groupTransitionTypeEnum.${groupTransitionType}`;
    await modal.componentInstance.initializeBody(GroupTransitionComponent, async component => {
      if (personTransitionModalConfig) {
        component.fromSubgroupGroup = personTransitionModalConfig.subgroupGroup;
        component.subgroupTemplateGroupVersion = personTransitionModalConfig.subgroupTemplateGroupVersion;
      }

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

  public async showEditPersonModal(person: Person,
                                   personModalConfig: PersonModalConfig,
                                   config?: NgxModalConfiguration): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'person';
    await modal.componentInstance.initializeBody(EditPersonComponent, async component => {
      if (personModalConfig) {
        component.group = personModalConfig.group;
      }
      await component.initialize(person);
      const isNewObject = (): boolean => {
        return !this._appHelper.isNewObject(component.data);
      };
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        })
      ];

      if (personModalConfig) {
        modal.componentInstance.splitButtonItems.push(...[
          {
            nameKey: 'transfer',
            callback: async () => {
              if (await this.showGroupPersonTransitionModal(PersonTransitionType.TRANSFER, personModalConfig.group, [component.data], personModalConfig)) {
                modal.close();
              }
            },
            visible: isNewObject
          },
          {
            nameKey: 'deduct',
            callback: async () => {
              if (await this.showGroupPersonTransitionModal(PersonTransitionType.EXPEL, personModalConfig.group, [component.data])) {
                modal.close();
              }
            },
            visible: isNewObject
          },
          {
            nameKey: 'deductFromSubgroup',
            callback: async () => {
              if (await this.showGroupPersonTransitionModal(PersonTransitionType.EXPEL_FROM_SUBGROUP, personModalConfig.group, [component.data], personModalConfig)) {
                modal.close();
              }
            },
            visible: isNewObject
          }
        ]);
      }
    }, config);
    return await this._ngxModalService.awaitModalResult(modal);
  }

  public async showEditGroupNewsModal<T extends GroupNews>(obj: T, group: Group): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    this._modalBuilderService.updateTitleKeyModal(modal, obj);
    let editGroupNewsComponent: EditGroupNewsComponent = null;
    await modal.componentInstance.initializeBody(EditGroupNewsComponent, async component => {
      editGroupNewsComponent = component;
      component.group = group;
      await component.initialize(this._appHelper.cloneObject(obj));
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'addExistingEvent',
          callback: async () => {
            await this._ngxModalService.showSelectionEventModal(async selectedItems => {
              if (selectedItems.length) {
                component.data.training = selectedItems[0];
              }
            });
          }
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

  public async showEditGroupClusterModal<T extends GroupCluster>(obj: T): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    this._modalBuilderService.updateTitleKeyModal(modal, obj);
    let namedObjectComponent: NamedObjectComponent<T> = null;
    await modal.componentInstance.initializeBody(NamedObjectComponent, async component => {
      namedObjectComponent = component as NamedObjectComponent<T>;
      component.data = this._appHelper.cloneObject(obj);
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          component.data = await this._participantRestApiService.updateGroupCluster(component.data as T, {}, {groupClusterId: component.data.id});
          modal.close();
        })
      ];
    });
    if (await this._ngxModalService.awaitModalResult(modal)) {
      return {result: true, data: namedObjectComponent.data as T};
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

  public async showCropImageModal(obj: IdentifiedObject,
                                  type: ImageType,
                                  fileClass: FileClass,
                                  config: NgxModalConfiguration): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(NgxCropImageComponent, async component => {
      await component.initialize(obj, type, fileClass);

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'uploadFile',
          callback: async data => {
            component.onUploadImage();
          }
        },
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await component.onSave()) {
            modal.close();
          }
        })
      ];
    }, config);
    await this._ngxModalService.awaitModalResult(modal);
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
        ), {
          nameKey: 'editPoll',
          callback: async () => {
            await this.showEditEventPollModal(component.data);
          }
        }
      ];
    });

    const result = await this._ngxModalService.awaitModalResult(modal);
    return {result: result, data: eventResult || generalStepEditEventComponent.data};
  }

  public async showEditEventPollModal(obj: BaseTraining): Promise<DialogResult<EventPoll>> {
    const eventPolls = await this._participantRestApiService.getEventPolls({}, {}, {eventId: obj.id});
    let eventPoll = new EventPoll();
    if (eventPolls.length) {
      eventPoll = eventPolls[0];
    }

    const modal = this._ngxModalService.open();
    await this._modalBuilderService.updateModalTitle(modal, eventPoll);
    let editEventPollComponent: EditEventPollComponent = null;
    await modal.componentInstance.initializeBody(EditEventPollComponent, async component => {
      editEventPollComponent = component;
      component.event = obj;
      await component.initialize(this._appHelper.cloneObject(eventPoll));
      const canEdit = (): boolean => component.canEdit;
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          callback: async data => {
            await this._ngxModalService.save(modal, component);
          },
          visible: canEdit
        },
        {
          nameKey: 'remove',
          callback: async data => {
            await this._ngxModalService.remove(modal, component);
          },
          visible: () => component.isCreatorPoll
        },
        {
          nameKey: 'approve',
          callback: async data => {
            if (await component.onApprove()) {
              modal.close();
            }
          },
          visible: canEdit
        },
        {
          nameKey: 'addQuestion',
          callback: async data => {
            await component.onAddPollQuestion();
          },
          visible: canEdit
        },
        {
          nameKey: 'finishPoll',
          callback: async data => {
            if (await component.onFinishPoll()) {
              modal.close();
            }
          },
          visible: () => component.canExecutePoll
        }
      ];
    });
    return {
      result: await this._ngxModalService.awaitModalResult(modal),
      data: editEventPollComponent.data
    };
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

export class PersonTransitionModalConfig {
  subgroupGroup?: SubgroupGroup;
  subgroupTemplateGroupVersion?: SubgroupTemplateGroupVersion;
}

export class PersonModalConfig extends PersonTransitionModalConfig {
  group?: Group;
}
