import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {take} from 'rxjs/operators';
import {Person} from '../../../../data/remote/model/person';

@Component({
  selector: 'app-person-news',
  templateUrl: './person-news.component.html',
  styleUrls: ['./person-news.component.scss']
})
export class PersonNewsComponent implements OnInit {

  public person: Person;

  constructor(private _authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this._authorizationService.personSubject
      .pipe(take(1))
      .subscribe(value => {
        this.person = value;
      });
  }

}
