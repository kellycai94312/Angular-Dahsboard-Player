import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Person } from '../../data/remote/model/person';
import { Router } from '@angular/router';
import { LayoutService } from '../shared/layout.service';
import { PictureService } from '../../shared/picture.service';
import { PictureClass } from '../../data/remote/misc/picture-class';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public person: Person;
  public personProfileRouterLink: string;
  public fullName: string;
  public logo: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _localStorageService: LocalStorageService,
              private _router: Router,
              private _layoutService: LayoutService,
              private _logoService: PictureService,
              private _profileService: ProfileService) {
    this.person = new Person();
    this.personProfileRouterLink = '/person/' + this._localStorageService.getCurrentPersonId();
    _profileService.fullNameChangeEmitted$.subscribe(person => this.setFullName(person));
    _profileService.logoChangeEmitted$.subscribe(logo => this.logo = logo);
  }

  async ngOnInit() {
    const personId = this._localStorageService.getCurrentPersonId();
    if (personId === 0) {
      this._router.navigate(['/registration/person']);
    }
    this.person = await this._profileService.getPerson(personId);
    this.setFullName(this.person);
    this.logo = this._logoService.getLogo(PictureClass.person, this.person.id);
  }

  public async signOut(event: any) {
    await this._participantRestApiService.logout();
    this._layoutService.hidden.next(true);
    this._localStorageService.signOut();
    await this._router.navigate(['/login']);
  }

  private setFullName(person: Person) {
    this.fullName = person.firstName + ' ' + person.lastName;
  }

}
