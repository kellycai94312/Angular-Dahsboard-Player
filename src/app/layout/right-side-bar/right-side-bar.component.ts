import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss'],
  animations: [
    trigger(
      'smoothView', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class RightSideBarComponent {

  public readonly condition = SideBarCondition;
  public currentCondition: SideBarCondition = SideBarCondition.HIDDEN;
  public readonly sideBarItems: SideBarItem[];

  constructor() {
    this.sideBarItems = [
      new SideBarItem('calendar', SideBarCondition.CALENDAR),
      new SideBarItem('messages.section', SideBarCondition.MESSAGES)
    ];
  }

  toggle(newCondition: SideBarCondition) {
    if (newCondition == this.currentCondition) {
      this.currentCondition = SideBarCondition.HIDDEN;
    } else {
      this.currentCondition = newCondition;
    }
  }

}

enum SideBarCondition {
  HIDDEN = 'HIDDEN',
  CALENDAR = 'CALENDAR',
  MESSAGES = 'MESSAGES'
}

class SideBarItem {
  nameKey: string;
  condition: SideBarCondition;

  constructor(nameKey: string, condition: SideBarCondition) {
    this.nameKey = nameKey;
    this.condition = condition;
  }

}
