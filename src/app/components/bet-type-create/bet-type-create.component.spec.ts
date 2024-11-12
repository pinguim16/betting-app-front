import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetTypeCreateComponent } from './bet-type-create.component';

describe('BetTypeCreateComponent', () => {
  let component: BetTypeCreateComponent;
  let fixture: ComponentFixture<BetTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetTypeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
