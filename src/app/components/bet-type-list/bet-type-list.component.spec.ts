import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetTypeListComponent } from './bet-type-list.component';

describe('BetTypeListComponent', () => {
  let component: BetTypeListComponent;
  let fixture: ComponentFixture<BetTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
