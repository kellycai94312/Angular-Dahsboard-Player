import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() onToggleMenu = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public toggleMenu(): void {
    this.onToggleMenu.emit();
  }

}
