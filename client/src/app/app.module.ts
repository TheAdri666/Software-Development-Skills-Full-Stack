import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SnippetBarComponent } from './components/snippet-bar/snippet-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SingleSnippetComponent } from './components/single-snippet/single-snippet.component';
import { SnippetListComponent } from './components/snippet-list/snippet-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { SnippetComponent } from './components/snippet/snippet.component';

const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'snippets/id', component: SingleSnippetComponent },
  { path: 'snippets', component: SnippetListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainContentComponent,
    SnippetBarComponent,
    RegisterComponent,
    LoginComponent,
    SingleSnippetComponent,
    SnippetListComponent,
    CommentComponent,
    SnippetComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
