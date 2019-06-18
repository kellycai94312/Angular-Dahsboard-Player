import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonTab} from '../../../person-page/person-page/person-tab';
import {PersonViewModel} from '../../../../data/local/view-model/person-view-model';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {ButtonGroupItem} from '../../../../components/ngx-button-group/bean/button-group-item';
import {PersonService} from '../service/person.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {Dialogue} from '../../../../data/remote/model/chat/conversation/dialogue';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {UserRole} from '../../../../data/remote/model/user-role';
import {SportType} from '../../../../data/remote/model/sport-type';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {ImageFormat} from '../../../../data/local/image-format';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit, OnDestroy {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly imageFormatClass = ImageFormat;
  public readonly iconEnumClass = IconEnum;
  public readonly tabs: NgxTab[]; //PersonTab[];
  public allowEdit: boolean;
  public hasConnection: boolean;
  public personViewModel: PersonViewModel;
  public splitButtonItems: SplitButtonItem[];

  public userRoleButtonGroupItems: ButtonGroupItem[];
  public selectedUserRoleButtonGroupItem: ButtonGroupItem;

  public sportTypeButtonGroupItems: ButtonGroupItem[];
  public selectedSportTypeButtonGroupItem: ButtonGroupItem;

  private _connectionSplitButtonItem: SplitButtonItem;
  private _myProfile: boolean;

  constructor(public  personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    this.tabs = [
      {translation: 'persons.person.personal.section', link: 'personal'},
      // {
      //   nameKey: 'persons.person.anthropometry.section', routerLink: 'anthropometry',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT],
      //   hasAnyRole: true
      // },
      // {
      //   nameKey: 'persons.person.ranks.section', routerLink: 'ranks',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT],
      //   hasAnyRole: true
      // },
      // {
      //   nameKey: 'persons.person.achievements.section', routerLink: 'achievements',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.ATHLETE],
      //   hasAnyRole: true,
      //   personal: true
      // },
      // {
      //   nameKey: 'persons.person.myRegion.section', routerLink: 'my_region',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.ATHLETE],
      //   hasAnyRole: true,
      //   personal: true
      // },
      {translation: 'persons.person.contact.section', link: 'contact'},
      // {
      //   nameKey: 'persons.person.testsResults.section', routerLink: 'tests_results',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT],
      //   hasAnyRole: true
      // },
      // {
      //   nameKey: 'events', routerLink: 'events',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR],
      //   hasAnyRole: true
      // },
      // {
      //   nameKey: 'groups', routerLink: 'groups',
      //   restrictedRoles: [],
      //   hasAnyRole: true
      // },
      // {
      //   nameKey: 'categories', routerLink: 'category',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.ATHLETE, UserRoleEnum.SCOUT, UserRoleEnum.TRAINER],
      //   hasAnyRole: true
      // },
      // {
      //   nameKey: 'stages', routerLink: 'stage',
      //   restrictedRoles: []
      // },
      // {
      //   nameKey: 'medicalExaminations', routerLink: 'medical-examination',
      //   restrictedRoles: []
      // },
      // {
      //   nameKey: 'controlTransferStandards', routerLink: 'stage-standard',
      //   restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.SCOUT, UserRoleEnum.TRAINER, UserRoleEnum.REFEREE],
      //   hasAnyRole: true
      // }
    ];

    // for (const tab of this.tabs) {
    //   tab.visible = this.tabVisible;
    // }
  }

  public async ngOnInit() {
    const params = this._activatedRoute.snapshot.params;
    if (!params.id) {
      return;
    }

    await this.initialize(params.id);

    await this.userRoleRefresh();
    // await this.sportTypeRefresh();
  }

  ngOnDestroy(): void {
  }

  public async initialize(personId: number) {
    this.personViewModel = await this.personService.initialize(personId);
    this.allowEdit = await this.personService.allowEdit();
    const authPerson = await this._appHelper.toPromise(this._authorizationService.personSubject);
    this._myProfile = this.personService.personViewModel.data.id == authPerson.id;

    if (this.allowEdit) {
      // if (this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR) && !this._myProfile) {
      //   this.tabs.push(
      //     {
      //       nameKey: 'myGroups', routerLink: 'my-group',
      //       restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.ATHLETE, UserRoleEnum.SCOUT, UserRoleEnum.TRAINER, UserRoleEnum.REFEREE],
      //       visible: this.tabVisible
      //     }
      //   );
      // }
      // this.tabs.push(
      //   {
      //     nameKey: 'requisites', routerLink: 'requisites',
      //     restrictedRoles: [],
      //     visible: this.tabVisible
      //   }
      // );
    }

    //#region SplitButton
    this.splitButtonItems = [];
    if (!this._myProfile) {
      this.splitButtonItems.push({
        nameKey: 'sendMessage',
        callback: async () => {
          try {
            const dialogue: Dialogue = await this._participantRestApiService.getDialogue({personId: this.personService.personViewModel.data.id});
            await this._router.navigate(['/conversation', dialogue.id]);
          } catch (e) {
          }
        },
        default: true
      });
    }

    if (!this._myProfile) {
      try {
        this._connectionSplitButtonItem = new SplitButtonItem();
        this.hasConnection = (await this._participantRestApiService.hasConnection({id: this.personService.personViewModel.data.id})).value;
        this._connectionSplitButtonItem.nameKey = this.hasConnection ? 'removeContact' : 'addContact';
        this._connectionSplitButtonItem.callback = async () => {
          try {
            if (this.hasConnection) {
              await this._participantRestApiService.removeConnection({id: this.personService.personViewModel.data.id});
            } else {
              await this._participantRestApiService.createConnection({id: this.personService.personViewModel.data.id});
            }
            this.hasConnection = !this.hasConnection;
            this._connectionSplitButtonItem.nameKey = this.hasConnection ? 'removeContact' : 'addContact';
          } catch (e) {
            await this._appHelper.showErrorMessage('error');
          }

        };
        this._connectionSplitButtonItem.default = true;
        this.splitButtonItems.push(this._connectionSplitButtonItem);
      } catch (e) {
      }
    }

    if (!this._myProfile && this.allowEdit) {
      this.splitButtonItems.push({
        nameKey: 'remove',
        callback: async () => {
          try {
            await this._participantRestApiService.removePerson({personId: this.personService.personViewModel.data.id});
            await this._router.navigate(['/person']);
          } catch (e) {
          }
        }
      });
    }
    //#endregion

    this.userRoleButtonGroupItems = this.getUserRoleButtonGroupItems(this.personService.userRoles);
    // this.sportTypeButtonGroupItems = this.getSportTypeButtonGroupItems(this.personService.sportTypes);
  }

  public async onLogoChanged() {
    const image = (await this._participantRestApiService.getImages({clazz: FileClass.PERSON, objectId: this.personService.personViewModel.data.id, type: ImageType.CROPPED_LOGO})).list[0];
    this.personService.logoHandler.next(image);
    const person = await this._appHelper.toPromise(this._authorizationService.personSubject.asObservable());
    if (person.id == this.personService.personViewModel.data.id) {
      // TODO: Need to refresh image
      this._authorizationService.personSubject.next(this.personViewModel.data);
    }
  }

  //#region UserRole
  public onEditUserRoles = async () => {
    const result = await this._templateModalService.showSelectionUserRolesModal(this.personService.userRoles);
    if (result.result) {
      try {
        this.personService.userRoles = await this._participantRestApiService.updateUserUserRoles(new ListRequest(result.data), {}, {userId: this.personService.personViewModel.data.user.id});
        this.userRoleButtonGroupItems = this.getUserRoleButtonGroupItems(this.personService.userRoles);

        await this.onSelectedUserRole(this.personService.selectedUserRole);
      } catch (e) {
        if (e.status === 409) {
          await this._appHelper.showErrorMessage('persons.person.roles.conflict');
        } else {
          await this._appHelper.showErrorMessage('saveError');
        }
      }
    }
  };

  public async onSelectedUserRole(userRole: UserRole) {
    await this.userRoleRefresh(userRole);
  }

  public async userRoleRefresh(userRole: UserRole = null) {
    await this.setToggle('userRole', this.personService.userRoles, userRole, selectedItem => {
      this.personService.setUserRole(selectedItem);
      this.selectedUserRoleButtonGroupItem = this.userRoleButtonGroupItems.find(x => x.originalObject.id == selectedItem.id);
    });

    if (!await this.tabAvailableInUserRole(userRole)) {
      await this._router.navigate(['./'], {relativeTo: this._activatedRoute});
    }
  }

  private getUserRoleButtonGroupItems(userRoles: UserRole[]): ButtonGroupItem[] {
    const buttonGroupItems = [];
    for (let i = 0; i < userRoles.length; i++) {
      const item = userRoles[i];
      buttonGroupItems.push({
        name: item.name,
        originalObject: item,
        callback: async (originalObject: UserRole) => {
          await this.onSelectedUserRole(originalObject);
        }
      });
    }
    return buttonGroupItems;
  }

  //#endregion

  //#region SportType
  public async onEditSportTypes() {
    // const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    // const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    // componentInstance.headerNameKey = 'edit';
    // componentInstance.component = NamedObjectItemComponent;
    // componentInstance.getItems = async pageQuery => {
    //   return await this._participantRestApiService.getSportTypes(pageQuery);
    // };
    // componentInstance.onSave = async selectedItems => {
    //   try {
    //     this.personService.sportTypes = await this._participantRestApiService.updatePersonSportTypes(new ListRequest(selectedItems), {}, {personId: this.personService.personViewModel.data.id});
    //     this.sportTypeButtonGroupItems = this.getSportTypeButtonGroupItems(this.personService.sportTypes);
    //
    //     await this.onSelectedSportType(this.personService.sportTypeSubject.getValue());
    //     ref.dismiss();
    //   } catch (e) {
    //     await this._appHelper.showErrorMessage('saveError');
    //   }
    // };
    //
    // await componentInstance.initialize(this.personService.sportTypes);
  }

  public async onSelectedSportType(sportType: SportType) {
    await this.sportTypeRefresh(sportType);
  }

  public async sportTypeRefresh(sportType: SportType = null) {
    await this.setToggle('sportType', this.personService.sportTypes, sportType, selectedItem => {
      this.personService.sportTypeSubject.next(selectedItem);
      this.selectedSportTypeButtonGroupItem = this.sportTypeButtonGroupItems.find(x => x.originalObject.id == selectedItem.id);
    });
  }

  private getSportTypeButtonGroupItems(sportTypes: SportType[]): ButtonGroupItem[] {
    const buttonGroupItems = [];
    for (let i = 0; i < sportTypes.length; i++) {
      const item = sportTypes[i];
      buttonGroupItems.push({
        name: item.name,
        originalObject: item,
        callback: async (originalObject: SportType) => {
          await this.onSelectedSportType(originalObject);
        }
      });
    }
    return buttonGroupItems;
  }

  //#endregion

  public tabVisible = (item: PersonTab): boolean => {
    return item &&
      (!item.personal || this.allowEdit) &&
      (!item.hasAnyRole || this.personService.selectedUserRole && item.restrictedRoles.indexOf(this.personService.selectedUserRole.userRoleEnum) < 0);
  };

  private async tabAvailableInUserRole(userRole: UserRole): Promise<boolean> {
    // TODO:
    // const currentTab = this.tabs.filter(t => this._router.url.includes(t.routerLink))[0];
    // if (userRole && currentTab && !currentTab.restrictedRoles.find(x => x === userRole.userRoleEnum)) {
    //   return true;
    // }
    // return false;
    return true;
  }

  private async setToggle<T extends IdentifiedObject>(queryParamKey: string, items: T[], selectedObject: T, selected: (selectedItem: T) => void) {
    const queryParams = Object.assign({}, this._activatedRoute.snapshot.queryParams);
    const queryParam = queryParams[queryParamKey];

    if (!items.length && queryParam) {
      delete queryParams[queryParamKey];
    } else {
      let selectedItem: T = null;
      if (selectedObject) {
        selectedItem = items.find(x => x.id == selectedObject.id);
      } else {
        if (queryParam) {
          selectedItem = items.find(x => x.id == +queryParam);
        }
      }
      if (!selectedItem) {
        selectedItem = items[0];
      }

      selected(selectedItem);
      if (selectedItem) {
        queryParams[queryParamKey] = selectedItem.id;
      } else {
        delete queryParams[queryParamKey];
      }
    }

    await this._router.navigate([], {relativeTo: this._activatedRoute, queryParams: queryParams});
  }

}
