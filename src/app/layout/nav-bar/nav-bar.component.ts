import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../data/remote/model/person';
import {Router} from '@angular/router';
import {ImageService} from '../../shared/image.service';
import {ProfileService} from '../../shared/profile.service';
import {ISubscription} from 'rxjs/Subscription';
import {AuthorizationService} from '../../shared/authorization.service';
import {ImageComponent} from '../../components/image/image.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public person: Person;
  public personProfileRouterLink: string;

  @ViewChild('logo')
  public logo: ImageComponent;

  private readonly _fullNameChangeSubscription: ISubscription;
  private readonly _logoChangeSubscription: ISubscription;

  constructor(private _router: Router,
              private _imageService: ImageService,
              private _profileService: ProfileService,
              private _authorizationService: AuthorizationService) {
    this.person = new Person();

    // TODO: Use PersonViewModel
    this._fullNameChangeSubscription = _profileService.fullNameChangeEmitted$
      .subscribe(person => this.person.firstName = person.firstName);
    this._logoChangeSubscription = _profileService.logoChangeEmitted$
      .subscribe(() => this.logo.refresh());
  }

  async ngOnInit() {
    // TODO: Use PersonViewModel
    const personId = this._authorizationService.session.personId;
    if (personId) {
      this.personProfileRouterLink = '/person/' + personId;
      this.person = await this._profileService.getPerson(personId);
    } else {
      await this._router.navigate(['/registration/person']);
    }
  }

  ngOnDestroy(): void {
    this._fullNameChangeSubscription.unsubscribe();
    this._logoChangeSubscription.unsubscribe();
  }

  public async signOut() {
    await this._authorizationService.logOut();
  }

}
