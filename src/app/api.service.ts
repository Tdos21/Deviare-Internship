import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3306/'; // Update this URL if necessary

  constructor(private http: HttpClient) {}

  saveTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/task/api/tasks`, task);
  }

  saveUser(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/api//users`, task);
  }

  saveProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/project/api//projects`, project);
  }

  saveClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients`, client);
  }

  saveMeeting(meeting: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/client/api//meetings`, meeting);
  }
}
