import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MeasureHistoryService } from '../measure-history.service';

@Component({
  selector: 'app-chart-history',
  templateUrl: './chart-history.component.html',
  styleUrls: ['./chart-history.component.scss']
})
export class ChartHistoryComponent implements OnInit {

  @ViewChild('chart')
  public el: ElementRef;

  @Input()
  measureValues: any[];

  @Output()
  measureValuesChange: EventEmitter<any>;

  @Input()
  setup: Function;

  @Input()
  getDate: Function;

  @Input()
  getValue: Function;

  private _maxBars: number;

  constructor(private _datePipe: DatePipe,
              private _measureHistoryService: MeasureHistoryService) {
    this._maxBars = 5;
    this.measureValuesChange = new EventEmitter<any>();
    this._measureHistoryService.dateSubject.subscribe((measureValues) => this.drawChart(measureValues));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const element = this.el.nativeElement;
    Plotly.relayout(element, {width: event.target.innerWidth * .45, height: event.target.innerHeight / 2});
  }

  async ngOnInit() {
    this.measureValues = await this.setup(true, this._maxBars);
    this.drawChart(this.measureValues);
  }

  drawChart(values: any[]) {
    const measureValues = values.slice().reverse();
    const colors = ['#008ef9', '#2ECC40', '#FFDC00', '#FF851B', '#AAAAAA'];
    const element = this.el.nativeElement;
    const layout = {
      font: {
        size: 13,
        color: '#000'
      }
    };
    const yValues = measureValues.map(mv => this.getValue(mv));
    const data = [{
      x: measureValues.map(mv => this._datePipe.transform(this.getDate(mv), 'yyyy.MM.dd HH:mm:ss')),
      y: yValues,
      type: 'bar',
      hoverinfo: 'none',
      text: yValues,
      textposition: 'auto',
      marker: {
        color: measureValues.map((mv, index) => colors[index]),
      },
      width: measureValues.length * .1
    }];
    Plotly.newPlot(element, data, layout);
  }

}
