import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-logo-card',
  templateUrl: './logo-card.component.html',
  styleUrls: ['./logo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoCardComponent {

  @Input()
  public titleTranslation: string;

}
