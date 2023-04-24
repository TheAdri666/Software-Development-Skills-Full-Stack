import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-single-snippet',
  templateUrl: './single-snippet.component.html',
})
export class SingleSnippetComponent implements OnInit {
  snippet: any = {};
  comments: any[] = [];
  searchQuery = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = params.get('q') || '';
      this.fetchData();
    });
  }

  async fetchData() {
    const result = await axios.get(`/api/codeSnippet/id/${this.searchQuery}`);
    this.snippet = result.data;
    this.comments = this.snippet.comments || [];
  }
}
