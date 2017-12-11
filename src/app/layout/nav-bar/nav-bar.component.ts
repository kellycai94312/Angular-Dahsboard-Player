import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { IdentifiedObject } from '../../data/remote/base/identified-object';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Person } from '../../data/remote/model/person';
import { Router } from '@angular/router';
import { LayoutService } from '../shared/layout.service';
import { LogoService } from '../../shared/logo.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public person: Person;
  public personProfileRouterLink: string;
  public fullName: string;
  private logo: string;
  private logoDefault: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _localStorageService: LocalStorageService,
              private _router: Router,
              private _layoutService: LayoutService,
              private _logoService: LogoService) {
    this.person = new Person();
    this.personProfileRouterLink = '/person/' + this._localStorageService.getCurrentPersonId();
    this.logoDefault = _logoService.getPersonDefault();
  }

  async ngOnInit() {
    const identifiedObject = new IdentifiedObject();
    identifiedObject.id = this._localStorageService.getCurrentPersonId();
    this.person = await this._participantRestApiService.getPerson(identifiedObject);
    /*fullName maximum length is 25 symbols*/
    this.fullName = this.trim(this.person.lastName) + ' ' + this.trim(this.person.firstName);
    this.logo = this._logoService.getPerson(this.person.id);
  }

  public async signOut(event: any) {
    await this._participantRestApiService.logout();
    this._layoutService.hidden.next(true);
    this._localStorageService.signOut();
    await this._router.navigate(['/login']);
  }

  private trim(str: string) {
    return str.length > 11 ? str.substring(0, 10) + '..' : str;
  }
}
