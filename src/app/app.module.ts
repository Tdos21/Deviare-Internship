import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Import the components
import { AppComponent } from './app.component';

// Import the routes from app.routes.ts
import { routes } from './app.routes';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { ClientComponent } from './pages/client/client.component';
import { ProjectComponent } from './pages/project/project.component';
import { TaskComponent } from './pages/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent, // Declare Sidebar component
    MeetingComponent, // Declare Meetings component
    ProjectComponent, // Declare Projects component
    TaskComponent, // Declare Tasks component
    ClientComponent,
    UserComponent, // Declare Profile component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule
    HttpClientModule, // Add HttpClientModule
    RouterModule.forRoot(routes), // Use the routes from app.routes.ts
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstrap the main AppComponent
})
export class AppModule {}
