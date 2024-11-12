import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportCreateComponent } from './sport-create.component';

describe('SportCreateComponent', () => {
  let component: SportCreateComponent;
  let fixture: ComponentFixture<SportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
