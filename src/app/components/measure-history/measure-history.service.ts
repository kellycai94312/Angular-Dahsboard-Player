import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class MeasureHistoryService {

  @Input()
  dateSubject: Subject<any[]>;

  constructor() {
    this.dateSubject = new Subject<any[]>();
  }

}
