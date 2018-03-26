import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { Subject } from 'rxjs/Subject';

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
  dateSubject: Subject<any[]>;

  @Input()
  setup: Function;

  @Input()
  getDate: Function;

  @Input()
  getValue: Function;

  private _maxBars: number;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _datePipe: DatePipe) {
    this._maxBars = 5;
    this.measureValuesChange = new EventEmitter<any>();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const element = this.el.nativeElement;
    Plotly.relayout(element, {width: event.target.innerWidth * .45, height: event.target.innerHeight / 2});
  }

  async ngOnInit() {
    await this.setup(true, this._maxBars);
    this.drawChart(this.measureValues);
    this.dateSubject.subscribe((measureValues) => this.drawChart(measureValues));
  }

  drawChart(measureValues: any[]) {
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
      x: measureValues.map(mv => this._datePipe.transform(this.getDate(mv), 'yyyy.MM.dd HH:mm')),
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
