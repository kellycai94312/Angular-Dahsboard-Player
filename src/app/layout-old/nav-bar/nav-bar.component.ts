import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../data/remote/model/person';
import {Router} from '@angular/router';
import {ImageService} from '../../shared/image.service';
import {SubscriptionLike as ISubscription} from 'rxjs';
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

  @ViewChild('logo', { static: false })
  public logo: ImageComponent;

  public readonly menuItems: MenuItem[];
  public person: Person;

  private readonly _fullNameChangeSubscription: ISubscription;
  private readonly _logoChangeSubscription: ISubscription;
  private readonly _conversationMenuItem: MenuItem;
  private readonly _unreadTotalMessageSubscription: ISubscription;

  constructor(private _router: Router,
              private _imageService: ImageService,
              private _authorizationService: AuthorizationService,
              private _conversationService: ConversationService,
              private _appHelper: AppHelper) {
    this.person = new Person();

    this._conversationMenuItem = {iconClassName: 'fa fa-comments', routerLink: 'conversation'};
    this.menuItems = [
      {iconClassName: 'fa fa-bell', routerLink: 'notification'},
      this._conversationMenuItem
    ];

    this._unreadTotalMessageSubscription = this._conversationService.unreadTotalHandle.subscribe(x => {
      this._conversationMenuItem.count = x.value;
    });
  }

  async ngOnInit() {
    this._conversationMenuItem.count = await this._conversationService.getUnreadTotalMessages();

    // TODO: Use PersonViewModel
    const person = this._authorizationService.session.person;
    if (person) {
      // this.person = await this._profileService.getPerson(person.id);
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
