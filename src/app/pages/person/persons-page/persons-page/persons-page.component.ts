import {Component} from '@angular/core';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent {

  public readonly tabs: NgxTab[];

  constructor() {
    this.tabs = [
      {translation: 'myContacts', link: 'my'},
      {translation: 'all', link: 'all'}
    ];
  }

}
