import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, SidenavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  activeProjects: number = 5; // Example data for active projects
  activeTasks: number = 12; // Example data for active tasks
  activeMeetings: number = 3; // Example data for upcoming meetings

  constructor() {}

  ngOnInit(): void {
    // If fetching data from an API, make the calls here
    // and update activeProjects, activeTasks, activeMeetings.
  }
}
