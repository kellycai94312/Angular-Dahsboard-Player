import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { IdentifiedObject } from '../../data/remote/base/identified-object';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Person } from '../../data/remote/model/person';
import { Router } from '@angular/router';
import { LayoutService } from '../shared/layout.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public person: Person;
  public personProfileRouterLink: string;
  public fullName: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _localStorageService: LocalStorageService,
              private _router: Router,
              private _layoutService: LayoutService) {
    this.person = new Person();
    this.personProfileRouterLink = '/person/' + this._localStorageService.getCurrentPersonId();
  }

  async ngOnInit() {
    const identifiedObject = new IdentifiedObject();
    identifiedObject.id = this._localStorageService.getCurrentPersonId();
    this.person = await this._participantRestApiService.getPerson(identifiedObject);
    this.fullName = this.person.lastName + ' ' + this.person.firstName[0].toUpperCase() + '.';
  }

  public async signOut(event: any) {
    this._layoutService.hidden.next(true);
    this._localStorageService.signOut();
    await this._router.navigate(['/login']);
  }
}
