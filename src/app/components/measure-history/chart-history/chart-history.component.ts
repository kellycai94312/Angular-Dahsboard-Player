import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MeasureHistoryService } from '../measure-history.service';
import { DatePipe } from '@angular/common';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-chart-history',
  templateUrl: './chart-history.component.html',
  styleUrls: ['./chart-history.component.scss']
})
export class ChartHistoryComponent implements OnInit {

  @ViewChild('chart')
  public el: ElementRef;

  private _maxBars: number;

  constructor(private _measureHistoryService: MeasureHistoryService,
              private _participantRestApiService: ParticipantRestApiService,
              private _datePipe: DatePipe) {
    this._maxBars = 5;
    const colors = ['#008ef9', '#2ECC40', '#FFDC00', '#FF851B', '#AAAAAA'];
    this._measureHistoryService.dateSubject.subscribe(() => {
      const element = this.el.nativeElement;
      const layout = {
        font: {
          size: 13,
          color: '#000'
        }
      };
      const yValues = this._measureHistoryService.measureValues.map(mv => mv.value);
      const data = [{
        x: this._measureHistoryService.measureValues.map(mv => this._datePipe.transform(mv.created, 'yyyy.MM.dd HH:mm')),
        y: yValues,
        type: 'bar',
        hoverinfo: 'none',
        text: yValues,
        textposition: 'auto',
        marker: {
          color: this._measureHistoryService.measureValues.map((mv, index) => colors[index]),
        },
        width: this._measureHistoryService.measureValues.length * .1
      }];
      console.log(data);
      Plotly.newPlot(element, data, layout);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const element = this.el.nativeElement;
    Plotly.relayout(element, {width: event.target.innerWidth * .45, height: event.target.innerHeight / 2});
  }

  async ngOnInit() {
    await this._measureHistoryService.setup(true, this._maxBars);
  }

}
