import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceItemComponent } from './seance-item.component';

describe('SeanceItemComponent', () => {
  let component: SeanceItemComponent;
  let fixture: ComponentFixture<SeanceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeanceItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
