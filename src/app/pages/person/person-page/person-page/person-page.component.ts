import {Component, OnInit} from '@angular/core';
import {PersonService} from '../service/person.service';
import {ActivatedRoute} from '@angular/router';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {BasePersonComponent} from '../../model/base-person-component';
import {takeWhile} from 'rxjs/operators';

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
      {translation: 'aboutMe', link: 'about-me'}
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
