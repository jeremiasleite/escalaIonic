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
  monthNow: string;
  yearNow: string;
  today: number;
  constructor() {
    this.dateNow = moment();
    this.today = this.isToday(this.dateNow);
    this.monthNow = this.months[this.dateNow.month()];
    this.yearNow = this.dateNow.year();
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
    return days;
  }

  public nextMonth() {
    this.dateNow.add(1, 'M');
    this.monthNow = this.months[this.dateNow.month()];
    this.yearNow = this.dateNow.year();
    this.arrayDays = this.createCalendar(this.dateNow);
    this.today = this.isToday(this.dateNow);
  }

  public previousMonth() {
    this.dateNow.subtract(1, 'M');
    this.monthNow = this.months[this.dateNow.month()];
    this.yearNow = this.dateNow.year();
    this.arrayDays = this.createCalendar(this.dateNow);
    this.today = this.isToday(this.dateNow);
  }
  public isToday(day: moment.Moment){
    if(moment().format('L') === day.format('L')){
      return +day.format('D');
    }else{
      return 0;
    }
  }
}
