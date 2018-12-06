import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../data/remote/model/person';
import {Router} from '@angular/router';
import {ImageService} from '../../shared/image.service';
import {ProfileService} from '../../shared/profile.service';
import {ISubscription} from 'rxjs/Subscription';
import {AuthorizationService} from '../../shared/authorization.service';
import {ImageComponent} from '../../components/image/image.component';
import {MenuItem} from '../../data/local/menu-item';
import {ConversationService} from '../../shared/conversation.service';
import {AppHelper} from '../../utils/app-helper';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @ViewChild('logo')
  public logo: ImageComponent;

  public readonly menuItems: MenuItem[];
  public person: Person;

  private readonly _fullNameChangeSubscription: ISubscription;
  private readonly _logoChangeSubscription: ISubscription;
  private readonly _conversationMenuItem: MenuItem;
  private readonly _unreadTotalMessageSubscription: ISubscription;

  constructor(private _router: Router,
              private _imageService: ImageService,
              private _profileService: ProfileService,
              private _authorizationService: AuthorizationService,
              private _conversationService: ConversationService,
              private _appHelper: AppHelper) {
    this._unreadTotalMessageSubscription = this._conversationService.unreadTotalHandle.subscribe(x => {
      this._conversationMenuItem.count = x.value;
    });

    this.person = new Person();

    // TODO: Use PersonViewModel
    this._fullNameChangeSubscription = _profileService.fullNameChangeEmitted$
      .subscribe(person => this.person.firstName = person.firstName);
    this._logoChangeSubscription = _profileService.logoChangeEmitted$
      .subscribe(() => this.logo.refresh());

    this._conversationMenuItem = {iconClassName: 'fa fa-comments', routerLink: 'conversation'};
    this.menuItems = [
      {iconClassName: 'fa fa-bell', routerLink: 'notification'},
      this._conversationMenuItem
    ];
  }

  async ngOnInit() {
    // TODO: Use PersonViewModel
    const person = this._authorizationService.session.person;
    if (person) {
      this.person = await this._profileService.getPerson(person.id);
    } else {
      await this._router.navigate(['/sign-up/person']);
    }
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._fullNameChangeSubscription);
    this._appHelper.unsubscribe(this._logoChangeSubscription);
    this._appHelper.unsubscribe(this._unreadTotalMessageSubscription);
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
