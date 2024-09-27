import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatenbankDisplayComponent } from './datenbank-display.component';

describe('DatenbankDisplayComponent', () => {
  let component: DatenbankDisplayComponent;
  let fixture: ComponentFixture<DatenbankDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatenbankDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatenbankDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
