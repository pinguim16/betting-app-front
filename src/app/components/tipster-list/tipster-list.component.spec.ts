import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsterListComponent } from './tipster-list.component';

describe('TipsterListComponent', () => {
  let component: TipsterListComponent;
  let fixture: ComponentFixture<TipsterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
