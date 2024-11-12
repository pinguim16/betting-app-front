import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakerCreateComponent } from './bookmaker-create.component';

describe('BookmakerCreateComponent', () => {
  let component: BookmakerCreateComponent;
  let fixture: ComponentFixture<BookmakerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmakerCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmakerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
