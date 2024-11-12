import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetTypeEditComponent } from './bet-type-edit.component';

describe('BetTypeEditComponent', () => {
  let component: BetTypeEditComponent;
  let fixture: ComponentFixture<BetTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetTypeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
