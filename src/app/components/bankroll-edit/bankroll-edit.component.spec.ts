import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankrollEditComponent } from './bankroll-edit.component';

describe('BankrollEditComponent', () => {
  let component: BankrollEditComponent;
  let fixture: ComponentFixture<BankrollEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankrollEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankrollEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
