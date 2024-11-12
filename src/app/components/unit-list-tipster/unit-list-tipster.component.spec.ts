import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitListTipsterComponent } from './unit-list-tipster.component';

describe('UnitListTipsterComponent', () => {
  let component: UnitListTipsterComponent;
  let fixture: ComponentFixture<UnitListTipsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitListTipsterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitListTipsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
