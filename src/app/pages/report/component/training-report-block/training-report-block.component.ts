import {Component, Input, OnInit} from '@angular/core';
import {BaseTrainingBlock} from '../../../../data/remote/model/training/report/base/base-training-block';

@Component({
  selector: 'app-training-report-block',
  templateUrl: './training-report-block.component.html',
  styleUrls: ['./training-report-block.component.scss']
})
export class TrainingReportBlockComponent<T extends BaseTrainingBlock> implements OnInit {

  @Input()
  public data: T;

  constructor() {
  }

  ngOnInit() {
  }

}
