import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {BaseMessage} from '../../../data/remote/model/chat/message/base/base-message';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterContentInit {

  @Input()
  public baseMessage: BaseMessage;

  public personViewModel: PersonViewModel;
  public person: Person;

  constructor(private _authorizationService: AuthorizationService) {
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
  }

  async ngAfterContentInit() {
    this.personViewModel = new PersonViewModel(this.baseMessage.sender.person);
    await this.personViewModel.initialize();
  }

}
