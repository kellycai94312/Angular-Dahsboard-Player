import {Component} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {SplitButtonItem} from '../../../components/ngx-split-button/bean/split-button-item';
import {TemplateModalService} from '../../../service/template-modal.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent {

  public readonly tabs: Tab[];

  constructor(private _templateModalService: TemplateModalService) {
    const addEventSplitButtonsItem: SplitButtonItem = {
      nameKey: 'add',
      callback: async () => {
        await this._templateModalService.showEditEventModal();
      }
    };
    this.tabs = [
      {
        nameKey: 'calendar',
        routerLink: 'calendar',
        splitButtonsItems: [addEventSplitButtonsItem]
      },
      {
        nameKey: 'list',
        routerLink: 'list',
        splitButtonsItems: [addEventSplitButtonsItem]
      }
    ];
  }

}
