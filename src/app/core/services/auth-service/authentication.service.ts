import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { ISignUpForm } from '../../../shared/interfaces/signup/isign-up-form';
import { ISignupResponse } from '../../../shared/interfaces/signup/isignup-response';
import { Observable } from 'rxjs';
import { ILogin } from '../../../shared/interfaces/login/ilogin';
import { ILoginResponse } from '../../../shared/interfaces/login/ilogin-response';
import { IUserDataResponse } from '../../../shared/interfaces/userdata/iuser-data-response';

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

  getUserData(): Observable<IUserDataResponse> {
    const user_accessToken = localStorage.getItem(environment.token);
    const headers = {
      apikey: environment.key,
      Authorization: `Bearer ${user_accessToken}`,
      'Content-Type': 'application/json',
    };

    return this.httpClient.get<IUserDataResponse>(
      `${environment.baseURL}/auth/v1/user`,
      { headers },
    );
  }

  logoutUser(): Observable<void> {
    const user_accessToken = localStorage.getItem(environment.token);
    const headers = {
      apikey: environment.key,
      Authorization: `Bearer ${user_accessToken}`,
      'Content-Type': 'application/json',
    };

    return this.httpClient.post<void>(
      `${environment.baseURL}/auth/v1/logout`,
      {},
      { headers },
    );
  }
}
