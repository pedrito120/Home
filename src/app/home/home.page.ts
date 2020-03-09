import { Component } from '@angular/core';
import * as c3 from "c3";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  chart_gauge: any
  constructor() {

  }
  ngOnInit() {
    this.chart_gauge = c3.generate({
      bindto: '#chart_gauge',
      data: {
        columns: [
          ['data', 94]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100, // 100 is default
        units: ' %',
        width: 39 // for adjusting arc thickness
      },
      color: {

        pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });

   
  
  }

  
}


