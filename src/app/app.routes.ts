import { Routes } from '@angular/router';
import { pages } from './core/environment/pages';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: pages.Signup, component: SignupComponent },
];
