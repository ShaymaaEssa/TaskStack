import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth-service/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  private readonly authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      alert('Fix Form Problem!');
      return;
    }

    this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        alert('Login successful!');
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please try again.');
      },
    });
  }
}
