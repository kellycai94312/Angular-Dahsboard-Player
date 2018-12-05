import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ImageComponent} from '../../../components/image/image.component';
import {GroupComponent} from '../../groups/group/group.component';
import {PersonTab} from './person-tab';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PersonService} from './person.service';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {Image} from '../../../data/remote/model/file/image/image';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {ModalSelectPageComponent} from '../../../components/modal-select-page/modal-select-page.component';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {ListRequest} from '../../../data/remote/request/list-request';
import {UserRole} from '../../../data/remote/model/user-role';
import {SportType} from '../../../data/remote/model/sport-type';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {SplitButtonItem} from '../../../components/ngx-split-button/bean/split-button-item';
import {Dialogue} from '../../../data/remote/model/chat/conversation/dialogue';
import {ButtonGroupItem} from '../../../components/ngx-button-group/bean/button-group-item';
import {NamedObjectItemComponent} from '../../../components/named-object-item/named-object-item.component';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit, OnDestroy {

  @ViewChild('logo')
  public logoImageComponent: ImageComponent;

  @ViewChild(GroupComponent)
  public groupComponent: GroupComponent;

  public readonly tabs: PersonTab[];
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

  private readonly _baseGroupSubscription: ISubscription;

  constructor(public  personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _appHelper: AppHelper,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _modalService: NgbModal) {
    this.tabs = [
      {
        nameKey: 'persons.person.personal.section', routerLink: 'personal',
        restrictedRoles: []
      },
      {
        nameKey: 'persons.person.anthropometry.section', routerLink: 'anthropometry',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT],
        hasAnyRole: true
      },
      {
        nameKey: 'persons.person.ranks.section', routerLink: 'ranks',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT],
        hasAnyRole: true
      },
      {
        nameKey: 'persons.person.achievements.section', routerLink: 'achievements',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.ATHLETE],
        hasAnyRole: true,
        personal: true
      },
      {
        nameKey: 'persons.person.myRegion.section', routerLink: 'my_region',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.ATHLETE],
        hasAnyRole: true,
        personal: true
      },
      {
        nameKey: 'persons.person.contact.section', routerLink: 'contact',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.ATHLETE]
      },
      {
        nameKey: 'persons.person.testsResults.section', routerLink: 'tests_results',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT],
        hasAnyRole: true
      },
      {
        nameKey: 'events', routerLink: 'events',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR],
        hasAnyRole: true
      },
      {
        nameKey: 'groups', routerLink: 'groups',
        restrictedRoles: [],
        hasAnyRole: true
      },
      {
        nameKey: 'categories', routerLink: 'category',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.ATHLETE, UserRoleEnum.SCOUT, UserRoleEnum.TRAINER],
        hasAnyRole: true
      },
      // {
      //   nameKey: 'stages', routerLink: 'stage',
      //   restrictedRoles: []
      // },
      // {
      //   nameKey: 'medicalExaminations', routerLink: 'medical-examination',
      //   restrictedRoles: []
      // },
      {
        nameKey: 'controlTransferStandards', routerLink: 'stage-standard',
        restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.SCOUT, UserRoleEnum.TRAINER, UserRoleEnum.REFEREE],
        hasAnyRole: true
      }
    ];

    for (const tab of this.tabs) {
      tab.visible = this.tabVisible;
    }

    this._baseGroupSubscription = this.personService.baseGroupHandler.subscribe(value => {
      if (value && this.groupComponent) {
        this.groupComponent.update(value.group);
      }
    });
  }

  public async ngOnInit() {
    const params = this._activatedRoute.snapshot.params;
    if (!params.id) {
      return;
    }

    await this.initialize(params.id);

    await this.userRoleRefresh();
    await this.sportTypeRefresh();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._baseGroupSubscription);
  }

  public async initialize(personId: number) {
    this.personViewModel = await this.personService.initialize(personId);
    this.allowEdit = await this.personService.allowEdit();
    const authPerson = await this._authorizationService.getPerson();
    this._myProfile = this.personService.personViewModel.data.id == authPerson.id;

    if (this.allowEdit) {
      if (this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR) && !this._myProfile) {
        this.tabs.push(
          {
            nameKey: 'myGroups', routerLink: 'my-group',
            restrictedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.ATHLETE, UserRoleEnum.SCOUT, UserRoleEnum.TRAINER, UserRoleEnum.REFEREE],
            visible: this.tabVisible
          }
        );
      }
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
    this.sportTypeButtonGroupItems = this.getSportTypeButtonGroupItems(this.personService.sportTypes);
  }

  public async onLogoChanged(fileList: FileList) {
    // TODO: Upload in image component
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = FileClass.PERSON;
      image.objectId = this.personService.personViewModel.data.id;
      image.type = ImageType.LOGO;
      const files = await this._participantRestApiService.uploadFile(image, [file]);
      this.personService.logoHandler.next(files[0]);
      this.logoImageComponent.refresh();
      // TODO: Add refresh logo
      // this._navbarService.emitLogoChange(true);
    }
  }

  //#region UserRole
  public async onEditUserRoles() {
    const userRoles = await this._participantRestApiService.getUserRoles();
    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.getItems = async pageQuery => {
      const items = userRoles.filter(userRole => userRole.name.toLowerCase().indexOf(pageQuery.name) > -1);
      const pageContainer = new PageContainer();
      pageContainer.from = 0;
      pageContainer.size = items.length;
      pageContainer.total = items.length;
      pageContainer.list = items;
      return pageContainer;
    };
    componentInstance.onSave = async selectedItems => {
      try {
        this.personService.userRoles = await this._participantRestApiService.updateUserUserRoles(new ListRequest(selectedItems), {}, {userId: this.personService.personViewModel.data.user.id});
        this.userRoleButtonGroupItems = this.getUserRoleButtonGroupItems(this.personService.userRoles);

        await this.onSelectedUserRole(this.personService.selectedUserRole);
        ref.dismiss();
      } catch (e) {
        if (e.status === 409) {
          await this._appHelper.showErrorMessage('persons.person.roles.conflict');
        } else {
          await this._appHelper.showErrorMessage('saveError');
        }
      }
    };
    await componentInstance.initialize(this.personService.userRoles);
  }

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
    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.getItems = async pageQuery => {
      return await this._participantRestApiService.getSportTypes(pageQuery);
    };
    componentInstance.onSave = async selectedItems => {
      try {
        this.personService.sportTypes = await this._participantRestApiService.updatePersonSportTypes(new ListRequest(selectedItems), {}, {personId: this.personService.personViewModel.data.id});
        this.sportTypeButtonGroupItems = this.getSportTypeButtonGroupItems(this.personService.sportTypes);

        await this.onSelectedSportType(this.personService.sportTypeSubject.getValue());
        ref.dismiss();
      } catch (e) {
        await this._appHelper.showErrorMessage('saveError');
      }
    };

    await componentInstance.initialize(this.personService.sportTypes);
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
    const currentTab = this.tabs.filter(t => this._router.url.includes(t.routerLink))[0];
    if (userRole && currentTab && !currentTab.restrictedRoles.find(x => x === userRole.userRoleEnum)) {
      return true;
    }
    return false;
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
