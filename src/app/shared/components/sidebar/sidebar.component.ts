import { Component, inject, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar-service/sidebar.service';
import { AuthenticationService } from '../../../core/services/auth-service/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../../core/environment/environment';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthenticationService);
  private readonly sidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  isOpen = false;
  isCollapsed = true;

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe((state) => {
      this.isOpen = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logoutUser().subscribe({
      next: () => {
        localStorage.removeItem(environment.token);
        localStorage.removeItem(environment.tokenExpireDate);

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
