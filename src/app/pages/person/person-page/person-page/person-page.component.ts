import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxTab } from 'app/module/ngx/ngx-tabs/model/ngx-tab';
import { takeWhile } from 'rxjs/operators';
import { BasePersonComponent } from '../../model/base-person-component';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss'],
  providers: [PersonService]
})
export class PersonPageComponent extends BasePersonComponent implements OnInit {

  public readonly tabs: NgxTab[];

  constructor(private _activatedRoute: ActivatedRoute,
              personService: PersonService) {
    super(personService);
    this.tabs = [
      {translation: 'publications', link: 'publication'},
      {translation: 'personalProfile', link: 'about-me'}
      // TODO: {translation: 'professionalProfile', link: 'professional-profile'}
    ];
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this._activatedRoute.params
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(value => {
        this.personService.initialize(value.id);
      });
  }

}
