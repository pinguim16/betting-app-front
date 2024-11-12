import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankrollCreateComponent } from './bankroll-create.component';

describe('BankrollCreateComponent', () => {
  let component: BankrollCreateComponent;
  let fixture: ComponentFixture<BankrollCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankrollCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankrollCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
