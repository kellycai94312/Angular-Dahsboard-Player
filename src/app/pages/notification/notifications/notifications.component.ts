import {Component} from '@angular/core';
import {NgxTab} from '../../../module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  public readonly tabs: NgxTab[];

  constructor() {
    this.tabs = [
      {translation: 'all', link: 'all'},
      {translation: 'changes', link: 'change'}
    ];
  }

}
