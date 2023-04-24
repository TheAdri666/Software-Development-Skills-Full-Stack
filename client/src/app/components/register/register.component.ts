import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  async handleRegister(e: Event) {
    e.preventDefault();
    try {
      if (this.password !== this.confirmPassword) {
        throw new Error();
      }
      await axios.post('/api/user/register', {
        email: this.email,
        password: this.password,
      });
      window.location.href = '/login';
    } catch (error) {
      this.errorMessage = 'Something went wrong';
    }
  }
}
