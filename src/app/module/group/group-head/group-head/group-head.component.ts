import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PropertyConstant } from 'app/data/local/property-constant';
import { FileClass } from 'app/data/remote/model/file/base';
import { ImageType } from 'app/data/remote/model/file/image';
import { Group } from 'app/data/remote/model/group/base';
import { IntervalGroup } from 'app/data/remote/model/group/interval';
import { Organization } from 'app/data/remote/model/group/organization';
import { GroupPerson, GroupPersonType, GroupPersonTypeStateEnum } from 'app/data/remote/model/group/person';
import { Team } from 'app/data/remote/model/group/team';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { MenuItem } from 'app/module/common/item-line/model/menu-item';
import { GroupWindowService } from 'app/services/windows/group-window/group-window.service';
import { PermissionService } from 'app/shared/permission.service';
import { AppHelper } from 'app/utils/app-helper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-head',
  templateUrl: './group-head.component.html',
  styleUrls: ['./group-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupHeadComponent {

  @Input()
  public group: Group;

  @Input()
  public set groupPerson(value: GroupPerson) {
    this._groupPerson = value;
    this._updateGroupActions();
  }

  @Input()
  public allowSettings = true;

  @Input()
  public canEdit: boolean;

  @Output()
  public readonly navigate = new EventEmitter();

  @Output()
  public readonly changeGroupPerson = new EventEmitter<GroupPerson>();

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public actions: MenuItem[] = [];
  private _groupPerson: GroupPerson;

  constructor(private _translateService: TranslateService,
              private _permissionService: PermissionService,
              private _router: Router,
              private _appHelper: AppHelper,
              private _groupWindowService: GroupWindowService,
              private _groupApiService: GroupApiService) {
  }

  public get groupPerson(): GroupPerson {
    return this._groupPerson;
  }

  public get groupDescription(): string[] {
    const items = [`${this._translateService.instant('groupType')} - ${this._translateService.instant(`groupTypeEnum.${this.group.discriminator}`)}`];
    if (this.group instanceof Organization && this.group.organizationType) {
      items.push(`${this._translateService.instant('groupType')} - ${this.group.organizationType.name}`);
    } else if (this.group instanceof Team) {
      if (this.group.sportType) {
        items.push(`${this._translateService.instant('sportType')} - ${this.group.sportType.name}`);
      }
      if (this.group.teamType) {
        items.push(`${this._translateService.instant('teamType')} - ${this.group.teamType.name}`);
      }
      if (this.group.league) {
        items.push(`${this._translateService.instant('league')} - ${this.group.league.name}`);
      }
      if (this.group.ageGroup) {
        items.push(`${this._translateService.instant('ageGroup')} - ${this.group.ageGroup.name}`);
      }
    } else if (this.group instanceof IntervalGroup) {
      items.push(`${this._translateService.instant('startDate')} -  ${this._appHelper.dateByFormat(this.group.startDate, PropertyConstant.dateFormat)}`);
      items.push(`${this._translateService.instant('finishDate')} -  ${this._appHelper.dateByFormat(this.group.finishDate, PropertyConstant.dateFormat)}`);
    }

    return items;
  }

  public async onEditSettings(): Promise<void> {
    await this._router.navigate(['/group', this.group.id, 'settings']);
  }

  public async onNavigate(): Promise<void> {
    this.navigate.emit();
    await this._router.navigate(['/group', this.group.id]);
  }

  private _updateGroupActions(): void {
    this.actions = [];
    const isOwner = this._groupPerson && this._permissionService.areYouCreator(this.group, this._groupPerson.person);
    if (this._groupPerson) {
      if (!isOwner) {
        const groupPersonType = this._groupPerson.groupPersonTypes.find(x => x instanceof GroupPersonType) as GroupPersonType;
        if (groupPersonType) {
          if (groupPersonType.stateEnum !== GroupPersonTypeStateEnum.FOLLOWING) {
            this.actions.push({
              translationLabel: 'leave',
              action: item => {
                this._leaveGroup(this.group).subscribe();
              }
            });
          } else if (groupPersonType.stateEnum === GroupPersonTypeStateEnum.FOLLOWING) {
            this.actions.push({
              translationLabel: 'unsubscribe',
              action: item => {
                this._leaveGroup(this.group).subscribe();
              }
            });
          }
        }
      }
    } else {
      this.actions.push(...[
        {
          translationLabel: 'join',
          action: async () => {
            const result = await this._groupWindowService.showSelectionGroupVacanciesModal(this.group, false, []);
            if (result.result) {
              const groupPerson = await this._groupApiService.joinGroup(this.group, result.data).toPromise();
              this.changeGroupPerson.emit(groupPerson);
            }
          }
        },
        {
          translationLabel: 'subscribe',
          action: async () => {
            const groupPerson = await this._groupApiService.followGroup(this.group).toPromise();
            this.changeGroupPerson.emit(groupPerson);
          }
        }
      ]);
    }
  }

  private _leaveGroup(group: Group): Observable<null> {
    // TODO: Add leave from group
    // return this._groupApiService.leaveGroup(group)
    //   .pipe(tap(() => {
    //     this.changeGroupPerson.emit(void 0);
    //   }));

    throw new Error('Not implemented leave from group');
  }

}
