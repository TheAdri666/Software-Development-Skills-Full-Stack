import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  localStorage: Storage = window.localStorage;
  searchValue = '';
  isMenuOpen = false;

  constructor(private router: Router) {}

  setLoggedOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  handleSearchBlur(): void {
    this.searchValue = '';
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('q', this.searchValue);
    this.router.navigate(['/snippets'], { queryParams: params });
  }

  handleMenuClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
