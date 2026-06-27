import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth-service/authentication.service';

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
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  submitForm() {
    if (this.signupForm.invalid) {
      alert('Fix Form Problem!');
      return;
    }

    this.authService.sendSignupForm(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        alert('Signup successful!');
      },
      error: (error) => {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      },
    });
  }
}
