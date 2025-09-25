import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EWaybillComponent } from './e-waybill.component';

describe('EWaybillComponent', () => {
  let component: EWaybillComponent;
  let fixture: ComponentFixture<EWaybillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EWaybillComponent]
    });
    fixture = TestBed.createComponent(EWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
