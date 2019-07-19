import {Component, Input} from '@angular/core';
import {NgxDate} from '../model/ngx-date';

@Component({
  selector: 'ngx-date',
  templateUrl: './ngx-date.component.html',
  styleUrls: ['./ngx-date.component.scss']
})
export class NgxDateComponent {

  @Input()
  public data: NgxDate;

}
