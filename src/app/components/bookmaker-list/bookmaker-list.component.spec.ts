import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakerListComponent } from './bookmaker-list.component';

describe('BookmakerListComponent', () => {
  let component: BookmakerListComponent;
  let fixture: ComponentFixture<BookmakerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmakerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmakerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
