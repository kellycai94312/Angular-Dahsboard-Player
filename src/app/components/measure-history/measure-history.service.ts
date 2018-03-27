import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MeasureHistoryService {

  @Input()
  dateSubject: Subject<any[]>;

  constructor() {
    this.dateSubject = new Subject<any[]>();
  }

}
