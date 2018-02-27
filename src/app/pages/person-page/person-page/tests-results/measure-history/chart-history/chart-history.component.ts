import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MeasureHistoryService } from '../measure-history.service';
import { ExerciseExecMeasureValue } from '../../../../../../data/remote/model/training/exercise-exec-measure-value';

@Component({
  selector: 'app-chart-history',
  templateUrl: './chart-history.component.html',
  styleUrls: ['./chart-history.component.scss']
})
export class ChartHistoryComponent implements OnInit {

  @ViewChild('chart')
  public el: ElementRef;

  private _measureValues: ExerciseExecMeasureValue[];

  constructor(private _measureHistoryService: MeasureHistoryService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const element = this.el.nativeElement;
    Plotly.relayout(element, {width: event.target.innerWidth * .95, height: event.target.innerHeight / 2});
  }

  ngOnInit() {
    const element = this.el.nativeElement;
    this._measureValues = this._measureHistoryService.measureValues.filter(mv => !isNaN(Number(mv.value)));
    let data = [{
      x: this._measureValues.map(mv => mv.created.toLocaleString().substring(0, 10)),
      y: this._measureValues.map(mv => mv.value),
      type: 'bar',
      // hoverinfo: 'none',
      // text: yValue,
      // textposition: 'auto',
      // textfont: {
      //   family: 'Sans Serif',
      //   size: 22,
      //   color: '#fff'
      // }
    }];
    Plotly.plot(element, data);
  }

}
