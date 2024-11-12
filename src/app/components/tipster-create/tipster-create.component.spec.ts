import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsterCreateComponent } from './tipster-create.component';

describe('TipsterCreateComponent', () => {
  let component: TipsterCreateComponent;
  let fixture: ComponentFixture<TipsterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsterCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
