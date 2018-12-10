import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {Tab} from '../../../../data/local/tab';
import {GroupService} from '../service/group.service';
import {ImageComponent} from '../../../../components/image/image.component';
import {Image} from '../../../../data/remote/model/file/image/image';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateService} from '@ngx-translate/core';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {GroupAdministrationComponent} from '../../../groups/group-administration/group-administration.component';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PermissionService} from '../../../../shared/permission.service';
import {OrganizationTrainer} from '../../../../data/remote/model/group/organization-trainer';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTypeEnumClass = GroupTypeEnum;
  public readonly iconEnumClass = IconEnum;

  public group: Group;
  public groupPerson: GroupPerson;

  public textStateInGroup: string;

  @ViewChild('logo')
  public logo: ImageComponent;

  public readonly tabs: Tab[];
  public canEdit: boolean;
  public organizationTrainers: OrganizationTrainer[];
  private readonly _groupSubscription: ISubscription;
  private readonly _refreshMembersSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _modalService: NgbModal,
              private _appHelper: AppHelper,
              private _translateService: TranslateService,
              private _router: Router,
              private _templateModalService: TemplateModalService,
              private _permissionService: PermissionService,
              private _ngxModalService: NgxModalService,
              private _groupService: GroupService) {
    this._groupSubscription = this._groupService.groupSubject.subscribe(group => {
      this.group = group;
    });
    this._refreshMembersSubscription = this._groupService.refreshMembers.subscribe(async () => {
      await this.updateTrainerGroupPersons();
    });

    this.tabs = [
      {
        nameKey: 'news',
        routerLink: 'news'
      },
      {
        nameKey: 'members',
        routerLink: 'member'
      }
    ];
  }

  async ngOnInit() {
    const groupId = this._activatedRoute.snapshot.params.id;

    try {
      this.group = await this._participantRestApiService.getGroup({id: groupId});
      this._groupService.groupSubject.next(this.group);
      this.canEdit = await this._groupService.canEdit();
      if (this.group) {
        await this.baseInit();
      }
    } catch (e) {
      if (e.status == 403) {
        await this._router.navigate(['/group']);
      }
    }
    await this.updateTrainerGroupPersons();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._groupSubscription);
    this._appHelper.unsubscribe(this._refreshMembersSubscription);
  }

  public async updateTrainerGroupPersons() {
    this.organizationTrainers = (await this._participantRestApiService.getOrganizationTrainers({}, {},
      {
        groupId: this.group.id
      }
    )).sort((a, b) => {
      if (a.lead && !b.lead) {
        return -1;
      }
      if (!a.lead && b.lead) {
        return 1;
      }
      return 0;
    });
  }

  async baseInit() {
    try {
      this.groupPerson = await this._groupService.getCurrentGroupPerson();
      this.textStateInGroup = this._groupService.getKeyNamePersonStateInGroup(this._groupService.getGroupPersonState());

      await this._groupService.updateSubgroups();
    } catch (e) {
      if (e.status == 403) {
        await this._router.navigate(['/group']);
      }
    }
  }

  public async onLogoChange(event) {
    // TODO: Upload in image component
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = FileClass.GROUP;
      image.objectId = this.group.id;
      image.type = ImageType.LOGO;
      await this._participantRestApiService.uploadFile(image, [file]);

      this.logo.refresh();
    }
  }

  public onEditSettings = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'settings';
    await modal.componentInstance.initializeBody(GroupAdministrationComponent, async component => {
    });
    await this._ngxModalService.awaitModalResult(modal);
    await this.updateTrainerGroupPersons();
  };

}
