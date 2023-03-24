import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  setLoggedIn(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['/']); // Once we are logged in we are redirected to the home page.
  }

  async handleLogin(e: Event) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/login', {
        email: this.email,
        password: this.password,
      });
      this.setLoggedIn(res.data.token);
    } catch (error) {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
