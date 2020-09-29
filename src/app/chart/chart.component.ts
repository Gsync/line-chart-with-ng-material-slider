import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges {
  constructor() {}
  @Input()
  chartData: number[][];
  @Input()
  chartTooltipOptions: Highcharts.TooltipOptions;
  @Output()
  chartInstance = new EventEmitter<Highcharts.Chart>();
  currentChart: Highcharts.Chart;
  Highcharts: typeof Highcharts = Highcharts;
  updateChart = false;
  chartOptions: Highcharts.Options = {
    chart: {
      height: '60%',
      marginLeft: 36,
      spacingTop: 10,
      spacingBottom: 20,
      backgroundColor: '#f7f7f7',
    },
    series: [
      {
        type: 'spline',
        name: '',
        threshold: null,
      },
    ],
    title: {
      text: '',
      // margin: 0,
      // style: { fontSize: '14px' }
    },
    xAxis: {
      crosshair: true,
      title: {
        text: null,
      },
      tickWidth: 0,
      labels: { enabled: false },
    },

    yAxis: {
      // showLastLabel:false,
      endOnTick: false,
      title: {
        text: null,
      },
      labels: {
        x: -4,
      },
      // gridLineWidth: 0,
      // minorGridLineWidth: 0,
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        // enableMouseTracking: false,
        // marker: {
          // enabled: true,
          // states: {
          //   hover: {
          //     enabled: t,
          //   },
          //   select: {
          //     enabled: true,
          //     radius: 4,
          //   },
          // },
        // },
      },
      scatter: { connectEnds: true },
    },
    legend: {
      enabled: false,
    },
    tooltip: {},
  };
  ngOnInit(): void {
    this.chartOptions.tooltip = {
      headerFormat: '',
      valueDecimals: 2,
      ...this.chartTooltipOptions,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    // tslint:disable-next-line: no-string-literal
    this.chartOptions.series[0]['data'] = this.chartData;
    if (this.currentChart) {
        this.currentChart.series[0].setData(this.chartData);
    }
}

  logChartInstance(chart: Highcharts.Chart): void {
    this.currentChart = chart;
    this.chartInstance.emit(chart);
  }
}
