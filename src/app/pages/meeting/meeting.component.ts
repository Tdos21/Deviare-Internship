import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidenavComponent, FormsModule],
  styleUrls: ['./meeting.component.css'],
})
export class MeetingComponent implements OnInit {
  meetingForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.meetingForm = this.fb.group({
      title: ['', Validators.required],
      time: ['', Validators.required],
      endtime: ['', Validators.required],
      description: ['', Validators.required],
      isUrgent: [false], // Boolean field for isUrgent
    });
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      this.apiService.saveMeeting(this.meetingForm.value).subscribe(
        (response) => {
          console.log('Meeting saved:', response);
        },
        (error) => {
          console.error('Error saving meeting:', error);
        }
      );
    }
  }
}
