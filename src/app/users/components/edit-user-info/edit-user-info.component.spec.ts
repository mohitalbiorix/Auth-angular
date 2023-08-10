import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserInfoComponent } from './edit-user-info.component';

describe('EditUserInfoComponent', () => {
  let component: EditUserInfoComponent;
  let fixture: ComponentFixture<EditUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserInfoComponent]
    });
    fixture = TestBed.createComponent(EditUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
