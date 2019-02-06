import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import {navigation} from 'app/navigation/navigation';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  navigation: any;
  userStatusOptions: any[];

  public person: Person;
  public personLogoUrl: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {TranslateService} _translateService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
    private _authorizationService: AuthorizationService,
    private _participantRestApiService: ParticipantRestApiService,
    private _router: Router
  ) {
    // Set the defaults
    this.userStatusOptions = [
      {
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      },
      {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];

    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this._authorizationService.personSubject.pipe(
      takeUntil(this._unsubscribeAll),
      distinctUntilChanged()
    )
      .subscribe(val => {
        this.person = val;
        if (val) {
          this.personLogoUrl = this._participantRestApiService.getUrlImage({
            clazz: FileClass.PERSON,
            type: ImageType.LOGO,
            objectId: val.id,
            width: 40,
            height: 40
          });
        } else {
          delete this.personLogoUrl;
        }
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    // Do your search here...
    console.log(value);
  }

  public async openProfile() {
    // Reload children when on the same state /person/:id
    if (this._router.url.indexOf('/person/') == 0) {
      await this._router.navigate(['/person']);
    }
    await this._router.navigate(['/person', this._authorizationService.session.person.id]);
  }

  public async signOut() {
    await this._authorizationService.logOut();
  }

}
