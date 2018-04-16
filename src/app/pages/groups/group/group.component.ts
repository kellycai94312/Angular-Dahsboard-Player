import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {GroupViewModel} from '../../../data/local/view-model/group/group-view-model';
import {Group} from '../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends GroupViewModel implements OnInit, AfterContentInit {

  @Input()
  public logoSizeClass: string;

  constructor() {
    super(new Group());
    this.logoSizeClass = 'logo-lg';
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.initialize();
  }

}
