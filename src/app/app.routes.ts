import { Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { TaskComponent } from './pages/task/task.component';
import { ProjectComponent } from './pages/project/project.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { LoginComponent } from './pages/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'meeting',
    component: MeetingComponent,
  },
  {
    path: 'project',
    component: ProjectComponent,
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  {
    path: 'clientProfile',
    component: ClientComponent,
  },
  {
    path: 'sidenav',
    component: SidenavComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
];
