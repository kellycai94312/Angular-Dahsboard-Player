import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {LayoutService} from '../../../shared/layout.service';
import {SubscriptionLike} from 'rxjs';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnDestroy {

  private readonly _darkSubscription: SubscriptionLike;

  public dark: boolean;

  constructor(private _layoutService: LayoutService) {
    this._darkSubscription = this._layoutService.dark.subscribe(value => this.dark = value);
  }

  ngOnDestroy(): void {
    this._darkSubscription.unsubscribe();
  }

}
