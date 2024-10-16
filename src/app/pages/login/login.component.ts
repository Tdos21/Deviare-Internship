import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SidenavComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    username: 'admin@example.com',
    password: '1234',
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post(
      'https://projectapi.gerasim.in/api/EmployeeManagement/login',
      this.loginObj.subscribe((res: any) => {
        if (res.result) {
          localStorage.setItem('clientUser', JSON.stringify(res.data));
          this.router.navigateByUrl('dashboard');
        } else {
          alert(res.message);
        }
      })
    );
  }
}
