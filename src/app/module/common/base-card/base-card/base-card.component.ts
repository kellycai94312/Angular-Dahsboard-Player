import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MenuItem} from '../../item-line/model/menu-item';

@Component({
  selector: 'app-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseCardComponent {

  @Input()
  public cardTitle: string;

  @Input()
  public translationTitle: string;

  @Input()
  public actions: MenuItem[] = [];

}
