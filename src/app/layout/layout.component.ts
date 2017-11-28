import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private hidden: boolean = true;

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.layoutService
      .displayLayout
      .subscribe(res => this.hidden = res);
  }

}

