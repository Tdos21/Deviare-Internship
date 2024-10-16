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
  selector: 'app-client',
  templateUrl: './client.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidenavComponent, FormsModule],
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.apiService.saveClient(this.clientForm.value).subscribe(
        (response) => {
          console.log('Client saved:', response);
        },
        (error) => {
          console.error('Error saving client:', error);
        }
      );
    }
  }
}
