import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})



export class CalComponent implements OnInit {
  // updated current year value 2022
  currentYear = new Date().getFullYear();
  maxYear = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear();
  years: number[] = [];
  //created days array
  days: any[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  getAllDays: any[] = [];
  today = new Date();
  currentMonth = this.today.getMonth();
  prevMonth = 0;
  totalPrevDays = 0;
  totalNextDays = 0;
  totalDays = 0;
  day31 = [0, 2, 4, 6, 7, 9, 11];
  day30 = [3, 5, 8, 10];
  value = '';
  selectedMonth = '';
  selectedYear = '';
  currDay = this.today.getDate();
  isleapyear = false;
  constructor() { }

  ngOnInit(): void {

    //for adding years to year dropdown
    for (var x = this.currentYear; x <= this.maxYear; x++) {
      this.years.push(x);
    }

    //for checking leap year
    this.isleapyear = ((this.currentYear % 4 == 0) && (this.currentYear % 100 != 0)) || (this.currentYear % 400 == 0);

    //for finding total number of days in current month
    if (this.day31.includes(this.currentMonth)) {
      this.totalDays = 31;
    } else if (this.day30.includes(this.currentMonth)) {
      this.totalDays = 30;
    } else if (this.isleapyear) {
      this.totalDays = 29;
    } else if (!this.isleapyear) {
      this.totalDays = 28;
    }

    //for finding index of prev month
    if (this.currentMonth != 0) {
      this.prevMonth = this.currentMonth - 1
    } else {
      this.prevMonth = 11;
    }

    // for finding total number of days in prev month
    if (this.day31.includes(this.prevMonth)) {
      this.totalPrevDays = 31;
    } else if (this.day30.includes(this.prevMonth)) {
      this.totalPrevDays = 30;
    } else {
      this.totalPrevDays = 28;
    }


    console.log(this.totalPrevDays);
    let currDay = this.today;
    currDay.setDate(1);
    console.log(currDay);
    //for adding prev month days to calendar
    for (var i = this.totalPrevDays - (currDay.getDay() - 1); i <= this.totalPrevDays; i++) {
      this.getAllDays.push(i);
    }


    //for adding current month days in calendar
    for (var i = 1; i <= this.totalDays; i++) {
      this.getAllDays.push(i);
    }
    let thisday = this.today;
    thisday.setDate(this.totalDays);

    //for adding next month days in calendar
    if (thisday.getDay() < 7) {
      for (var i = 1; i < 7 - thisday.getDay(); i++) {
        this.getAllDays.push(i);
      }
    }


    console.log(this.currentMonth);
    console.log(this.getAllDays);
    console.log(this.days);
    let day = new Date().setDate(13);
    console.log(new Date().getDay());
  }

  selectMonth(month: any) {
    this.selectedMonth = month.value;
    console.log(month.value);

    //Here updated values of variables for updating calendar
    this.getAllDays = [];
    this.today = new Date(new Date().setMonth(parseInt(this.selectedMonth)));
    this.currentMonth = this.today.getMonth();
    this.prevMonth = 0;
    this.totalPrevDays = 0;
    this.totalNextDays = 0;
    this.totalDays = 0;
    this.selectedMonth = '';
    this.selectedYear = '';
    this.currDay = this.today.getDate();

    //called the method for updating calendar
    this.updateCalendar();

  }

  selectYear(year: any) {
    this.selectedYear = year.value;
    console.log(year.value);

    //Here updated values of variables for updating calendar
    this.currentYear = new Date(new Date().setFullYear(parseInt(year.value))).getFullYear();
    this.getAllDays = [];
    this.today = new Date(new Date().setFullYear(parseInt(this.selectedYear)));
    console.log(this.today);
    this.prevMonth = 0;
    this.totalPrevDays = 0;
    this.totalNextDays = 0;
    this.totalDays = 0;
    this.selectedMonth = '';
    this.selectedYear = '';
    this.currDay = this.today.getDate();
    this.isleapyear = ((this.currentYear % 4 == 0) && (this.currentYear % 100 != 0)) || (this.currentYear % 400 == 0);

    //called the method for updating calendar
    this.updateCalendar();
  }

  updateCalendar() {

    //for finding total number of days in selected month
    if (this.day31.includes(this.currentMonth)) {
      this.totalDays = 31;
    } else if (this.day30.includes(this.currentMonth)) {
      this.totalDays = 30;
    } else if (this.isleapyear) {
      this.totalDays = 29;
    } else if (!this.isleapyear) {
      this.totalDays = 28;
    }

    //for finding index of prev month
    if (this.currentMonth != 0) {
      this.prevMonth = this.currentMonth - 1
    } else {
      this.prevMonth = 11;
    }

    //for finding total number of days in prev month
    if (this.day31.includes(this.prevMonth)) {
      this.totalPrevDays = 31;
    } else if (this.day30.includes(this.prevMonth)) {
      this.totalPrevDays = 30;
    } else {
      this.totalPrevDays = 28;
    }

    console.log(this.totalPrevDays);
    let currentDay = this.today;
    currentDay.setDate(1);
    console.log(currentDay);
    console.log(currentDay);

    //added prev month days in calendar
    for (var i = this.totalPrevDays - (currentDay.getDay() - 1); i <= this.totalPrevDays; i++) {
      this.getAllDays.push(i);
    }


    //added selected month days in calendar
    for (var i = 1; i <= this.totalDays; i++) {
      this.getAllDays.push(i);
    }
    let thisday = this.today;
    thisday.setDate(this.totalDays);

    //for adding next month days in calendar
    if (thisday.getDay() < 7) {
      for (var i = 1; i < 7 - thisday.getDay(); i++) {
        this.getAllDays.push(i);
      }
    }

  }

  pickDate(val: any) {
    console.log(val.value);
    let month = this.currentMonth;
    let year = this.currentYear;
    let date = val.value + '-' + month + '-' + year;

    console.log(date);


    let domEl: HTMLElement | null = document.getElementById('datePicker');
    domEl && (domEl.innerText = date);

    const el1 = document.getElementsByClassName('selectedDate');
    for (var i = 0; i < el1.length; i++) {
      el1[i].classList.remove('selectedDate');
    }

    val?.classList.add('selectedDate');

  }

}