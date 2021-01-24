import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDashboardRoutingModule } from './employee-dashboard-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { EmployeeDashboardComponent } from 'src/app/pages/employee/employee-dashboard/employee-dashboard.component';
import { EmployeeScheduleViewComponent } from 'src/app/pages/employee/employee-schedule-view/employee-schedule-view.component';
import { ViewMyShiftComponent } from 'src/app/component/employee/view-my-shift/view-my-shift.component';


@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    EmployeeScheduleViewComponent,
    ViewMyShiftComponent,
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    EmployeeDashboardRoutingModule,
  ]
})
export class EmployeeDashboardModule { }
