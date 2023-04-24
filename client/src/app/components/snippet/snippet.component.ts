import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css'],
})
export class SnippetComponent implements OnInit {
  email: string = '';
  upvotes: number = 0;
  downvotes: number = 0;
  comment: string = '';
  @Input() snippet: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const snippetId = this.route.snapshot.queryParamMap.get('q');
    axios
      .get(`/api/codeSnippet/${snippetId}`)
      .then((res) => {
        this.snippet = res.data;
        this.upvotes = this.snippet.upvotes.length;
        this.downvotes = this.snippet.downvotes.length;
        this.fetchUserEmail();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchUserEmail() {
    axios
      .get(`/api/user/${this.snippet.author}`)
      .then((res) => {
        this.email = res.data.email;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUpvote() {
    axios
      .put(
        `/api/codeSnippet/upvote/${this.snippet._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        this.upvotes = res.data.upvotes.length;
        this.downvotes = res.data.downvotes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDownvote() {
    axios
      .put(
        `/api/codeSnippet/downvote/${this.snippet._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        this.upvotes = res.data.upvotes.length;
        this.downvotes = res.data.downvotes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleComment(event: any) {
    event.preventDefault();
    axios
      .post(
        `/api/codeSnippet/comment/${this.snippet._id}`,
        {
          comment: this.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        this.comment = '';
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getViewUrl() {
    const params = new URLSearchParams();
    params.append('q', this.snippet._id);
    return `/snippets/id?${params.toString()}`;
  }

  get locationIncludesSnippetId(): boolean {
    return location.href.includes(this.snippet._id);
  }
}
