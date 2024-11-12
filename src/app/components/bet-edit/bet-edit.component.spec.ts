import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetEditComponent } from './bet-edit.component';

describe('BetEditComponent', () => {
  let component: BetEditComponent;
  let fixture: ComponentFixture<BetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
