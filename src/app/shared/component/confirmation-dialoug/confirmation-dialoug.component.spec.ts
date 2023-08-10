import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialougComponent } from './confirmation-dialoug.component';

describe('ConfirmationDialougComponent', () => {
  let component: ConfirmationDialougComponent;
  let fixture: ComponentFixture<ConfirmationDialougComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialougComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDialougComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
