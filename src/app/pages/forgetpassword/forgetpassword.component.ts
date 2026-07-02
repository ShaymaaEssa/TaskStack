import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth-service/authentication.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;

  private readonly authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  submitForm() {
    if (this.forgetPasswordForm.invalid) {
      alert('Fix Form Problem!');
      return;
    }

    this.authService
      .forgetPassword(this.forgetPasswordForm.value.email)
      .subscribe({
        next: (res) => {
          console.log('Forget Password successful:', res);
          alert('Forget Password Successfully! Please check your email.');
        },
        error: (err) => {
          console.log('Error:', err);
          alert('Error: ' + err.error.message);
        },
      });
  }
}
