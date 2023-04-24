import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SnippetComponent } from '../snippet/snippet.component';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.css'],
})
export class SnippetListComponent implements OnInit {
  snippets: SnippetComponent[] = [];
  searchQuery: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap
      .pipe(map((params) => params.get('q') ?? ''))
      .subscribe((searchQuery) => {
        this.searchQuery = searchQuery;
        this.fetchSnippets();
      });
  }

  fetchSnippets() {
    axios
      .get(`/api/codeSnippet/${this.searchQuery}`)
      .then((response) => {
        this.snippets = response.data;
      })
      .catch((error) => console.log(error));
  }
}
