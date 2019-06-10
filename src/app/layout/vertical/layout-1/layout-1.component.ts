import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {navigation} from 'app/navigation/navigation';
import {ConversationWrapper} from '../../../data/local/conversation-wrapper';

@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;
  public selectedConversation: ConversationWrapper;
  public sizeNgxContainer = '60px';

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   */
  constructor(
    private _fuseConfigService: FuseConfigService
  ) {
    // Set the defaults
    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
