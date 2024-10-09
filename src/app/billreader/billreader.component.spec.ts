import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillreaderComponent } from './billreader.component';

describe('BillreaderComponent', () => {
  let component: BillreaderComponent;
  let fixture: ComponentFixture<BillreaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillreaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillreaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
