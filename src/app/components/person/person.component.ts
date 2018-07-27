import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Person} from '../../data/remote/model/person';
import {PersonViewModel} from '../../data/local/view-model/person-view-model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends PersonViewModel implements OnInit, AfterContentInit {

  @Input()
  public canNavigate: boolean;

  constructor() {
    super(new Person());
    this.canNavigate = true;
  }

  ngOnInit() {
  }

  async ngAfterContentInit() {
    await this.initialize();
  }

}
