import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-snippet-bar',
  templateUrl: './snippet-bar.component.html',
  styleUrls: ['./snippet-bar.component.css'],
})
export class SnippetBarComponent implements OnInit {
  // These elements either change or are not ready when the page first loads, therefore they are stateful.
  title: string = '';
  snippet: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Submitting a comment is protected, therefore a header is needed. JWT is stored in Local Storage for convenience. Be mindful that it is probably not the best practice.
  async handleSubmit() {
    try {
      await axios.post(
        '/api/codeSnippet',
        {
          title: this.title,
          content: this.snippet,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      this.title = '';
      this.snippet = '';
      this.errorMessage = '';
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  // Snippet and title change as you type 😁
  handleSnippetChange(event: any) {
    this.snippet = event.target.value;
  }

  handleTitleChange(event: any) {
    this.title = event.target.value;
  }

  navigateToSnippets() {
    this.router.navigate(['/snippets']);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}
