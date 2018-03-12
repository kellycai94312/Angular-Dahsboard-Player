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
    const data = [{
      x: this._measureValues.map(mv => new Date(mv.created)),
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
    const layout = {
      xaxis: {
        type: 'date'
      }
    };
    Plotly.plot(element, data, layout);
  }

}
