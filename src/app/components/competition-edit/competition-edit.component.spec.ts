import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionEditComponent } from './competition-edit.component';

describe('CompetitionEditComponent', () => {
  let component: CompetitionEditComponent;
  let fixture: ComponentFixture<CompetitionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
