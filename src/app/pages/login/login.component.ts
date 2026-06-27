import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth-service/authentication.service';
import { pages } from '../../core/environment/pages';
import { environment } from '../../core/environment/environment';

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
  msgError = '';
  successMsg = '';

  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

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
      next: (res) => {
        console.log('Login successful:', res);

        this.msgError = '';
        this.successMsg = 'Login Successfully!';

        alert(this.successMsg);
        setTimeout(() => {
          //1. save token
          localStorage.setItem(environment.token, res.access_token);

          //2.navigate login path
          this.router.navigate([pages.Projects]);
        }, 1000);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please try again.');
        this.msgError = err.error?.msg ?? 'Login failed. Please try again.';
      },
    });
  }
}
