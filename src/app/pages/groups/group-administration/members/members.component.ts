import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

// @Component({
//   selector: 'app-members',
//   templateUrl: './members.component.html',
//   styleUrls: ['./members.component.scss']
// })
export class MembersComponent implements OnInit {

  public groupId: number;

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.groupId = this._activatedRoute.parent.parent.snapshot.params.id;
  }

}
