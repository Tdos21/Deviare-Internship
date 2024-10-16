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
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidenavComponent, FormsModule],
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      isUrgent: [false], // Boolean for urgency, default is false
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.apiService.saveTask(this.taskForm.value).subscribe(
        (response) => {
          console.log('Task saved:', response);
        },
        (error) => {
          console.error('Error saving task:', error);
        }
      );
    }
  }
}
