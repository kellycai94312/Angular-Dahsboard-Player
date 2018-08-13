import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ButtonGroupItem} from '../../../../components/ngx-button-group/bean/button-group-item';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PersonMeasure} from '../../../../data/remote/bean/person-measure';
import {ExerciseMeasure} from '../../../../data/remote/model/exercise/exercise-measure';
import {TrainingBlockType} from '../../../../data/remote/model/training/report/training-block-type';
import * as Plotly from 'plotly.js';
import {Data, Datum, PlotRestyleEvent, ScatterData} from 'plotly.js';
import {EventReportService} from '../../report-page/service/event-report.service';
import {TrainingBlockQuery} from '../../../../data/remote/rest-api/query/training-block-query';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TrainingBlock} from '../../../../data/remote/model/training/report/training-block';
import {ChartType} from '../../../../data/remote/model/training/report/chart-type';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-training-report-block',
  templateUrl: './training-report-block.component.html',
  styleUrls: ['./training-report-block.component.scss']
})
export class TrainingReportBlockComponent implements OnInit {

  @ViewChild('chart')
  public chartElement: ElementRef;

  @Input()
  public data: TrainingBlock;

  public personMeasures: PersonMeasure[];
  public selectedItem: ButtonGroupItem;
  public haveData: boolean;
  public selectedChartTypeViewModel: ChartTypeViewModel;

  public readonly buttonGroupItems: ButtonGroupItem[];
  public readonly splitButtonItems: SplitButtonItem[];
  public readonly chartTypeViewModels: ChartTypeViewModel[];
  private readonly _contentHeight: number;
  private readonly _query: TrainingBlockQuery;
  private _disabledSeriesNames: string[];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _participantRestApiService: ParticipantRestApiService,
              private _eventReportService: EventReportService,
              private _appHelper: AppHelper,
              private _translateService: TranslateService) {
    this._contentHeight = 360;
    this._disabledSeriesNames = [];

    this._query = new TrainingBlockQuery();
    this._query.count = PropertyConstant.pageSize;
    this._query.from = 0;

    this.chartTypeViewModels = [];

    this.haveData = false;
    this.buttonGroupItems = [
      {
        nameKey: 'table',
        callback: async () => {
          this.data.trainingBlockType = TrainingBlockType.TABLE;
          await this.updateTrainingBlock(this.data);
        },
        originalObject: TrainingBlockType.TABLE
      },
      {
        nameKey: 'chart',
        callback: async () => {
          this.data.chartType = this.data.chartType || ChartType.LINE;
          this.data.trainingBlockType = TrainingBlockType.CHART;
          this.selectedChartTypeViewModel = this.chartTypeViewModels.find(x => x.type === this.data.chartType);
          await this.updateTrainingBlock(this.data);
          await this.drawChart(this.personMeasures);
        },
        originalObject: TrainingBlockType.CHART
      }
    ];

    this.splitButtonItems = [
      {
        nameKey: 'settings',
        callback: async () => {
          await this._router.navigate([this.data.id], {relativeTo: this._activatedRoute});
        }
      }
    ];
  }

  @HostListener('window:resize')
  async onResize() {
    if (this.chartElement && this.chartElement.nativeElement) {
      try {
        await Plotly.relayout(this.chartElement.nativeElement, {width: this.getChartWidth(), height: this._contentHeight});
      } catch (e) {
      }
    }
  }

  async ngOnInit() {
    this.chartTypeViewModels.push({
      name: await this._translateService.get('barChartType').toPromise(),
      type: ChartType.BAR
    });

    this.chartTypeViewModels.push({
      name: await this._translateService.get('lineChartType').toPromise(),
      type: ChartType.LINE
    });

    if (this.data.trainingBlockType === TrainingBlockType.TABLE) {
      this.selectedItem = this.buttonGroupItems[0];
    } else {
      this.selectedItem = this.buttonGroupItems[1];
      this.selectedChartTypeViewModel = this.chartTypeViewModels.find(x => x.type === this.data.chartType);
    }

    this.personMeasures = await this._participantRestApiService.getTrainingBlockResults({}, this._query, {trainingBlockId: this.data.id, trainingReportId: this.data.trainingReport.id});
    this.haveData = this.personMeasures && this.personMeasures.length > 0 && this.personMeasures[0].measureValues.list.length > 0;
    if (this.haveData) {
      this.splitButtonItems.push({
        nameKey: 'showMore',
        default: true,
        callback: async () => {
          const personMeasures = await this._participantRestApiService.getTrainingBlockResults({}, this._query, {trainingBlockId: this.data.id, trainingReportId: this.data.trainingReport.id});
          if (personMeasures && personMeasures.length && personMeasures[0].measureValues.list.length) {
            for (let i = 0; i < personMeasures.length; i++) {
              const item = personMeasures[i];
              const personMeasure = this.personMeasures.find(x => x.person.id == item.person.id);
              if (personMeasure) {
                for (let j = 0; j < item.measureValues.list.length; j++) {
                  personMeasure.measureValues.list.push(item.measureValues.list[j]);
                }
              }
            }
            this._query.from += PropertyConstant.pageSize;

            if (this.data.trainingBlockType === TrainingBlockType.CHART) {
              await this.drawChart(this.personMeasures);
            }
          }
        }
      });
      this._query.from = PropertyConstant.pageSize;

      if (this.data.trainingBlockType === TrainingBlockType.CHART) {
        await this.drawChart(this.personMeasures);
      }
    }
  }

  public async onChartTypeChanged(item: ChartTypeViewModel) {
    this.data.chartType = item.type;
    this.data.trainingBlockType = TrainingBlockType.CHART;
    await this.updateTrainingBlock(this.data);
    await this.drawChart(this.personMeasures);
  }

  public getDisabledSeriesNames(): string[] {
    return this._disabledSeriesNames;
  }

  private async drawChart(personMeasures: PersonMeasure[]) {
    let scatterType: any = 'scatter';
    if (this.data.trainingBlockType === TrainingBlockType.CHART) {
      switch (this.data.chartType) {
        case ChartType.LINE:
          break;
        case ChartType.BAR:
          scatterType = 'bar';
          break;
      }
    }

    const chartData: Array<Data> = [];
    const xValues = [];
    // TODO: Optimize algorithm
    // Max count person 10 link with color palette array
    for (let i = 0; i < personMeasures.length && i < EventReportService.colorPalette.length; i++) {
      const item = personMeasures[i];
      const color = EventReportService.colorPalette[i];
      const groups: Array<GroupData> = [];
      for (let j = 0; j < item.measureValues.list.length; j++) {
        const exerciseMeasureValue = item.measureValues.list[j];
        let groupData = groups.find(x => x.data.id == exerciseMeasureValue.exerciseExecMeasure.exerciseMeasure.id);
        if (!groupData) {
          groupData = new GroupData();
          groupData.data = exerciseMeasureValue.exerciseExecMeasure.exerciseMeasure;
          groupData.trace = <ScatterData>{};
          groupData.trace.x = [];
          groupData.trace.y = [];
          groupData.trace.type = 'scatter';
          groupData.trace.marker = {
            color: color,
            line: {
              color: color
            }
          };
          groupData.trace.mode = 'text+lines+markers';
          groupData.trace.type = scatterType;
          groupData.trace.hoverinfo = 'name';
          groupData.trace.name = `${item.person.lastName} ${item.person.firstName} / ${exerciseMeasureValue.exerciseExecMeasure.exerciseMeasure.baseExercise.name} / ${exerciseMeasureValue.exerciseExecMeasure.exerciseMeasure.measure.measureParameter.name}`;
          if (scatterType === 'bar') {
            (<any>groupData.trace).textposition = 'auto';
          } else {
            (<any>groupData.trace).textposition = 'top center';
          }

          groups.push(groupData);
        }

        if (exerciseMeasureValue.created) {
          const xValue = this._appHelper.dateByFormat(exerciseMeasureValue.created, 'dd/MM/yyyy HH:mm');
          if (!xValues.find(x => x === xValue)) {
            xValues.push(xValue);
          }
        }

        (<Array<Datum>>groupData.trace.y).push(exerciseMeasureValue.value);
      }

      for (let j = 0; j < groups.length; j++) {
        groups[j].trace.x = xValues;
        (<any>groups[j].trace).text = groups[j].trace.y;
        chartData.push(groups[j].trace);
      }
    }

    setTimeout(async () => {
      const plotly = await Plotly.newPlot(this.chartElement.nativeElement, chartData.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }), {
        height: this._contentHeight,
        margin: {
          l: 30,
          r: 0,
          b: 80,
          t: 0
        },
        showlegend: true,
        legend: {
          orientation: 'h'
        }
      }, {displayModeBar: false});

      plotly.on('plotly_restyle', (data: PlotRestyleEvent) => {
        this._disabledSeriesNames = this.chartElement.nativeElement.data.filter(x => x.visible === 'legendonly').map(x => x.name);
      });
    });
  }

  private getChartWidth(): number {
    return this.chartElement.nativeElement.offsetWidth;
  }

  private async updateTrainingBlock(trainingBlock: TrainingBlock): Promise<TrainingBlock> {
    try {
      this.data = await this._participantRestApiService.updateTrainingBlock(trainingBlock, {}, {trainingBlockId: this.data.id, trainingReportId: this.data.trainingReport.id});
      this._eventReportService.setSelectedTrainingBlock(this.data);
    } catch (e) {
    }
    return this.data;
  }

}

class GroupData {
  public data: ExerciseMeasure;
  public trace: ScatterData;
}

class ChartTypeViewModel {
  public type: ChartType;
  public name: string;
}
