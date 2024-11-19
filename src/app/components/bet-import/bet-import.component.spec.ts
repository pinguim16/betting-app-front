import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetImportComponent } from './bet-import.component';

describe('BetImportComponent', () => {
  let component: BetImportComponent;
  let fixture: ComponentFixture<BetImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
