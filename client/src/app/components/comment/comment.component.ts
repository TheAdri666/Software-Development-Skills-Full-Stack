import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  authorEmail: string = '';
  @Input() author: string = '';
  @Input() content: string = '';
  constructor() {}

  ngOnInit(): void {
    this.fetchAuthorEmail();
  }

  async fetchAuthorEmail() {
    const result = await axios.get(`/api/user/${this.author}`);
    this.authorEmail = result.data.email;
  }
}
