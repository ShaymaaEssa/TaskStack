import { Routes } from '@angular/router';
import { pages } from './core/environment/pages';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
  { path: pages.Signup, component: SignupComponent },
  { path: pages.Login, component: LoginComponent },
  { path: pages.Projects, component: ProjectsComponent },
];
