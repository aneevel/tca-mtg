import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDecksComponent } from './view-decks.component';

describe('ViewDecksComponent', () => {
  let component: ViewDecksComponent;
  let fixture: ComponentFixture<ViewDecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
