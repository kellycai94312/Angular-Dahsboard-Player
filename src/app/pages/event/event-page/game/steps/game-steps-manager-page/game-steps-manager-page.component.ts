import {Component} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';

@Component({
  selector: 'app-game-steps-manager-page',
  templateUrl: './game-steps-manager-page.component.html',
  styleUrls: ['./game-steps-manager-page.component.scss']
})
export class GameStepsManagerPageComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      {
        nameKey: 'information',
        routerLink: '1'
      },
      {
        nameKey: 'participants',
        routerLink: '2'
      },
      {
        nameKey: 'execution',
        routerLink: '3'
      }
    ];
  }

}
