import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  months = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
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
  escalaSel = 'a';
  firstDayWorkSA = moment('2022-01-08');
  firstDayWorkSB = moment('2022-01-04');
  firstDayWorkSC = moment('2022-01-05');
  firstDayWorkSD = moment('2022-01-01');
  firstDayWorkSE = moment('2022-01-02');
  firstDayWorkSF = moment('2022-01-07');

  constructor() {
    this.dateNow = moment();
    this.today = this.isToday(this.dateNow);
    this.monthNow = this.months[this.dateNow.month()];
    this.monthNowNumber = this.dateNow.month();
    this.yearNow = this.dateNow.year();
    this.arrayDays = this.createCalendar(this.dateNow);
  }

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
    if(this.dateNow.year()>=2022){
      this.monthNow = this.months[this.dateNow.month()];
      this.yearNow = this.dateNow.year();
      this.arrayDays = this.createCalendar(this.dateNow);
      this.today = this.isToday(this.dateNow);
    }else{
      this.dateNow.add(1, 'M');
    }
  }

  public isToday(day: moment.Moment) {
    if (moment().format('L') === day.format('L')) {
      return +day.format('D');
    } else {
      return 0;
    }
  }

  public isDay(day: any) {
    let firstDayWork = this.firstDayWorkSA;
    if(this.escalaSel==='b'){
      firstDayWork = this.firstDayWorkSB;
    }else if(this.escalaSel==='c'){
      firstDayWork = this.firstDayWorkSC;
    }else if(this.escalaSel==='d'){
      firstDayWork = this.firstDayWorkSD;
    }else if(this.escalaSel==='e'){
      firstDayWork = this.firstDayWorkSE;
    }else if(this.escalaSel==='f'){
      firstDayWork = this.firstDayWorkSF;
    }
    if(day!==null){
      const duration = moment.duration(day.diff(firstDayWork));
      const days = Math.floor(duration.asDays());
      const y = days % 9;
      if(this.escalaSel ==='a' || this.escalaSel ==='c' || this.escalaSel==='e'){
        if (y < 5 ) {//manhã
          return 2;
        } else if (y === 5) {
          return 1; //noite
        } else { //folga
          return 0;
        }
      }else{
        if (y < 4 ) {//manhã
          return 2;
        } else if (y > 3 && y < 6) {
          return 1; //noite
        } else { //folga
          return 0;
        }
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

  public escalaSelected(escala: string){
    this.escalaSel = escala;
  }
}
