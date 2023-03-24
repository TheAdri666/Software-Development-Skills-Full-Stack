import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetListComponent } from './snippet-list.component';

describe('SnippetListComponent', () => {
  let component: SnippetListComponent;
  let fixture: ComponentFixture<SnippetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnippetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
