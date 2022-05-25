import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  months = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];
  weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  n = 7;
  firstDayOfWeek = moment().startOf('M').day();
  arrayDays: number[];
  dateNow: moment.Moment;
  monthNow: string;
  monthNowNumber: number;
  yearNow: number;
  today: number;
  firstDayWorkSA = moment('2022-01-08');
  constructor() {
    this.dateNow = moment();
    this.today = this.isToday(this.dateNow);
    this.monthNow = this.months[this.dateNow.month()];
    this.monthNowNumber = this.dateNow.month();
    this.yearNow = this.dateNow.year();
    this.arrayDays = this.createCalendar(this.dateNow);
    //console.log(this.isDayA(this.dateNow));
  }
  /*public createCalendar(month: moment.Moment) {
    const nDays = moment(month).daysInMonth();
    const firstDay = moment(month).startOf('M').day();
    //const days = Array.from(Array(nDays).keys()).map((x)=>x+1);
    let days: any[];
    for(let j = 0, ,)
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
  }*/
  public createCalendar(month) {
    const firstDay = moment(month).startOf('M');
    const days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map((n) => moment(firstDay).add(n, 'd'));

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    const isdivide = days.length % 7;
    if (isdivide !== 0) {
      for (let i = 0; i < 7 - isdivide; i++) {
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

  public isToday(day: moment.Moment) {
    if (moment().format('L') === day.format('L')) {
      return +day.format('D');
    } else {
      return 0;
    }
  }

  public isDayA(day: any) {
    if(day!==null){
      const duration = moment.duration(day.diff(this.firstDayWorkSA));
      const days = Math.floor(duration.asDays());
      const y = days % 9;
      if (y < 5) {
        //manhã
        return 2;
      } else if (y === 5) {
        return 1; //noite
      } else {
        //folga
        return 0;
      }
    }else{
      return null;
    }
  }
  /**
   * formatDay
  date: any     */
  public formatDay(date: any) {
    if(date!==null){
      return +date.format('D');
    }else{
      return null;
    }
  }
}
