import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsterEditComponent } from './tipster-edit.component';

describe('TipsterEditComponent', () => {
  let component: TipsterEditComponent;
  let fixture: ComponentFixture<TipsterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsterEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
