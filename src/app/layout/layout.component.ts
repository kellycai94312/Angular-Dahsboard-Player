import { Component, OnInit } from '@angular/core';
import { LayoutService } from './shared/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public hidden: boolean;

  constructor(private layoutService: LayoutService) {
    this.hidden = true;
  }

  ngOnInit(): void {
    this.layoutService
      .displayLayout
      .subscribe(res => this.hidden = res);
  }

}
