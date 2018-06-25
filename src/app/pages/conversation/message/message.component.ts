import {Component, DoCheck, Input, KeyValueDiffers, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';
import {Message} from '../../../data/remote/model/chat/message/message';
import {SystemMessageViewModel} from '../../../data/local/view-model/conversation/system-message-view-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, DoCheck {

  @Input()
  public message: Message;

  @Input()
  public onlyContent: boolean = false;

  public systemMessageViewModel: SystemMessageViewModel;
  public person: Person;
  private differ: any;

  constructor(private _authorizationService: AuthorizationService,
              private _router: Router,
              differs: KeyValueDiffers) {
    this.differ = differs.find([]).create();
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();

    await this.buildMessage();
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.message);
    if (changes) {
      changes.forEachChangedItem(async (elt) => {
        if (elt.key === 'content') {
          await this.buildMessage();
        }
      });
    }
  }

  public async onDataClick(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      const link = event.target.getAttribute('link');
      await this._router.navigate([link]);
    }
  }

  private async buildMessage() {
    this.systemMessageViewModel = new SystemMessageViewModel(this.message);
    await this.systemMessageViewModel.build();
  }

}
