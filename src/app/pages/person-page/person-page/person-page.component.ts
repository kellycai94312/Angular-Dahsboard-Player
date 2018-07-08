import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../../data/remote/model/person';
import {TranslateService} from '@ngx-translate/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {UserRole} from '../../../data/remote/model/user-role';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SportType} from '../../../data/remote/model/sport-type';
import {ImageService} from '../../../shared/image.service';
import {PersonService} from './person.service';
import {LocalStorageService} from '../../../shared/local-storage.service';
import {ProfileService} from '../../../shared/profile.service';
import {PersonTab} from './person-tab';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ListRequest} from '../../../data/remote/request/list-request';
import notify from 'devextreme/ui/notify';
import {UserRoleItemComponent} from '../../../components/user-role-item/user-role-item.component';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {ModalSelectPageComponent} from '../../../components/modal-select-page/modal-select-page.component';
import {SportTypeItemComponent} from '../../../components/sport-type-item/sport-type-item.component';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {GroupComponent} from '../../groups/group/group.component';
import {ISubscription} from 'rxjs/Subscription';
import {AuthorizationService} from '../../../shared/authorization.service';
import {ToastrService} from 'ngx-toastr';
import {ImageComponent} from '../../../components/image/image.component';
import {Image} from '../../../data/remote/model/file/image/image';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit, OnDestroy {

  @ViewChild(GroupComponent)
  public groupComponent: GroupComponent;

  public person: Person;
  public baseGroup: GroupPerson;
  public isEditAllow: boolean;
  public queryParams: Params;
  public tabs: PersonTab[];

  public userRoles: UserRole[] = [];
  public personSportTypes: SportType[];

  @ViewChild('logo')
  public logo: ImageComponent;
  public roleToggle: UserRole;
  public sportTypeToggle: SportType;

  public editContactNameKey: string;
  public canEditConnection: boolean;
  public hasConnection: boolean;

  private readonly baseGroupSubscription: ISubscription;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router,
              private route: ActivatedRoute,
              private _localStorageService: LocalStorageService,
              private _imageService: ImageService,
              private _personService: PersonService,
              private _navbarService: ProfileService,
              private _modalService: NgbModal,
              private _authorizationService: AuthorizationService,
              private _translate: TranslateService,
              private _toastrService: ToastrService) {

    this.isEditAllow = false;

    this.tabs = [];
    this.tabs.push(this.createPersonTab('persons.person.personal.section', 'personal', []));
    this.tabs.push(this.createPersonTab('persons.person.anthropometry.section', 'anthropometry', [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT], true));
    this.tabs.push(this.createPersonTab('persons.person.ranks.section', 'ranks', [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT], true));
    this.tabs.push(this.createPersonTab('persons.person.achievements.section', 'achievements', [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.ATHLETE], true, true));
    this.tabs.push(this.createPersonTab('persons.person.myRegion.section', 'my_region', [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.ATHLETE], true, true));
    this.tabs.push(this.createPersonTab('persons.person.contact.section', 'contact', []));
    this.tabs.push(this.createPersonTab('persons.person.testsResults.section', 'tests_results', [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.REFEREE, UserRoleEnum.TRAINER, UserRoleEnum.SCOUT], true));
    this.tabs.push(this.createPersonTab('events', 'events', [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR], true));
    this.tabs.push(this.createPersonTab('persons.person.groups.section', 'groups', [], true));
    this.tabs.push(this.createPersonTab('categories', 'category', [UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.ATHLETE, UserRoleEnum.SCOUT, UserRoleEnum.TRAINER], true));

    this.baseGroupSubscription = this._personService.baseGroupChangeEmitted$.subscribe(x => {
      this.baseGroup = x;
      if (this.baseGroup && this.groupComponent) {
        this.groupComponent.update(this.baseGroup.group);
      }
    });
  }

  public onEditContactClick = async (): Promise<void> => {
    await this.editConnection(this.person);
  };

  isTabVisible = (item: PersonTab): boolean => {
    return item
      && (!item.private || this.isEditAllow)
      && (!item.hasAnyRole || this.roleToggle && item.restrictedRoles.indexOf(UserRoleEnum[this.roleToggle.userRoleEnum]) < 0);
  };

  async onLogoChange(event) {
    // TODO: Upload in image component
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = FileClass.PERSON;
      image.objectId = this.person.id;
      image.type = ImageType.LOGO;
      await this.participantRestApiService.uploadFile(image, [file]);
      this.logo.refresh();
      this._navbarService.emitLogoChange(true);
    }
  }

  async editUserRoles() {
    const roles = await this.participantRestApiService.getUserRoles();
    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = UserRoleItemComponent;
    componentInstance.getItems = async pageQuery => {
      const items = roles.filter(userRole => userRole.userRoleEnum.toString().toLowerCase().indexOf(pageQuery.name) > -1);
      const pageContainer = new PageContainer();
      pageContainer.from = 0;
      pageContainer.size = items.length;
      pageContainer.total = items.length;
      pageContainer.list = items;
      return pageContainer;
    };
    componentInstance.onSave = async selectedItems => {
      try {
        this.userRoles = await this.participantRestApiService.changeRoles(new ListRequest(selectedItems));
        this.roleToggle = this.userRoles.length ? this.userRoles[0] : null;
        ref.dismiss();
        await this.onUserRoleChange();
      } catch (e) {
        if (e.status === 409) {
          const errorMessage = await this._translate.get('persons.person.roles.conflict').toPromise();
          notify(errorMessage, 'warning', 3000);
        } else {
          throw e;
        }
      }
    };
    await componentInstance.initialize(this.userRoles);
  }

  async editSportTypes() {
    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = SportTypeItemComponent;
    componentInstance.getItems = async pageQuery => {
      return await this.participantRestApiService.getSportTypes(pageQuery);
    };
    componentInstance.onSave = async selectedItems => {
      try {
        this.personSportTypes = await this.participantRestApiService.changeSportTypes(new ListRequest(selectedItems));
        this.sportTypeToggle = this.personSportTypes.length ? this.personSportTypes[0] : null;
        ref.dismiss();
      } catch (e) {
      }
      await this.onSportTypeChange();
    };

    await componentInstance.initialize(this.personSportTypes);
  }

  async onUserRoleChange() {
    this.queryParams['userRole'] = this.roleToggle ? this.roleToggle.id : null;
    /*redirect to personal tab when user selects role in restrictedRoles array*/
    const currentTab = this.tabs.filter(t => this.router.url.includes(t.routerLink))[0];
    if (!this.roleToggle || currentTab && currentTab.restrictedRoles.indexOf(UserRoleEnum[this.roleToggle.userRoleEnum]) > -1) {
      await this.router.navigate(['./'], {relativeTo: this.route, queryParams: this.queryParams});
    } else {
      await this.router.navigate([], {queryParams: this.queryParams});
    }
    this._personService.emitUserRoleSelect(this.roleToggle);

    if (this.roleToggle) {
      // load base group
      try {
        this.baseGroup = await this.participantRestApiService.getBaseGroup({
          id: this.person.id,
          userRoleId: this.roleToggle.id
        });
      } catch (e) {
        this.baseGroup = null;
      }
    } else {
      this.baseGroup = null;
    }

    if (this.baseGroup && this.groupComponent) {
      this.groupComponent.update(this.baseGroup.group);
    }

    this._personService.emitBaseGroupSelect(this.baseGroup);
  }

  async onSportTypeChange() {
    this._personService.emitSportTypeSelect(this.sportTypeToggle);
    this.queryParams['sportType'] = this.sportTypeToggle ? this.sportTypeToggle.id : null;
    await this.router.navigate([], {queryParams: this.queryParams});
  }

  async ngOnInit() {
    this.queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.route.params.subscribe(params => {
      this._navbarService.getPerson(+params.id).then(async person => {
        this.person = person;
        this.isEditAllow = person.id === this._authorizationService.session.personId;
        this._personService.shared = {person: person, isEditAllow: this.isEditAllow};
        if (this.logo) {
          this.logo.refresh(person.id);
        }

        await this.initializeConnection(person);

        // load user roles
        this.participantRestApiService.getUserRolesByUser({id: person.user.id})
          .then(async userRoles => {
            this.userRoles = userRoles;
            if (userRoles.length) {
              if (this.queryParams['userRole']) {
                for (const userRole of userRoles) {
                  if (userRole.id === +this.queryParams['userRole']) {
                    this.roleToggle = userRole;
                    this._personService.userRoleSelectDefault = userRole;
                    break;
                  }
                }
                if (!this.roleToggle) {
                  this.roleToggle = userRoles[0];
                  this._personService.userRoleSelectDefault = userRoles[0];
                }
              } else {
                this.roleToggle = userRoles[0];
                this._personService.userRoleSelectDefault = userRoles[0];
              }
              await this.onUserRoleChange();
            }
          });

        this.participantRestApiService.getPersonSportTypes({id: person.id})
          .then(async personSportTypes => {
            this.personSportTypes = personSportTypes;
            if (personSportTypes.length) {
              if (this.queryParams['sportType']) {
                for (const sportType of personSportTypes) {
                  if (sportType.id === +this.queryParams['sportType']) {
                    this.sportTypeToggle = sportType;
                    this._personService.sportTypeSelectDefault = sportType;
                    break;
                  }
                }
                if (!this.sportTypeToggle) {
                  this.sportTypeToggle = personSportTypes[0];
                  this._personService.sportTypeSelectDefault = personSportTypes[0];
                }
              } else {
                this.sportTypeToggle = personSportTypes[0];
                this._personService.sportTypeSelectDefault = personSportTypes[0];
              }
              await this.onSportTypeChange();
            }
          });
      });
    });
  }

  ngOnDestroy(): void {
    this.baseGroupSubscription.unsubscribe();
  }

  private createPersonTab(nameKey: string, routerLink: string, restrictedRoles: UserRoleEnum[], hasAnyRole: boolean = false, privateTab: boolean = false): PersonTab {
    const personTab = new PersonTab();
    personTab.nameKey = nameKey;
    personTab.routerLink = routerLink;
    personTab.restrictedRoles = restrictedRoles;
    personTab.hasAnyRole = hasAnyRole;
    personTab.private = privateTab;
    return personTab;
  }

  //#region Connection

  private async initializeConnection(person: Person) {
    this.canEditConnection = person.id != this._authorizationService.session.personId;
    if (!this.canEditConnection) {
      return;
    }

    try {
      this.hasConnection = (await this.participantRestApiService.hasConnection({id: person.id})).value;
      this.editContactNameKey = this.hasConnection ? 'removeContact' : 'addContact';
    } catch (e) {
    }
  }

  private async editConnection(person: Person): Promise<void> {
    try {
      if (this.hasConnection) {
        await this.participantRestApiService.removeConnection({id: person.id});
      } else {
        await this.participantRestApiService.createConnection({id: person.id});
      }

      this.hasConnection = !this.hasConnection;
      this.editContactNameKey = this.hasConnection ? 'removeContact' : 'addContact';
    } catch (e) {
      this._toastrService.error('error');
    }
  }

  //#endregion

}
