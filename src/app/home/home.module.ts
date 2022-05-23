import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { NgCalendarModule  } from 'ionic2-calendar';

import { HomePageRoutingModule } from './home-routing.module';
import { CalendarModule } from 'ion2-calendar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCalendarModule,
    CalendarModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
