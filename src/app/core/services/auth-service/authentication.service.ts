import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { ISignUpForm } from '../../../shared/interfaces/signup/isign-up-form';
import { ISignupResponse } from '../../../shared/interfaces/signup/isignup-response';
import { Observable } from 'rxjs';
import { ILogin } from '../../../shared/interfaces/login/ilogin';
import { ILoginResponse } from '../../../shared/interfaces/login/ilogin-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient = inject(HttpClient);

  sendSignupForm(data: ISignUpForm): Observable<ISignupResponse> {
    const headers = {
      apikey: environment.key,
      'Content-Type': 'application/json',
    };

    return this.httpClient.post<ISignupResponse>(
      `${environment.baseURL}/auth/v1/signup`,
      data,
      { headers },
    );
  }

  sendLoginForm(data: ILogin): Observable<ILoginResponse> {
    const headers = {
      apikey: environment.key,
      'Content-Type': 'application/json',
    };

    return this.httpClient.post<ILoginResponse>(
      `${environment.baseURL}/auth/v1/token?grant_type=password`,
      data,
      { headers },
    );
  }
}
