import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { distinctUntilChanged } from 'rxjs/operators';
import * as data from './chart/chartData.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  title = 'Line chart with angular material slider demo';
  chart: Highcharts.Chart;
  chartData: number[][];
  chartTooltipOptions: Highcharts.TooltipOptions = {
    pointFormat: '{point.y} unit',
  };
  sliderControl: FormControl;
  selectedValue = 50;

  constructor() {
    // tslint:disable-next-line: no-string-literal
    this.chartData = data['default'];
    this.sliderControl = new FormControl(this.selectedValue);
  }

  ngOnInit(): void {
    this.sliderControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((v) => this.onSliderValueChange(v));
  }

  ngAfterViewInit(): void {
    this.onSliderValueChange(this.selectedValue);
  }

  logChartInstance(chart: Highcharts.Chart): void {
    this.chart = chart;
  }

  onSliderValueChange(v: number): void {
    this.selectedValue = v;
    // this.chart.series[0].data[v].setState('select');
    this.chart.series[0].data[v].onMouseOver();
  }
}
