import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatenbankComponent } from './datenbank.component';

describe('DatenbankComponent', () => {
  let component: DatenbankComponent;
  let fixture: ComponentFixture<DatenbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatenbankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatenbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
