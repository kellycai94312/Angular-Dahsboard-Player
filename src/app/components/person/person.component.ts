import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Person} from '../../data/remote/model/person';
import {PersonViewModel} from '../../data/local/view-model/person-view-model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends PersonViewModel implements OnInit, AfterContentInit {

  constructor() {
    super(new Person());
  }

  ngOnInit() {
  }

  async ngAfterContentInit() {
    await this.initialize();
  }

}
