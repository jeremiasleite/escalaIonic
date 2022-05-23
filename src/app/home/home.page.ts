import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  n = 7;
  firstDayOfWeek = moment().startOf('M').day();
  arrayDays: number[];
  dateNow;
  monthNow;
  constructor() {
    this.dateNow = moment();
    this.monthNow = this.months[this.dateNow.month()];
    this.arrayDays = this.createCalendar(this.dateNow);
  }
  public createCalendar(month) {
    const nDays = moment(month).daysInMonth();
    const firstDay = moment(month).startOf('M').day();
    const days = Array.from(Array(nDays).keys()).map((x)=>x+1);

    for (let n = 0; n < firstDay; n++) {
      days.unshift(null);
    }
    const isdivide = days.length % 7;
    if(isdivide !== 0){
      for(let i = 0 ;i < 7-isdivide; i++){
        days.push(null);
      }
    }
    console.log(days);
    return days;
  }
}
