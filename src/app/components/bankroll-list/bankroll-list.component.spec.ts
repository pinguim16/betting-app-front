import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankrollListComponent } from './bankroll-list.component';

describe('BankrollListComponent', () => {
  let component: BankrollListComponent;
  let fixture: ComponentFixture<BankrollListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankrollListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
