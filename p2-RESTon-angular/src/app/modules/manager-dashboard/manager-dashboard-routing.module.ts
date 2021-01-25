import { ScheduleViewComponent } from './../../pages/manager/schedule-view/schedule-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashboardComponent } from 'src/app/pages/manager/manager-dashboard/manager-dashboard.component';
import { WeeklyViewComponent } from 'src/app/pages/shared/weekly-view/weekly-view.component';
import { ProfileComponent } from 'src/app/pages/user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerDashboardComponent,
    children :[
      {path: '', component: WeeklyViewComponent},
      {path: 'view-day', component: ScheduleViewComponent},
      {path: 'profile', component: ProfileComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerDashboardRoutingModule { }
