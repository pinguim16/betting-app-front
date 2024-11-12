import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakerEditComponent } from './bookmaker-edit.component';

describe('BookmakerEditComponent', () => {
  let component: BookmakerEditComponent;
  let fixture: ComponentFixture<BookmakerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmakerEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmakerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
