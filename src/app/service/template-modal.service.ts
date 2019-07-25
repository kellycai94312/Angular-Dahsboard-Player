import {Injectable} from '@angular/core';
import {NgxModalService} from '../components/ngx-modal/service/ngx-modal.service';
import {Group} from '../data/remote/model/group/base/group';
import {Person} from '../data/remote/model/person';
import {AppHelper} from '../utils/app-helper';
import {PersonTransitionType} from '../data/remote/model/group/transition/person-transition-type';
import {GroupTransitionComponent} from '../components/group/group-transition/group-transition.component';
import {DialogResult} from '../data/local/dialog-result';
import {NgxModalRef} from '../components/ngx-modal/bean/ngx-modal-ref';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {SplitButtonItem} from '../components/ngx-split-button/bean/split-button-item';
import {TranslateObjectService} from '../shared/translate-object.service';
import {GroupItemComponent} from '../module/group/group-item/group-item/group-item.component';
import {HtmlContentComponent} from '../components/html-content/html-content/html-content.component';
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
import {EditGroupNewsComponent} from '../module/group/edit/edit-group-news/edit-group-news/edit-group-news.component';
import {EventPoll} from '../data/remote/model/training/poll/event-poll';
import {EditEventPollComponent} from '../module/event/edit-event-poll/edit-event-poll/edit-event-poll.component';
import {GroupNews} from '../data/remote/model/group/news/group-news';
import {BaseEvent} from '../data/remote/model/event/base/base-event';
import {EditBaseEventComponent} from '../module/event/edit-base-event/edit-base-event/edit-base-event.component';
import {EventData} from '../module/event/edit-base-event/model/event-data';
import {ImageFormat} from '../data/local/image-format';
import {CropperPosition} from 'ngx-image-cropper';
import {Image} from '../data/remote/model/file/image/image';
import {EditPersonComponent} from '../module/person/edit-person/edit-person/edit-person.component';

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

  public async openEditPersonWindow(person: Person,
                                    group?: Group,
                                    config?: NgxModalConfiguration): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'person';
    await modal.componentInstance.initializeBody(EditPersonComponent, async component => {
      await component.initialize(person, group);

      const isNewObject = (): boolean => {
        return !this._appHelper.isNewObject(component.person);
      };
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          component.onSave().subscribe(value => {
            if (value) {
              modal.close();
            }
          });
        })
      ];

      if (group) {
        modal.componentInstance.splitButtonItems.push(...[
          // {
          //   nameKey: 'transfer',
          //   callback: async () => {
          //     if (await this.showGroupPersonTransitionModal(PersonTransitionType.TRANSFER, group, [component.person], personModalConfig)) {
          //       modal.close();
          //     }
          //   },
          //   visible: isNewObject
          // },
          {
            nameKey: 'deduct',
            callback: async () => {
              if (await this.showGroupPersonTransitionModal(PersonTransitionType.EXPEL, group, [component.person])) {
                modal.close();
              }
            },
            visible: isNewObject
          },
          // {
          //   nameKey: 'deductFromSubgroup',
          //   callback: async () => {
          //     if (await this.showGroupPersonTransitionModal(PersonTransitionType.EXPEL_FROM_SUBGROUP, group, [component.person], personModalConfig)) {
          //       modal.close();
          //     }
          //   },
          //   visible: isNewObject
          // }
        ]);
      }
    }, config);
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

  public async showEditGroupNewsModal<T extends GroupNews>(obj: T, group: Group): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    this._modalBuilderService.updateTitleKeyModal(modal, obj);
    let editGroupNewsComponent: EditGroupNewsComponent = null;
    await modal.componentInstance.initializeBody(EditGroupNewsComponent, async component => {
      editGroupNewsComponent = component;
      component.group = group;
      await component.initialize(this._appHelper.cloneObject(obj));
      modal.componentInstance.splitButtonItems = [
        // TODO:
        // {
        //   nameKey: 'addExistingEvent',
        //   callback: async () => {
        //     await this._ngxModalService.showSelectionEventModal(async selectedItems => {
        //       if (selectedItems.length) {
        //         component.data.training = selectedItems[0];
        //       }
        //     });
        //   }
        // },
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

  public async showCropImageModal(image: Image,
                                  format: ImageFormat,
                                  imageBase64?: any,
                                  imagePosition?: CropperPosition,
                                  file?: File,
                                  config?: NgxModalConfiguration,
                                  autoSave: boolean = true,
                                  aspectRatio?: number): Promise<DialogResult<NgxCropImageComponent>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    let ngxCropImageComponent: NgxCropImageComponent;
    await modal.componentInstance.initializeBody(NgxCropImageComponent, async component => {
      ngxCropImageComponent = component;
      component.aspectRatio = aspectRatio || 1;
      await component.initialize(image, format, imageBase64, imagePosition, file);

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'uploadFile',
          callback: async data => {
            component.onUploadImage();
          }
        },
        this._ngxModalService.saveSplitItemButton(async () => {
          if (!autoSave || await component.onSave()) {
            modal.close();
          }
        })
      ];
    }, config);

    const dialogResult = new DialogResult<NgxCropImageComponent>();
    dialogResult.result = await this._ngxModalService.awaitModalResult(modal);
    dialogResult.data = autoSave ? null : ngxCropImageComponent;
    return dialogResult;
  }

  //#region Event

  public async showEditBaseEvent<T extends BaseEvent>(event: T, eventData?: EventData): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    await this._modalBuilderService.updateModalTitle(modal, event, event.name || await this._translateObjectService.getTranslation('newEvent'));
    let editBaseEventComponent: EditBaseEventComponent<T>;
    await modal.componentInstance.initializeBody(EditBaseEventComponent, async component => {
      editBaseEventComponent = component as EditBaseEventComponent<T>;
      editBaseEventComponent.eventData = eventData;
      await component.initialize(this._appHelper.cloneObject(event));

      modal.componentInstance.removeSplitButtonItem = this._ngxModalService.removeSplitItemButton(async () => {
        if (await this.showConfirmModal('areYouSure')) {
          await this._ngxModalService.remove(modal, component);
        }
      });
      modal.componentInstance.tempSplitButtonItems = [
        {
          nameKey: 'advancedMode',
          callback: async data => {
            await component.showAdvancedMode();
          }
        }
      ];
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        })
      ];
    });

    const result = await this._ngxModalService.awaitModalResult(modal);
    return {result: result, data: editBaseEventComponent.data};
  }

  public async showEditEventPollModal(obj: BaseEvent): Promise<DialogResult<EventPoll>> {
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

  //#endregion

}

export class PersonTransitionModalConfig {
  subgroupGroup?: SubgroupGroup;
  subgroupTemplateGroupVersion?: SubgroupTemplateGroupVersion;
}

export class PersonModalConfig extends PersonTransitionModalConfig {
  group?: Group;
}
