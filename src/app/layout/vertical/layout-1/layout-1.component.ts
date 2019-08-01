import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {takeWhile} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {navigation} from 'app/navigation/navigation';
import {ConversationWrapper} from '../../../data/local/conversation-wrapper';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';

@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy {

  public fuseConfig: any;
  public navigation: any;
  public selectedConversation: ConversationWrapper;
  public sizeNgxContainer = '60px';
  public person: Person;
  private _notDestroyed = true;

  constructor(private _fuseConfigService: FuseConfigService,
              private _authorizationService: AuthorizationService) {
    this.navigation = navigation;
  }

  public ngOnInit(): void {
    this._fuseConfigService.config
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    this._authorizationService.personSubject
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        this.person = value;
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public onSelectConversation(val: ConversationWrapper) {
    this.selectedConversation = val;
  }

  public onClickChat(): void {
    const number = parseInt(this.sizeNgxContainer);
    if (number <= 60) {
      this.sizeNgxContainer = '460px';
    } else {
      this.sizeNgxContainer = '60px';
    }
  }

}
