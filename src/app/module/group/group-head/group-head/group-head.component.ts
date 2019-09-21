import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { FileClass } from '../../../../data/remote/model/file/base/file-class';
import { ImageType } from '../../../../data/remote/model/file/image/image-type';
import { GroupPerson, GroupPersonState } from '../../../../data/remote/model/group';
import { Group } from '../../../../data/remote/model/group/base';
import { IntervalGroup } from '../../../../data/remote/model/group/interval';
import { Organization } from '../../../../data/remote/model/group/organization/organization';
import { Team } from '../../../../data/remote/model/group/team';
import { GroupApiService } from '../../../../data/remote/rest-api/api/group/group-api.service';
import { GroupWindowService } from '../../../../services/windows/group-window/group-window.service';
import { PermissionService } from '../../../../shared/permission.service';
import { AppHelper } from '../../../../utils/app-helper';
import { MenuItem } from '../../../common/item-line/model/menu-item';

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
        if (this._groupPerson.state !== GroupPersonState.FOLLOWING) {
          this.actions.push({
            translationLabel: 'leave',
            action: item => {
              this._leaveGroup(this.group).subscribe();
            }
          });
        } else if (this._groupPerson.state === GroupPersonState.FOLLOWING) {
          this.actions.push({
            translationLabel: 'unsubscribe',
            action: item => {
              this._leaveGroup(this.group).subscribe();
            }
          });
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
    return this._groupApiService.leaveGroup(group)
      .pipe(tap(() => {
        this.changeGroupPerson.emit(void 0);
      }));
  }

}
