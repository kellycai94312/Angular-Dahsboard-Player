import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  readonly className: string = 'collapsed';

  public isCollapsed: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isCollapsed = localStorage.getItem(this.className) === 'true';
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.className, String(this.isCollapsed));
  }

}
