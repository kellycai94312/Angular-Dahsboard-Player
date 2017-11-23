import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  toggleMenu = false;

  constructor() { }

  ngOnInit() {
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

}
