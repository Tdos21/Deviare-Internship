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
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidenavComponent, FormsModule],
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
      role: [false], // Boolean field for role
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.apiService.saveUser(this.userForm.value).subscribe(
        (response) => {
          console.log('User saved:', response);
        },
        (error) => {
          console.error('Error saving user:', error);
        }
      );
    }
  }
}
