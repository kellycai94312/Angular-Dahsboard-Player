import {Component, OnInit} from '@angular/core';
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
export class RightSideBarComponent implements OnInit {

  public condition = SideBarCondition;
  public currentCondition: SideBarCondition = SideBarCondition.HIDDEN;
  public sideBarItems: SideBarItem[];

  constructor() {
    this.sideBarItems = [];

    const calendarItem = new SideBarItem();
    calendarItem.nameKey = 'calendar';
    calendarItem.condition = SideBarCondition.CALENDAR;
    this.sideBarItems.push(calendarItem);

    const messagesItem = new SideBarItem();
    messagesItem.nameKey = 'messages.section';
    messagesItem.condition = SideBarCondition.MESSAGES;
    this.sideBarItems.push(messagesItem);
  }

  ngOnInit() {
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
}
