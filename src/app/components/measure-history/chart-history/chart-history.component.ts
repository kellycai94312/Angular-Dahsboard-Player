import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MeasureHistoryService} from '../measure-history.service';
import * as Plotly from 'plotly.js';
import {Data} from 'plotly.js';

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

  private readonly _maxBars: number;

  constructor(private _datePipe: DatePipe,
              private _measureHistoryService: MeasureHistoryService) {
    this._maxBars = 5;
    this.measureValuesChange = new EventEmitter<any>();
    this._measureHistoryService.dateSubject.subscribe((measureValues) => this.drawChart(measureValues));
  }

  @HostListener('window:resize', ['$event'])
  async onResize(event) {
    const element = this.el.nativeElement;
    await Plotly.relayout(element, {width: event.target.innerWidth * .45, height: event.target.innerHeight / 2});
  }

  async ngOnInit() {
    this.measureValues = await this.setup(true, this._maxBars);
    await this.drawChart(this.measureValues);
  }

  async drawChart(values: any[]) {
    const measureValues = values.slice().reverse();
    const colors = ['#008ef9', '#2ECC40', '#FFDC00', '#FF851B', '#AAAAAA'];
    const element = this.el.nativeElement;
    const layout = {
      font: {
        size: 13,
        color: '#000'
      },
      margin: {
        l: 20,
        r: 0,
        b: 20,
        t: 0
      }
    };
    const yValues = measureValues.map(mv => this.getValue(mv));

    const data: Array<Data> = [{
      x: measureValues.map(mv => this._datePipe.transform(this.getDate(mv), 'yyyy.MM.dd HH:mm:ss')),
      y: yValues,
      type: 'bar',
      hoverinfo: 'none',
      text: yValues,
      marker: {
        color: measureValues.map((mv, index) => colors[index]),
      },
    }];
    await Plotly.newPlot(element, data, layout);
  }

}
