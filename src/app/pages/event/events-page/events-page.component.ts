import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import {Tab} from '../../../data/local/tab';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {

  public tabs: Tab[];

  constructor(private _translateService: TranslateService) {
  }

  async ngOnInit() {
    this.tabs = [];
    const list = new Tab();
    list.name = await this._translateService.get('list').toPromise();
    list.routerLink = 'list';
    this.tabs.push(list);

    const calendar = new Tab();
    calendar.name = await this._translateService.get('calendar').toPromise();
    calendar.routerLink = 'calendar';
    this.tabs.push(calendar);
  }

}
