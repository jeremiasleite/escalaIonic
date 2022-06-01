import { ChangeDetectorRef, Component } from '@angular/core';
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
  arrayDays: number[];
  dateNow: moment.Moment;
  monthNowNumber: number;
  year: number;
  escalaSel = 'a';
  firstDayWorkSA = moment('2022-01-08');
  firstDayWorkSB = moment('2022-01-04');
  firstDayWorkSC = moment('2022-01-05');
  firstDayWorkSD = moment('2022-01-01');
  firstDayWorkSE = moment('2022-01-02');
  firstDayWorkSF = moment('2022-01-07');

  dataMonths: any[]=[];

  constructor(private cd: ChangeDetectorRef) {

    this.dateNow = moment();
    this.monthNowNumber = this.dateNow.month();
    this.year = this.dateNow.year();
    this.generateYear(this.year);
  }

  public createCalendar(month: moment.Moment) {
    const firstDay = month.startOf('M');
    const days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map((n) => moment(firstDay).add(n, 'd'));

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    const x = 42 - days.length;
    if (days.length < 42) {
      for (let i = 0; i < x; i++) {
        days.push(null);
      }
    }
    return days;
  }

  /**
   * generateYear
  year: number   */
  public generateYear(year: number) {
    for (let i = 0; i < 12; i++) {
      const mes = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      const date = moment(year+'-'+mes[i]+'-01');
      this.dataMonths.push({
        month: date.month(),
        year: date.year(),
        firstDay: date.startOf('M').day(),
        arrayDays: this.createCalendar(date)}
      );
    }
  }

  public isToday(day: moment.Moment) {
    if(day!=null){
      if (moment().format('L') === day.format('L')) {
        return true;
      } else {
        return false;
      }
    }else{
      return false;
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

  public chegouFim(){
    this.year++;
    this.dataMonths = [];
    this.generateYear(this.year);
    this.cd.detectChanges();
  }

  /**
   * reComecou
   */
  public reComecou() {
    this.year--;
    this.dataMonths = [];
    this.generateYear(this.year);
    this.cd.detectChanges();
  }
}
