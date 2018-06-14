import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {GroupViewModel} from '../../../data/local/view-model/group/group-view-model';
import {Group} from '../../../data/remote/model/group/base/group';
import {ImageDimension} from '../../../data/local/image-dimension';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends GroupViewModel implements OnInit, AfterContentInit {

  @Input()
  public dimension: any;

  constructor() {
    super(new Group());
    this.dimension = ImageDimension[ImageDimension.W80xH80];
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.initialize();
  }

}
