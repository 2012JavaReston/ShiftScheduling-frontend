import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'rev-weekly-schedule-calendar',
  templateUrl: './weekly-schedule-calendar.component.html',
  styleUrls: ['./weekly-schedule-calendar.component.scss']
})
export class WeeklyScheduleCalendarComponent implements OnInit {

  schedules: Schedule[] = [];
  currentSchedule: Schedule;

  constructor(private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.scheduleService.schedules.subscribe(schedules => {
      this.schedules = schedules;
      this.currentSchedule = schedules[0];
      // console.log(this.currentSchedule);
    })
  }
}
