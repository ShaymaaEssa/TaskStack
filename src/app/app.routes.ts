import { pages } from './core/environment/pages';
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { guestGuard } from './core/guards/GuestGuard/guest.guard';
import { loggedGuard } from './core/guards/LoggedGuard/logged.guard';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'projects', component: ProjectsComponent },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: pages.Login,
        component: LoginComponent,
        title: 'StackTask - login',
      },
      {
        path: pages.Signup,
        component: SignupComponent,
        title: 'StackTask - Signup',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      {
        path: pages.Projects,
        component: ProjectsComponent,
        title: 'TaskStack - Projects',
      },
    ],
  },

  // { path: pages.Signup, component: SignupComponent },
  // { path: pages.Login, component: LoginComponent },
  // { path: pages.Projects, component: ProjectsComponent },
];
