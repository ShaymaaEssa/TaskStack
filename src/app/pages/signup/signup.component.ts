import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth-service/authentication.service';
import { environment } from '../../core/environment/environment';
import { pages } from '../../core/environment/pages';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  showPassword = false;
  msgError = '';
  successMsg = '';

  signupForm!: FormGroup;
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[\p{L}]+(?: [\p{L}]+)*$/u),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        jobTitle: new FormControl(null),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])\S+$/,
          ),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      this.confirmPasswordValidator,
    );
  }

  confirmPasswordValidator(group: AbstractControl) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      if (confirmPassword.hasError('mismatch')) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  submitForm() {
    if (this.signupForm.invalid) {
      alert('Fix Form Problem!');
      const controls = this.signupForm.controls;

      for (const name in controls) {
        if (controls[name].invalid) {
          // Prints the field name and its specific error object (e.g., { required: true })
          console.log(
            `Field [${name}] is invalid. Errors:`,
            controls[name].errors,
          );
        }
      }

      return;
    }

    this.authService.sendSignupForm(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        alert('Signup successful!');
        localStorage.setItem(environment.token, response.access_token);
        this.router.navigate([pages.Projects]);
      },
      error: (err) => {
        console.error('Signup failed:', err);
        this.msgError = err.error?.msg ?? 'Login failed. Please try again.';
        alert('Signup failed. Please try again.' + this.msgError);
      },
    });
  }

  passwordMeetsLength(): boolean {
    const password = this.signupForm.get('password')?.value || '';
    return password.length >= 8;
  }

  passwordHasUpperLowerDigit(): boolean {
    const password = this.signupForm.get('password')?.value || '';

    return (
      /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
    );
  }

  passwordHasSpecialCharacter(): boolean {
    const password = this.signupForm.get('password')?.value || '';

    return /[!@#$%^&*]/.test(password);
  }
}
