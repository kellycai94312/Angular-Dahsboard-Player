import { Component, OnInit } from '@angular/core';
import { LayoutService } from './shared/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public hidden = true;

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.layoutService
      .displayLayout
      .subscribe(res => this.hidden = res);
  }

}
