import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSnippetComponent } from './single-snippet.component';

describe('SingleSnippetComponent', () => {
  let component: SingleSnippetComponent;
  let fixture: ComponentFixture<SingleSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSnippetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
