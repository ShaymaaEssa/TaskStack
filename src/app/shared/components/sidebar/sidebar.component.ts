import { Component, inject, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar-service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly sidebarService = inject(SidebarService);
  isOpen = false;

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe((state) => {
      this.isOpen = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
