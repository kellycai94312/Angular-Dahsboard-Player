import {Component, OnDestroy} from '@angular/core';
import {LayoutService} from '../shared/layout.service';
import {AppHelper} from '../utils/app-helper';
import {IEnvironment} from '../../environments/ienvironment';
import {environment} from '../../environments/environment';
import {EnvironmentType} from '../../environments/environment-type';
import {Unsubscribable} from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {

  public readonly environment: IEnvironment;
  public readonly environmentTypeClass = EnvironmentType;
  public hidden: boolean;
  public dark: boolean;

  private readonly _hiddenSubscription: Unsubscribable;
  private readonly _darkSubscription: Unsubscribable;

  constructor(private _layoutService: LayoutService,
              private _appHelper: AppHelper) {
    this.environment = environment;
    this.hidden = true;

    this._hiddenSubscription = this._layoutService.hidden.subscribe(val => this.hidden = val);
    this._darkSubscription = this._layoutService.dark.subscribe(value => this.dark = value);
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._hiddenSubscription);
    this._appHelper.unsubscribe(this._darkSubscription);
  }

}
