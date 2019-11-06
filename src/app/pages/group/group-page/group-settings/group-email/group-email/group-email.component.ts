import { Component } from '@angular/core';
import { NgxTab } from 'app/module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-group-email',
  templateUrl: './group-email.component.html',
  styleUrls: ['./group-email.component.scss']
})
export class GroupEmailComponent {

  public readonly tabs: NgxTab[] = [];

  constructor() {
    this.tabs = [
      {label: 'Заявки. Физические лица', link: 'individual-group-claim'},
      {label: 'Заявки. Юридические лица', link: 'legal-entity-group-claim'}
    ];
  }

}
