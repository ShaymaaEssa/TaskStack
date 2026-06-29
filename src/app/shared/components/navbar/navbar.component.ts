import { Router } from '@angular/router';
import { environment } from '../../../core/environment/environment';
import { SidebarService } from '../../../core/services/sidebar-service/sidebar.service';
import { AuthenticationService } from './../../../core/services/auth-service/authentication.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  userName = '';
  department = '';
  nameIntials = '';
  isDropdownOpen = false;

  private readonly authenticationService = inject(AuthenticationService);
  private readonly sidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.authenticationService.getUserData().subscribe({
      next: (response) => {
        this.userName = response.user_metadata.name;
        this.department = response.user_metadata.department;
        this.nameIntials = this.getInitials(this.userName);
      },
      error: (error) => {
        console.log("Can't get User data! " + error);
      },
    });
  }

  getInitials(name: string): string {
    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    // Mahmoud Taha -> MT
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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
