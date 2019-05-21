import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ngx-busy-indicator',
  templateUrl: './ngx-busy-indicator.component.html',
  styleUrls: ['./ngx-busy-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxBusyIndicatorComponent {
}
