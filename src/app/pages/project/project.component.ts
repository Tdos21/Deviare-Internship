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
  selector: 'app-project',
  templateUrl: './project.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidenavComponent, FormsModule],
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.apiService.saveProject(this.projectForm.value).subscribe(
        (response) => {
          console.log('Project saved:', response);
        },
        (error) => {
          console.error('Error saving project:', error);
        }
      );
    }
  }
}
